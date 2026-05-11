import { createServer, type IncomingMessage, type ServerResponse } from 'http'
import {
  getProviderModels,
  loadProviderConfig,
  setProviderModel,
  type AgentProviderConfig,
  type ProviderId,
} from '../../utils/providerSetup.js'

type WhatsAppServerInfo = {
  port: number
  webhookUrl: string
  publicWebhookUrl: string
  whatsappUrl: string
}

let serverInfo: WhatsAppServerInfo | null = null

const DEFAULT_PORT = 3987
const DEFAULT_SYSTEM_PROMPT =
  'You are Astro Code running inside WhatsApp. Answer clearly and concisely.'

export async function ensureWhatsAppServer(): Promise<WhatsAppServerInfo> {
  if (serverInfo) return serverInfo

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
      'connect astro code whatsapp agent',
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

    if (!prompt) {
      sendTwiml(res, 'Send a message to chat with Astro Code.')
      return
    }

    const reply = prompt.startsWith('/')
      ? await handleSlashCommand(prompt)
      : await askProvider(prompt)
    sendTwiml(res, reply)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    sendTwiml(res, `Astro Code error: ${message}`)
  }
}

async function handleSlashCommand(input: string): Promise<string> {
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
        '',
        'Terminal UI commands still run inside Astro Code terminal.',
      ].join('\n')
    case '/model':
      return handleModelCommand(args)
    case '/status':
      return handleStatusCommand()
    default:
      return [
        `${command} is a terminal-only Astro Code command from WhatsApp.`,
        'Supported WhatsApp commands: /help, /model, /status.',
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

async function handleStatusCommand(): Promise<string> {
  const config = await loadProviderConfig()
  const providerName =
    config?.providerName || process.env.AGENT_PROVIDER_NAME || 'Provider'
  const model = config?.model || process.env.AGENT_MODEL || process.env.ANTHROPIC_MODEL
  const webhook = serverInfo?.publicWebhookUrl || serverInfo?.webhookUrl || 'not running'

  return [
    'Astro Code WhatsApp bridge',
    `Provider: ${providerName}`,
    `Model: ${model || 'not configured'}`,
    `Webhook: ${webhook}`,
  ].join('\n')
}

async function askProvider(prompt: string): Promise<string> {
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
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: getProviderHeaders(config.apiKey),
    body: JSON.stringify({
      model: config.model,
      messages: [
        {
          role: 'system',
          content: process.env.ASTRO_WHATSAPP_SYSTEM_PROMPT || DEFAULT_SYSTEM_PROMPT,
        },
        { role: 'user', content: prompt },
      ],
      stream: false,
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`${response.status} ${response.statusText}: ${text.slice(0, 300)}`)
  }

  const json = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>
  }
  return (
    json.choices?.[0]?.message?.content?.trim() ||
    'Astro Code did not return a text response.'
  )
}

function getChatCompletionsUrl(baseUrl: string, provider: string): string {
  const normalized = baseUrl.replace(/\/+$/, '')
  if (provider === 'ollama' && !normalized.endsWith('/v1')) {
    return `${normalized}/v1/chat/completions`
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
