import { randomUUID } from 'crypto'

type FetchLike = (
  input: Parameters<typeof globalThis.fetch>[0],
  init?: Parameters<typeof globalThis.fetch>[1],
) => ReturnType<typeof globalThis.fetch>

type AnthropicMessageRequest = {
  model?: string
  max_tokens?: number
  messages?: Array<{
    role: 'user' | 'assistant'
    content: unknown
  }>
  system?: unknown
  stream?: boolean
  temperature?: number
  stop_sequences?: string[]
  tools?: Array<{
    name: string
    description?: string
    input_schema?: Record<string, unknown>
  }>
  tool_choice?: {
    type?: string
    name?: string
  }
}

type OpenAIToolCall = {
  id?: string
  type?: string
  function?: {
    name?: string
    arguments?: string
  }
}

type ToolBlockState = {
  anthropicIndex: number
  id: string
  name: string
  started: boolean
}

type MessageConversionOptions = {
  flattenToolHistory: boolean
}

export function shouldUseOpenAICompatibleFetch(): boolean {
  return process.env.AGENT_PROVIDER_API === 'openai-compatible'
}

export function createOpenAICompatibleFetch(innerFetch: FetchLike): FetchLike {
  return async (input, init) => {
    const url = getRequestUrl(input)
    if (!isAnthropicMessagesUrl(url)) {
      return innerFetch(input, init)
    }

    const bodyText = await getRequestBodyText(input, init)
    const body = bodyText
      ? (JSON.parse(bodyText) as AnthropicMessageRequest)
      : {}

    if (isAnthropicCountTokensUrl(url)) {
      return buildCountTokensResponse(body)
    }

    const request = toOpenAIChatRequest(body)
    const response = await innerFetch(getChatCompletionsUrl(), {
      ...init,
      method: 'POST',
      headers: buildOpenAIHeaders(input, init),
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      return response
    }

    if (body.stream) {
      if (!response.body) return response
      return new Response(
        openAIStreamToAnthropicStream(response.body, body.model || 'model'),
        {
          status: response.status,
          statusText: response.statusText,
          headers: buildAnthropicResponseHeaders(response.headers, true),
        },
      )
    }

    const json = await response.json()
    return new Response(JSON.stringify(toAnthropicMessage(json, body)), {
      status: response.status,
      statusText: response.statusText,
      headers: buildAnthropicResponseHeaders(response.headers, false),
    })
  }
}

function isAnthropicMessagesUrl(url: string): boolean {
  try {
    const pathname = new URL(url).pathname
    return (
      pathname.endsWith('/messages') ||
      pathname.endsWith('/messages/count_tokens')
    )
  } catch {
    return false
  }
}

function isAnthropicCountTokensUrl(url: string): boolean {
  try {
    return new URL(url).pathname.endsWith('/messages/count_tokens')
  } catch {
    return false
  }
}

function getChatCompletionsUrl(): string {
  const baseUrl =
    process.env.AGENT_BASE_URL ||
    process.env.ASTRO_BASE_URL ||
    ''
  const normalizedBaseUrl = baseUrl.replace(/\/+$/, '')
  if (
    process.env.AGENT_PROVIDER === 'ollama' &&
    !normalizedBaseUrl.endsWith('/v1')
  ) {
    return `${normalizedBaseUrl}/v1/chat/completions`
  }
  return `${normalizedBaseUrl}/chat/completions`
}

function getRequestUrl(input: Parameters<FetchLike>[0]): string {
  return input instanceof Request ? input.url : String(input)
}

async function getRequestBodyText(
  input: Parameters<FetchLike>[0],
  init: Parameters<FetchLike>[1],
): Promise<string> {
  if (init?.body) {
    return new Response(init.body).text()
  }
  if (input instanceof Request) {
    return input.clone().text()
  }
  return ''
}

function buildOpenAIHeaders(
  input: Parameters<FetchLike>[0],
  init: Parameters<FetchLike>[1],
): Headers {
  const incomingHeaders = new Headers(
    init?.headers || (input instanceof Request ? input.headers : undefined),
  )
  const headers = new Headers()
  const apiKey =
    process.env.AGENT_API_KEY ||
    process.env.ASTRO_API_KEY ||
    process.env.ANTHROPIC_AUTH_TOKEN ||
    'local'

  headers.set('Content-Type', 'application/json')
  headers.set('Authorization', `Bearer ${apiKey}`)

  const userAgent = incomingHeaders.get('User-Agent')
  if (userAgent) headers.set('User-Agent', userAgent)

  if (process.env.AGENT_PROVIDER === 'openrouter') {
    headers.set('HTTP-Referer', 'https://agent-cli.local')
    headers.set('X-Title', 'Agent CLI')
  }

  return headers
}

function buildAnthropicResponseHeaders(
  headers: Headers,
  stream: boolean,
): Headers {
  const responseHeaders = new Headers()
  responseHeaders.set(
    'Content-Type',
    stream ? 'text/event-stream' : 'application/json',
  )
  responseHeaders.set(
    'request-id',
    headers.get('x-request-id') || headers.get('request-id') || randomUUID(),
  )
  return responseHeaders
}

function toOpenAIChatRequest(body: AnthropicMessageRequest): Record<string, unknown> {
  const conversionOptions: MessageConversionOptions = {
    flattenToolHistory: shouldFlattenToolHistory(),
  }
  const request: Record<string, unknown> = {
    model: body.model || process.env.AGENT_MODEL,
    messages: toOpenAIMessages(body, conversionOptions),
    stream: Boolean(body.stream),
  }

  if (typeof body.temperature === 'number') {
    request.temperature = body.temperature
  }
  if (body.max_tokens) {
    if (String(body.model || '').startsWith('o')) {
      request.max_completion_tokens = body.max_tokens
    } else {
      request.max_tokens = body.max_tokens
    }
  }
  if (body.stop_sequences?.length) {
    request.stop = body.stop_sequences
  }
  if (body.tools?.length) {
    request.tools = body.tools.map(tool => ({
      type: 'function',
      function: {
        name: tool.name,
        description: tool.description || '',
        parameters: sanitizeSchema(tool.input_schema || {}),
      },
    }))
  }
  const toolChoice = toOpenAIToolChoice(body.tool_choice)
  if (toolChoice) {
    request.tool_choice = toolChoice
  }

  return request
}

function shouldFlattenToolHistory(): boolean {
  // Gemini's OpenAI-compatible endpoint rejects replayed function-call parts
  // unless they include Google's private thought_signature metadata. Preserve
  // the tool context as plain transcript text instead.
  return process.env.AGENT_PROVIDER === 'google'
}

function toOpenAIMessages(
  body: AnthropicMessageRequest,
  options: MessageConversionOptions,
): Array<Record<string, unknown>> {
  const messages: Array<Record<string, unknown>> = []
  const systemText = flattenContent(body.system)
  if (systemText) {
    messages.push({ role: 'system', content: systemText })
  }

  for (const message of body.messages || []) {
    if (message.role === 'assistant') {
      messages.push(toOpenAIAssistantMessage(message.content, options))
      continue
    }

    const blocks = Array.isArray(message.content) ? message.content : null
    if (!blocks) {
      messages.push({ role: 'user', content: flattenContent(message.content) })
      continue
    }

    const userTextBlocks: string[] = []
    for (const block of blocks) {
      if (!isRecord(block)) continue
      if (block.type === 'tool_result') {
        if (options.flattenToolHistory) {
          const resultText = flattenContent(block.content)
          userTextBlocks.push(
            [
              `[tool result: ${String(block.tool_use_id || 'unknown')}]`,
              resultText || '(empty result)',
            ].join('\n'),
          )
          continue
        }
        messages.push({
          role: 'tool',
          tool_call_id: String(block.tool_use_id || ''),
          content: flattenContent(block.content),
        })
      } else {
        const text = flattenContent(block)
        if (text) userTextBlocks.push(text)
      }
    }
    if (userTextBlocks.length > 0) {
      messages.push({ role: 'user', content: userTextBlocks.join('\n\n') })
    }
  }

  return messages
}

function toOpenAIAssistantMessage(
  content: unknown,
  options: MessageConversionOptions,
): Record<string, unknown> {
  const blocks = Array.isArray(content) ? content : null
  if (!blocks) {
    return { role: 'assistant', content: flattenContent(content) }
  }

  const text: string[] = []
  const toolCalls: Array<Record<string, unknown>> = []
  for (const block of blocks) {
    if (!isRecord(block)) continue
    if (block.type === 'tool_use') {
      if (options.flattenToolHistory) {
        text.push(
          [
            `[tool call: ${String(block.name || 'tool')}]`,
            JSON.stringify(block.input || {}),
          ].join('\n'),
        )
        continue
      }
      toolCalls.push({
        id: String(block.id || randomUUID()),
        type: 'function',
        function: {
          name: String(block.name || 'tool'),
          arguments: JSON.stringify(block.input || {}),
        },
      })
      continue
    }
    const blockText = flattenContent(block)
    if (blockText) text.push(blockText)
  }

  return {
    role: 'assistant',
    content: text.join('\n\n') || null,
    ...(toolCalls.length > 0 ? { tool_calls: toolCalls } : {}),
  }
}

function toOpenAIToolChoice(
  toolChoice: AnthropicMessageRequest['tool_choice'],
): unknown {
  if (!toolChoice?.type) return undefined
  if (toolChoice.type === 'auto') return 'auto'
  if (toolChoice.type === 'any') return 'required'
  if (toolChoice.type === 'none') return 'none'
  if (toolChoice.type === 'tool' && toolChoice.name) {
    return {
      type: 'function',
      function: {
        name: toolChoice.name,
      },
    }
  }
  return undefined
}

function toAnthropicMessage(
  response: Record<string, unknown>,
  request: AnthropicMessageRequest,
): Record<string, unknown> {
  const choice = getFirstChoice(response)
  const message = isRecord(choice.message) ? choice.message : {}
  const content: Array<Record<string, unknown>> = []
  const text = typeof message.content === 'string' ? message.content : ''
  if (text) {
    content.push({ type: 'text', text })
  }

  const toolCalls = Array.isArray(message.tool_calls) ? message.tool_calls : []
  for (const call of toolCalls) {
    if (!isRecord(call) || !isRecord(call.function)) continue
    content.push({
      type: 'tool_use',
      id: String(call.id || randomUUID()),
      name: String(call.function.name || 'tool'),
      input: parseToolArguments(call.function.arguments),
    })
  }

  const finishReason = typeof choice.finish_reason === 'string'
    ? choice.finish_reason
    : null
  const usage = isRecord(response.usage) ? response.usage : {}

  return {
    id: String(response.id || `msg_${randomUUID()}`),
    type: 'message',
    role: 'assistant',
    model: request.model || process.env.AGENT_MODEL || 'model',
    content,
    stop_reason: toAnthropicStopReason(finishReason, toolCalls.length > 0),
    stop_sequence: null,
    usage: {
      input_tokens: numberValue(usage.prompt_tokens),
      output_tokens: numberValue(usage.completion_tokens),
      cache_creation_input_tokens: 0,
      cache_read_input_tokens: 0,
    },
  }
}

function buildCountTokensResponse(body: AnthropicMessageRequest): Response {
  const text = JSON.stringify(body.messages || []) + JSON.stringify(body.system || '')
  return new Response(
    JSON.stringify({
      input_tokens: Math.max(1, Math.ceil(text.length / 4)),
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        'request-id': randomUUID(),
      },
    },
  )
}

function openAIStreamToAnthropicStream(
  stream: ReadableStream<Uint8Array>,
  model: string,
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()
  const messageId = `msg_${randomUUID()}`
  let buffer = ''
  let nextContentIndex = 0
  let textBlockIndex: number | null = null
  let textBlockOpen = false
  let finishReason: string | null = null
  let completionTokens = 0
  const toolBlocks = new Map<number, ToolBlockState>()

  function encodeEvent(event: Record<string, unknown>): Uint8Array {
    return encoder.encode(
      `event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`,
    )
  }

  return new ReadableStream({
    async start(controller) {
      controller.enqueue(
        encodeEvent({
          type: 'message_start',
          message: {
            id: messageId,
            type: 'message',
            role: 'assistant',
            content: [],
            model,
            stop_reason: null,
            stop_sequence: null,
            usage: {
              input_tokens: 0,
              output_tokens: 0,
              cache_creation_input_tokens: 0,
              cache_read_input_tokens: 0,
            },
          },
        }),
      )

      try {
        const reader = stream.getReader()
        while (true) {
          const { value, done } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })
          const events = buffer.split(/\r?\n\r?\n/)
          buffer = events.pop() || ''
          for (const event of events) {
            for (const data of getSSEDataLines(event)) {
              if (data === '[DONE]') continue
              const chunk = JSON.parse(data) as Record<string, unknown>
              const usage = isRecord(chunk.usage) ? chunk.usage : null
              if (usage) {
                completionTokens = numberValue(usage.completion_tokens)
              }
              const choice = getFirstChoice(chunk)
              if (typeof choice.finish_reason === 'string') {
                finishReason = choice.finish_reason
              }
              const delta = isRecord(choice.delta) ? choice.delta : {}
              const content =
                typeof delta.content === 'string' ? delta.content : ''
              if (content) {
                if (!textBlockOpen) {
                  textBlockIndex = nextContentIndex++
                  textBlockOpen = true
                  controller.enqueue(
                    encodeEvent({
                      type: 'content_block_start',
                      index: textBlockIndex,
                      content_block: { type: 'text', text: '' },
                    }),
                  )
                }
                controller.enqueue(
                  encodeEvent({
                    type: 'content_block_delta',
                    index: textBlockIndex,
                    delta: { type: 'text_delta', text: content },
                  }),
                )
              }

              const toolCalls = Array.isArray(delta.tool_calls)
                ? delta.tool_calls
                : []
              for (const rawCall of toolCalls) {
                if (!isRecord(rawCall)) continue
                const openAIIndex = numberValue(rawCall.index)
                const call = rawCall as OpenAIToolCall & { index?: number }
                let block = toolBlocks.get(openAIIndex)
                if (!block) {
                  block = {
                    anthropicIndex: nextContentIndex++,
                    id: call.id || `toolu_${randomUUID()}`,
                    name: call.function?.name || 'tool',
                    started: false,
                  }
                  toolBlocks.set(openAIIndex, block)
                }
                if (call.id) block.id = call.id
                if (call.function?.name) block.name = call.function.name
                if (!block.started) {
                  block.started = true
                  controller.enqueue(
                    encodeEvent({
                      type: 'content_block_start',
                      index: block.anthropicIndex,
                      content_block: {
                        type: 'tool_use',
                        id: block.id,
                        name: block.name,
                        input: {},
                      },
                    }),
                  )
                }
                const partialJson = call.function?.arguments || ''
                if (partialJson) {
                  controller.enqueue(
                    encodeEvent({
                      type: 'content_block_delta',
                      index: block.anthropicIndex,
                      delta: {
                        type: 'input_json_delta',
                        partial_json: partialJson,
                      },
                    }),
                  )
                }
              }
            }
          }
        }

        if (textBlockOpen && textBlockIndex !== null) {
          controller.enqueue(
            encodeEvent({
              type: 'content_block_stop',
              index: textBlockIndex,
            }),
          )
        }
        for (const block of [...toolBlocks.values()].sort(
          (a, b) => a.anthropicIndex - b.anthropicIndex,
        )) {
          if (!block.started) continue
          controller.enqueue(
            encodeEvent({
              type: 'content_block_stop',
              index: block.anthropicIndex,
            }),
          )
        }
        controller.enqueue(
          encodeEvent({
            type: 'message_delta',
            delta: {
              stop_reason: toAnthropicStopReason(
                finishReason,
                toolBlocks.size > 0,
              ),
              stop_sequence: null,
            },
            usage: {
              output_tokens: completionTokens,
            },
          }),
        )
        controller.enqueue(encodeEvent({ type: 'message_stop' }))
        controller.close()
      } catch (error) {
        controller.error(error)
      }
    },
  })
}

function getSSEDataLines(event: string): string[] {
  return event
    .split(/\r?\n/)
    .filter(line => line.startsWith('data:'))
    .map(line => line.slice('data:'.length).trim())
    .filter(Boolean)
}

function getFirstChoice(response: Record<string, unknown>): Record<string, unknown> {
  const choices = Array.isArray(response.choices) ? response.choices : []
  const first = choices[0]
  return isRecord(first) ? first : {}
}

function toAnthropicStopReason(
  finishReason: string | null,
  hasToolUse: boolean,
): string {
  if (hasToolUse || finishReason === 'tool_calls') return 'tool_use'
  if (finishReason === 'length') return 'max_tokens'
  if (finishReason === 'content_filter') return 'stop_sequence'
  return 'end_turn'
}

function flattenContent(content: unknown): string {
  if (!content) return ''
  if (typeof content === 'string') return content
  if (Array.isArray(content)) {
    return content.map(flattenContent).filter(Boolean).join('\n\n')
  }
  if (!isRecord(content)) return String(content)

  if (typeof content.text === 'string') return content.text
  if (typeof content.content === 'string') return content.content
  if (Array.isArray(content.content)) return flattenContent(content.content)
  if (content.type === 'image') return '[Image input]'
  return ''
}

function parseToolArguments(value: unknown): Record<string, unknown> {
  if (typeof value !== 'string' || !value.trim()) return {}
  try {
    const parsed = JSON.parse(value)
    return isRecord(parsed) ? parsed : {}
  } catch {
    return {}
  }
}

function sanitizeSchema(schema: Record<string, unknown>): Record<string, unknown> {
  const clone = JSON.parse(JSON.stringify(schema)) as Record<string, unknown>
  removeUnsupportedSchemaKeys(clone)
  return clone
}

function removeUnsupportedSchemaKeys(value: unknown): void {
  if (Array.isArray(value)) {
    value.forEach(removeUnsupportedSchemaKeys)
    return
  }
  if (!isRecord(value)) return
  delete value.cache_control
  for (const child of Object.values(value)) {
    removeUnsupportedSchemaKeys(child)
  }
}

function numberValue(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0
}

function isRecord(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null
}
