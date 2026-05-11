import { createServer, type IncomingMessage, type ServerResponse } from 'http'
import {
  getProviderModels,
  loadProviderConfig,
  setProviderModel,
  type AgentProviderConfig,
  type ProviderId,
} from '../../utils/providerSetup.js'
import { enqueue } from '../../utils/messageQueueManager.js'
import { getContentText } from '../../utils/messages.js'

type WhatsAppServerInfo = {
  cliSessionId: string
  port: number
  webhookUrl: string
  publicWebhookUrl: string
  whatsappUrl: string
}

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

type WhatsAppChatSession = {
  id: string
  sender: string
  profileName?: string
  messages: ChatMessage[]
  createdAt: number
  updatedAt: number
}

type PendingRemoteReply = {
  resolve: (value: string) => void
  sessionKey: string
  startedAt: number
}

let serverInfo: WhatsAppServerInfo | null = null
let activeCliSessionId = `cli_${Date.now().toString(36)}`
const sessions = new Map<string, WhatsAppChatSession>()
const cliSessionSeeds = new Map<string, ChatMessage[]>()
const pendingRemoteReplies: PendingRemoteReply[] = []

const DEFAULT_PORT = 3987
const MAX_SESSION_MESSAGES = 20
const DEFAULT_SYSTEM_PROMPT =
  'You are Astro Code running inside WhatsApp. Answer clearly and concisely.'

export async function ensureWhatsAppServer(options?: {
  cliSessionId?: string
  seedMessages?: ChatMessage[]
}): Promise<WhatsAppServerInfo> {
  const cliSessionId = options?.cliSessionId || activeCliSessionId
  activeCliSessionId = cliSessionId
  if (options?.seedMessages) {
    cliSessionSeeds.set(cliSessionId, trimSessionMessages(options.seedMessages))
  }

  if (serverInfo) {
    serverInfo.cliSessionId = cliSessionId
    return serverInfo
  }

  const port = Number(process.env.ASTRO_WHATSAPP_PORT || DEFAULT_PORT)
  const publicBaseUrl = process.env.ASTRO_WHATSAPP_PUBLIC_URL?.replace(/\/+$/, '')
  const webhookUrl = `http://localhost:${port}/whatsapp/webhook`
  const publicWebhookUrl = publicBaseUrl
    ? `${publicBaseUrl}/whatsapp/webhook`
    : webhookUrl
  const whatsappUrl = getWhatsAppConnectUrl()

  const server = createServer((req, res) => {
    void handleRequest(req, res)
  })

  await new Promise<void>((resolve, reject) => {
    server.once('error', reject)
    server.listen(port, '0.0.0.0', () => {
      server.off('error', reject)
      resolve()
    })
  })

  serverInfo = {
    cliSessionId,
    port,
    webhookUrl,
    publicWebhookUrl,
    whatsappUrl,
  }
  return serverInfo
}

export function getWhatsAppConnectUrl(): string {
  const configuredUrl = normalizeWhatsAppUrl(process.env.ASTRO_WHATSAPP_URL)
  if (configuredUrl) return configuredUrl

  const phoneNumber = normalizeWhatsAppPhone(process.env.ASTRO_WHATSAPP_NUMBER)
  const message = encodeURIComponent(
    process.env.ASTRO_WHATSAPP_MESSAGE?.trim() ||
      process.env.ASTRO_WHATSAPP_JOIN_CODE?.trim() ||
      '/connect',
  )

  if (phoneNumber) return `https://wa.me/${phoneNumber}?text=${message}`
  return `https://wa.me/?text=${message}`
}

function normalizeWhatsAppUrl(value: string | undefined): string | null {
  const raw = value?.trim()
  if (!raw) return null
  if (raw.startsWith('whatsapp:')) {
    const phoneNumber = normalizeWhatsAppPhone(raw)
    return phoneNumber ? `https://wa.me/${phoneNumber}` : null
  }
  if (/^\+?\d[\d\s().-]+$/.test(raw)) {
    const phoneNumber = normalizeWhatsAppPhone(raw)
    return phoneNumber ? `https://wa.me/${phoneNumber}` : null
  }
  return raw
}

function normalizeWhatsAppPhone(value: string | undefined): string {
  return value?.replace(/[^\d]/g, '') || ''
}

async function handleRequest(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  try {
    if (req.method === 'GET' && req.url === '/health') {
      sendText(res, 200, 'ok')
      return
    }

    if (req.method !== 'POST' || req.url !== '/whatsapp/webhook') {
      sendText(res, 404, 'not found')
      return
    }

    const body = await readBody(req)
    const params = new URLSearchParams(body)
    const prompt = params.get('Body')?.trim()
    const session = getOrCreateSession(params)

    if (!prompt) {
      sendTwiml(res, 'Send a message to chat with Astro Code.')
      return
    }

    if (isConnectCommand(prompt)) {
      sendTwiml(res, formatConnectReply(session))
      return
    }

    const reply = shouldUseRemoteMode() && !prompt.startsWith('/')
      ? await sendToAstroRemoteSession(prompt, session)
      : prompt.startsWith('/')
      ? await handleSlashCommand(prompt, session)
      : await askProvider(prompt, session)
    sendTwiml(res, reply)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    sendTwiml(res, `Astro Code error: ${message}`)
  }
}

function isConnectCommand(prompt: string): boolean {
  const normalized = prompt.trim().toLowerCase()
  return (
    normalized === '/connect' ||
    normalized === 'connect' ||
    normalized === 'start' ||
    normalized === '/start'
  )
}

function formatConnectReply(session: WhatsAppChatSession): string {
  return [
    'Astro Code connected.',
    `Session: ${session.id}`,
    `CLI session: ${serverInfo?.cliSessionId || activeCliSessionId}`,
    'Send any message here to continue this Astro CLI conversation.',
    'Use /status for session info or /reset to clear WhatsApp memory.',
  ].join('\n')
}

export function resolveWhatsAppRemoteReplies(messages: unknown[]): void {
  if (pendingRemoteReplies.length === 0) return

  const reply = findLastAssistantText(messages)
  if (!reply) return

  const pending = pendingRemoteReplies.shift()
  pending?.resolve(reply)
}

function findLastAssistantText(messages: unknown[]): string | null {
  for (let i = messages.length - 1; i >= 0; i--) {
    const message = messages[i] as {
      message?: { role?: string; content?: unknown }
      isMeta?: boolean
    }
    if (message?.isMeta || message?.message?.role !== 'assistant') continue
    const text = getContentText(
      message.message.content as Parameters<typeof getContentText>[0],
    )?.trim()
    if (text) return text
  }
  return null
}

function shouldUseRemoteMode(): boolean {
  return process.env.ASTRO_WHATSAPP_MODE !== 'provider'
}

async function sendToAstroRemoteSession(
  prompt: string,
  session: WhatsAppChatSession,
): Promise<string> {
  const sessionKey = `${activeCliSessionId}:${session.sender}`
  enqueue({
    value: prompt,
    mode: 'prompt',
    bridgeOrigin: true,
    skipSlashCommands: true,
    priority: 'next',
  })

  const reply = await waitForRemoteReply(sessionKey, 14_000)
  if (reply) {
    appendSessionTurn(session, prompt, reply)
    return reply
  }

  return [
    'Sent to Astro CLI session.',
    'Astro is still working or no response was captured before WhatsApp timeout.',
    'Check terminal for final output.',
  ].join('\n')
}

function waitForRemoteReply(
  sessionKey: string,
  timeoutMs: number,
): Promise<string | null> {
  return new Promise(resolve => {
    const pending: PendingRemoteReply = {
      sessionKey,
      startedAt: Date.now(),
      resolve: value => {
        clearTimeout(timer)
        resolve(value)
      },
    }
    const timer = setTimeout(() => {
      const index = pendingRemoteReplies.indexOf(pending)
      if (index >= 0) pendingRemoteReplies.splice(index, 1)
      resolve(null)
    }, timeoutMs)
    pendingRemoteReplies.push(pending)
  })
}

function getOrCreateSession(params: URLSearchParams): WhatsAppChatSession {
  const sender =
    params.get('From')?.trim() ||
    params.get('WaId')?.trim() ||
    params.get('SmsMessageSid')?.trim() ||
    'unknown'
  const profileName = params.get('ProfileName')?.trim() || undefined
  const key = `${activeCliSessionId}:${sender}`
  const existing = sessions.get(key)
  if (existing) {
    existing.profileName = profileName || existing.profileName
    existing.updatedAt = Date.now()
    return existing
  }

  const session: WhatsAppChatSession = {
    id: `wa_${Date.now().toString(36)}_${sessions.size + 1}`,
    sender,
    profileName,
    messages: [...(cliSessionSeeds.get(activeCliSessionId) || [])],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
  sessions.set(key, session)
  return session
}

async function handleSlashCommand(
  input: string,
  session: WhatsAppChatSession,
): Promise<string> {
  const [command = '', ...rest] = input.trim().split(/\s+/)
  const args = rest.join(' ').trim()

  switch (command.toLowerCase()) {
    case '/help':
      return [
        'Astro Code WhatsApp commands:',
        '/model - show current provider models',
        '/model list - list provider models',
        '/model <model> - switch model',
        '/model custom <model> - switch to custom model id',
        '/status - show WhatsApp bridge status',
        '/reset - clear this WhatsApp session',
        '',
        'Terminal UI commands still run inside Astro Code terminal.',
      ].join('\n')
    case '/model':
      return handleModelCommand(args)
    case '/status':
      return handleStatusCommand(session)
    case '/reset':
    case '/clear':
      session.messages = []
      session.updatedAt = Date.now()
      return `WhatsApp session reset: ${session.id}`
    default:
      return [
        `${command} is a terminal-only Astro Code command from WhatsApp.`,
        'Supported WhatsApp commands: /help, /model, /status, /reset.',
        'Send normal text to chat with the agent.',
      ].join('\n')
  }
}

async function handleModelCommand(args: string): Promise<string> {
  const config = await loadProviderConfig()
  if (!args || args === 'list' || args === 'status' || args === 'current') {
    return formatWhatsAppModelChoices(config)
  }

  const provider = (config?.provider || process.env.AGENT_PROVIDER) as
    | ProviderId
    | undefined
  const providerModels = getWhatsAppProviderModels(config, provider)
  const requested = args.toLowerCase()
  const model = requested.startsWith('custom ')
    ? args.slice('custom '.length).trim()
    : args.trim()

  if (!model) return 'Model is required.'

  if (
    providerModels.includes(model) ||
    requested.startsWith('custom ') ||
    providerModels.length === 0
  ) {
    const nextModel = await setProviderModel(model)
    return `Model changed to ${nextModel}`
  }

  return `Unknown model '${args}'.\n\n${formatWhatsAppModelChoices(config)}`
}

function formatWhatsAppModelChoices(
  config: AgentProviderConfig | null,
): string {
  const provider = (config?.provider || process.env.AGENT_PROVIDER) as
    | ProviderId
    | undefined
  const providerName =
    config?.providerName || process.env.AGENT_PROVIDER_NAME || provider
  const currentModel =
    config?.model || process.env.AGENT_MODEL || process.env.ANTHROPIC_MODEL
  const models = getWhatsAppProviderModels(config, provider)

  if (!provider || !providerName) {
    return 'No provider configured. Restart Astro Code and complete provider setup.'
  }

  if (models.length === 0) {
    return [
      `Provider models for ${providerName}:`,
      '* No saved model list for this provider.',
      'Use /model custom <model> to switch.',
    ].join('\n')
  }

  return [
    `Provider models for ${providerName}:`,
    ...models.map(model =>
      model === currentModel ? `* ${model} (current)` : `  ${model}`,
    ),
    'Use /model <model> to switch. Use /model custom <model> for custom model.',
  ].join('\n')
}

function getWhatsAppProviderModels(
  config: AgentProviderConfig | null,
  provider: ProviderId | undefined,
): string[] {
  const staticModels = getProviderModels(provider)
  const currentModel =
    config?.model || process.env.AGENT_MODEL || process.env.ANTHROPIC_MODEL
  return uniqueStrings([
    ...staticModels,
    ...(currentModel && staticModels.includes(currentModel)
      ? [currentModel]
      : []),
  ])
}

function uniqueStrings(values: string[]): string[] {
  return [...new Set(values.map(value => value.trim()).filter(Boolean))]
}

async function handleStatusCommand(session: WhatsAppChatSession): Promise<string> {
  const config = await loadProviderConfig()
  const providerName =
    config?.providerName || process.env.AGENT_PROVIDER_NAME || 'Provider'
  const model = config?.model || process.env.AGENT_MODEL || process.env.ANTHROPIC_MODEL
  const webhook = serverInfo?.publicWebhookUrl || serverInfo?.webhookUrl || 'not running'
  const turns = Math.floor(session.messages.length / 2)

  return [
    'Astro Code WhatsApp bridge',
    `CLI session: ${serverInfo?.cliSessionId || activeCliSessionId}`,
    `Provider: ${providerName}`,
    `Model: ${model || 'not configured'}`,
    `Webhook: ${webhook}`,
    `Session: ${session.id}`,
    `Sender: ${session.profileName || session.sender}`,
    `Turns: ${turns}`,
  ].join('\n')
}

async function askProvider(
  prompt: string,
  session: WhatsAppChatSession,
): Promise<string> {
  const config = (await loadProviderConfig()) || {
    provider: process.env.AGENT_PROVIDER || 'other',
    providerName: process.env.AGENT_PROVIDER_NAME || 'Provider',
    baseUrl: process.env.AGENT_BASE_URL || process.env.ASTRO_BASE_URL || '',
    model: process.env.AGENT_MODEL || process.env.ANTHROPIC_MODEL || '',
    apiKey: process.env.AGENT_API_KEY || process.env.ASTRO_API_KEY,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  if (!config.baseUrl) {
    throw new Error('No provider base URL configured.')
  }
  if (!config.model) {
    throw new Error('No provider model configured.')
  }

  const endpoint = getChatCompletionsUrl(config.baseUrl, config.provider)
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 12000)
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: getProviderHeaders(config.apiKey),
    signal: controller.signal,
    body: JSON.stringify({
      model: config.model,
      max_tokens: 700,
      messages: [
        {
          role: 'system',
          content: buildSystemPrompt(session),
        },
        ...session.messages,
        { role: 'user', content: prompt },
      ],
      stream: false,
    }),
  }).finally(() => clearTimeout(timeout))

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`${response.status} ${response.statusText}: ${text.slice(0, 300)}`)
  }

  const json = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>
  }
  const reply =
    json.choices?.[0]?.message?.content?.trim() ||
    `Astro Code did not return text from ${config.providerName} (${config.model}).`

  appendSessionTurn(session, prompt, reply)
  return reply
}

function buildSystemPrompt(session: WhatsAppChatSession): string {
  const base = process.env.ASTRO_WHATSAPP_SYSTEM_PROMPT || DEFAULT_SYSTEM_PROMPT
  return [
    base,
    `Astro CLI session id: ${serverInfo?.cliSessionId || activeCliSessionId}.`,
    `WhatsApp session id: ${session.id}.`,
    `Continue the same conversation for this sender until /reset.`,
  ].join('\n')
}

function appendSessionTurn(
  session: WhatsAppChatSession,
  prompt: string,
  reply: string,
): void {
  session.messages.push(
    { role: 'user', content: prompt },
    { role: 'assistant', content: reply },
  )
  session.messages = trimSessionMessages(session.messages)
  session.updatedAt = Date.now()
}

function trimSessionMessages(messages: ChatMessage[]): ChatMessage[] {
  return messages.slice(-MAX_SESSION_MESSAGES)
}

function getChatCompletionsUrl(baseUrl: string, provider: string): string {
  const normalized = baseUrl.replace(/\/+$/, '')
  if (provider === 'ollama' && !normalized.endsWith('/v1')) {
    return `${normalized}/v1/chat/completions`
  }
  if (provider === 'google' || normalized.endsWith('/openai')) {
    return `${normalized}/chat/completions`
  }
  if (normalized.endsWith('/v1')) return `${normalized}/chat/completions`
  return `${normalized}/v1/chat/completions`
}

function getProviderHeaders(apiKey: string | undefined): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey || 'local'}`,
  }

  if (process.env.AGENT_PROVIDER === 'openrouter') {
    headers['HTTP-Referer'] = 'https://agent-cli.local'
    headers['X-Title'] = 'Astro Code WhatsApp'
  }

  return headers
}

async function readBody(req: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = []
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }
  return Buffer.concat(chunks).toString('utf8')
}

function sendText(res: ServerResponse, status: number, body: string): void {
  res.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' })
  res.end(body)
}

function sendTwiml(res: ServerResponse, message: string): void {
  res.writeHead(200, { 'Content-Type': 'text/xml; charset=utf-8' })
  res.end(`<Response><Message>${escapeXml(message)}</Message></Response>`)
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
