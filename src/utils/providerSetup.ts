import { existsSync } from 'fs'
import { chmod, mkdir, readFile, writeFile } from 'fs/promises'
import { homedir } from 'os'
import { dirname, join } from 'path'
import { emitKeypressEvents } from 'readline'
import { createInterface } from 'readline/promises'
import { consumeEarlyInput } from './earlyInput.js'

export type ProviderId =
  | 'google'
  | 'kimi'
  | 'openai'
  | 'openrouter'
  | 'deepseek'
  | 'ollama'
  | 'lmstudio'
  | 'other'

type ProviderSpec = {
  id: ProviderId
  label: string
  description: string
  baseUrl: string
  requiresApiKey: boolean
  defaultApiKey?: string
  envKey?: string
  models: string[]
}

type SelectChoice<T> = {
  label: string
  description?: string
  value: T
}

const ansi = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  magenta: '\x1b[35m',
  yellow: '\x1b[33m',
  white: '\x1b[37m',
  black: '\x1b[30m',
  bgCyan: '\x1b[46m',
  bgBlue: '\x1b[44m',
}

function paint(value: string, ...codes: string[]): string {
  if (!process.stdout.isTTY) return value
  return `${codes.join('')}${value}${ansi.reset}`
}

export type AgentProviderConfig = {
  provider: ProviderId
  providerName: string
  baseUrl: string
  model: string
  apiKey?: string
  createdAt: string
  updatedAt: string
}

const CONFIG_DIR = process.env.AGENT_CONFIG_HOME || join(homedir(), '.agent-cli')
const CONFIG_FILE = join(CONFIG_DIR, 'provider.json')
const ASTRO_GLOBAL_CONFIG_FILE = join(
  process.env.ASTRO_CONFIG_DIR || homedir(),
  '.astro.json',
)
const GLOBAL_PROVIDER_KEY = 'agentProvider'

const PROVIDERS: ProviderSpec[] = [
  {
    id: 'google',
    label: 'Google AI Studio',
    description: 'Gemini API key from Google AI Studio',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai/',
    requiresApiKey: true,
    envKey: 'GEMINI_API_KEY',
    models: [
      'gemini-3.1-pro-preview',
      'gemini-3.1-flash-lite-preview',
      'gemini-3-pro-preview',
      'gemini-3-flash-preview',
    ],
  },
  {
    id: 'kimi',
    label: 'Kimi',
    description: 'Moonshot Kimi models',
    baseUrl: 'https://api.moonshot.ai/v1',
    requiresApiKey: true,
    envKey: 'MOONSHOT_API_KEY',
    models: [
      'kimi-k2.6',
      'kimi-k2.5',
      'kimi-k2-thinking',
      'kimi-k2-thinking-turbo',
      'kimi-k2-turbo-preview',
      'kimi-k2-0905-preview',
    ],
  },
  {
    id: 'openai',
    label: 'OpenAI',
    description: 'OpenAI API models',
    baseUrl: 'https://api.openai.com/v1',
    requiresApiKey: true,
    envKey: 'OPENAI_API_KEY',
    models: [
      'gpt-5.5',
      'gpt-5.5-pro',
      'gpt-5.5-2026-04-23',
      'gpt-5.4',
      'gpt-5.4-pro',
      'gpt-5.4-mini',
      'gpt-5.4-nano',
      'gpt-5.2',
      'gpt-5.2-pro',
      'gpt-5.2-chat-latest',
      'gpt-5.2-codex',
    ],
  },
  {
    id: 'openrouter',
    label: 'OpenRouter',
    description: 'Many providers behind one API key',
    baseUrl: 'https://openrouter.ai/api/v1',
    requiresApiKey: true,
    envKey: 'OPENROUTER_API_KEY',
    models: [
      'openrouter/auto',
      'openai/gpt-5.5',
      'openai/gpt-5.5-pro',
      'openai/gpt-5.4',
      'openai/gpt-5.4-pro',
      'openai/gpt-5.2',
      'openai/gpt-5.2-pro',
      'openai/gpt-5.2-chat',
      'openai/gpt-5.2-codex',
      'openai/gpt-5.1-codex-max',
      'google/gemini-3.1-pro-preview',
      'google/gemini-3.1-flash-lite-preview',
      'google/gemini-3-pro-preview',
      'google/gemini-3-flash-preview',
      'moonshotai/kimi-k2.6',
      'moonshotai/kimi-k2.5',
      'moonshotai/kimi-k2-thinking',
      'deepseek/deepseek-v4-pro',
      'deepseek/deepseek-v4-flash',
      'x-ai/grok-4-fast',
    ],
  },
  {
    id: 'deepseek',
    label: 'DeepSeek',
    description: 'DeepSeek chat and reasoning models',
    baseUrl: 'https://api.deepseek.com',
    requiresApiKey: true,
    envKey: 'DEEPSEEK_API_KEY',
    models: ['deepseek-v4-pro', 'deepseek-v4-flash'],
  },
  {
    id: 'ollama',
    label: 'Ollama',
    description: 'Ollama cloud models',
    baseUrl: 'http://localhost:11434',
    requiresApiKey: false,
    defaultApiKey: 'ollama',
    models: [
      'kimi-k2.6:cloud',
      'deepseek-v4-pro:cloud',
      'deepseek-v4-flash:cloud',
      'gemma4:31b-cloud',
      'qwen3.5:397b-cloud',
      'glm-5.1:cloud',
      'minimax-m2.7:cloud',
    ],
  },
  {
    id: 'lmstudio',
    label: 'LM Studio',
    description: 'Local OpenAI-compatible server from LM Studio',
    baseUrl: 'http://localhost:1234/v1',
    requiresApiKey: false,
    defaultApiKey: 'lm-studio',
    models: ['local-model'],
  },
  {
    id: 'other',
    label: 'Other',
    description: 'Custom OpenAI-compatible provider',
    baseUrl: '',
    requiresApiKey: true,
    models: [],
  },
]

const TOP_LEVEL_COMMANDS_WITHOUT_PROVIDER = new Set([
  'agents',
  'assistant',
  'auth',
  'auto-mode',
  'completion',
  'config',
  'doctor',
  'error',
  'export',
  'install',
  'log',
  'mcp',
  'open',
  'plugin',
  'plugins',
  'rollback',
  'remote-control',
  'server',
  'setup-token',
  'ssh',
  'task',
  'up',
  'update',
  'upgrade',
])

const OPTIONS_WITH_VALUE = new Set([
  '--add-dir',
  '--agents',
  '--allowed-tools',
  '--allowedTools',
  '--append-system-prompt',
  '--append-system-prompt-file',
  '--betas',
  '--debug-file',
  '--disallowed-tools',
  '--disallowedTools',
  '--effort',
  '--file',
  '--from-pr',
  '--input-format',
  '--json-schema',
  '--max-budget-usd',
  '--max-thinking-tokens',
  '--max-turns',
  '--mcp-config',
  '--model',
  '--name',
  '--output-format',
  '--permission-mode',
  '--permission-prompt-tool',
  '--plugin-dir',
  '--prefill',
  '--resume',
  '--resume-session-at',
  '--rewind-files',
  '--session-id',
  '--setting-sources',
  '--settings',
  '--system-prompt',
  '--system-prompt-file',
  '--tools',
  '--workload',
  '-n',
  '-r',
])

export function getProviderConfigPath(): string {
  return CONFIG_FILE
}

export function getProviderModels(provider: ProviderId | undefined): string[] {
  if (!provider) return []
  return getProviderSpec(provider)?.models ?? []
}

export function getActiveProviderId(): ProviderId | undefined {
  return process.env.AGENT_PROVIDER as ProviderId | undefined
}

export async function getAvailableProviderModels(): Promise<string[]> {
  const provider = getActiveProviderId()
  const currentModel = process.env.AGENT_MODEL || process.env.ANTHROPIC_MODEL
  const staticModels = getProviderModels(provider)
  return uniqueStrings([
    ...staticModels,
    ...(currentModel && staticModels.includes(currentModel)
      ? [currentModel]
      : []),
  ])
}

export async function formatProviderModelChoices(): Promise<string> {
  const provider = getActiveProviderId()
  const providerName = process.env.AGENT_PROVIDER_NAME || provider
  const currentModel = process.env.AGENT_MODEL || process.env.ANTHROPIC_MODEL
  const allModels = await getAvailableProviderModels()

  if (!provider || !providerName) {
    return 'No provider configured. Restart Agent CLI and complete provider setup.'
  }

  const lines = [
    `Provider models for ${providerName}:`,
    ...allModels.map(model =>
      model === currentModel ? `* ${model} (current)` : `  ${model}`,
    ),
    'Use /model <model> to switch. Use /model custom <model> for custom model.',
  ]

  if (allModels.length === 0) {
    lines.splice(1, 0, '* No saved model list for this provider.')
  }

  return lines.join('\n')
}

export async function setProviderModel(model: string): Promise<string> {
  const requestedModel = model.trim()
  if (!requestedModel) {
    throw new Error('Model is required.')
  }

  const config = (await loadProviderConfig()) || getConfigFromEnvironment()
  if (!config) {
    throw new Error('No provider configured. Restart Agent CLI and complete provider setup.')
  }

  const nextConfig: AgentProviderConfig = {
    ...config,
    model: requestedModel,
    updatedAt: new Date().toISOString(),
  }

  await saveProviderConfig(nextConfig)
  applyProviderConfig(nextConfig)
  process.env.AGENT_MODEL = requestedModel
  process.env.ANTHROPIC_MODEL = requestedModel
  return requestedModel
}

export async function ensureProviderConfiguredForStartup(
  args: string[],
): Promise<void> {
  const forcePrompt = isTruthy(process.env.AGENT_PROVIDER_SETUP)
  const envConfig = getConfigFromEnvironment()
  if (envConfig && !forcePrompt) {
    applyProviderConfig(envConfig)
    return
  }

  const savedConfig = await loadProviderConfig()
  if (savedConfig && !forcePrompt) {
    applyProviderConfig(savedConfig)
    return
  }

  if (!shouldPromptForProvider(args)) {
    return
  }

  consumeEarlyInput()
  prepareTerminalForProviderPrompt()
  const config = await promptForProviderConfig()
  await saveProviderConfig(config)
  applyProviderConfig(config)
  await resetTerminalInput()
}

export async function loadProviderConfig(): Promise<AgentProviderConfig | null> {
  const globalConfig = await readGlobalConfig()
  const globalProvider = globalConfig?.[GLOBAL_PROVIDER_KEY]
  if (isProviderConfig(globalProvider)) {
    return normalizeProviderConfig(globalProvider)
  }

  if (!existsSync(ASTRO_GLOBAL_CONFIG_FILE)) {
    return null
  }

  try {
    const raw = await readFile(CONFIG_FILE, 'utf8')
    const parsed = JSON.parse(raw) as Partial<AgentProviderConfig>
    if (!isProviderConfig(parsed)) {
      return null
    }
    const normalized = normalizeProviderConfig(parsed)
    await saveProviderConfig(normalized)
    return normalized
  } catch {
    return null
  }
}

export function applyProviderConfig(config: AgentProviderConfig): void {
  const normalizedConfig = normalizeProviderConfig(config)
  process.env.AGENT_PROVIDER = normalizedConfig.provider
  process.env.AGENT_PROVIDER_NAME = normalizedConfig.providerName
  process.env.AGENT_BASE_URL = normalizedConfig.baseUrl
  process.env.AGENT_MODEL = normalizedConfig.model
  process.env.AGENT_PROVIDER_API = 'openai-compatible'
  process.env.ASTRO_BASE_URL = normalizedConfig.baseUrl

  process.env.ASTRO_CODE_USE_BEDROCK = 'false'
  process.env.ASTRO_CODE_USE_VERTEX = 'false'
  process.env.ASTRO_CODE_USE_FOUNDRY = 'false'

  if (!process.env.ANTHROPIC_MODEL) {
    process.env.ANTHROPIC_MODEL = normalizedConfig.model
  }

  const apiKey =
    normalizedConfig.apiKey || getProviderSpec(normalizedConfig.provider)?.defaultApiKey
  if (apiKey) {
    process.env.AGENT_API_KEY = apiKey
    process.env.ASTRO_API_KEY = apiKey
    if (!process.env.ANTHROPIC_AUTH_TOKEN) {
      process.env.ANTHROPIC_AUTH_TOKEN = apiKey
    }
    const envKey = getProviderSpec(normalizedConfig.provider)?.envKey
    if (envKey && !process.env[envKey]) {
      process.env[envKey] = apiKey
    }
  }
}

export function formatProviderStatus(): string | null {
  const providerName = process.env.AGENT_PROVIDER_NAME
  const model = process.env.AGENT_MODEL || process.env.ANTHROPIC_MODEL
  const baseUrl =
    process.env.AGENT_BASE_URL ||
    process.env.ASTRO_BASE_URL
  if (!providerName && !model) {
    return null
  }

  return [
    providerName ? `Provider: ${providerName}` : null,
    model ? `Provider model: ${model}` : null,
    baseUrl ? `Provider base URL: ${baseUrl}` : null,
  ]
    .filter(Boolean)
    .join('\n')
}

function shouldPromptForProvider(args: string[]): boolean {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    return false
  }
  if (isFalsey(process.env.AGENT_PROVIDER_SETUP)) {
    return false
  }
  if (
    args.includes('--help') ||
    args.includes('-h') ||
    args.includes('--version') ||
    args.includes('-v')
  ) {
    return false
  }
  if (args.includes('--model=current')) {
    return false
  }
  const modelIndex = args.indexOf('--model')
  if (modelIndex !== -1 && args[modelIndex + 1] === 'current') {
    return false
  }

  const firstPositional = getFirstPositionalArg(args)
  return (
    !firstPositional ||
    !TOP_LEVEL_COMMANDS_WITHOUT_PROVIDER.has(firstPositional)
  )
}

function getFirstPositionalArg(args: string[]): string | null {
  let skipNext = false
  for (const arg of args) {
    if (skipNext) {
      skipNext = false
      continue
    }
    if (arg === '--') {
      return null
    }
    if (arg.startsWith('--')) {
      const [option] = arg.split('=', 1)
      if (!arg.includes('=') && OPTIONS_WITH_VALUE.has(option)) {
        skipNext = true
      }
      continue
    }
    if (arg.startsWith('-')) {
      if (OPTIONS_WITH_VALUE.has(arg)) {
        skipNext = true
      }
      continue
    }
    return arg
  }
  return null
}

function getConfigFromEnvironment(): AgentProviderConfig | null {
  const provider = process.env.AGENT_PROVIDER as ProviderId | undefined
  const model = process.env.AGENT_MODEL || process.env.ANTHROPIC_MODEL
  const baseUrl =
    process.env.AGENT_BASE_URL ||
    process.env.ASTRO_BASE_URL
  if (!provider || !model || !baseUrl) {
    return null
  }
  const spec = getProviderSpec(provider)
  const now = new Date().toISOString()
  return {
    provider,
    providerName: process.env.AGENT_PROVIDER_NAME || spec?.label || provider,
    baseUrl,
    model,
    apiKey:
      process.env.AGENT_API_KEY ||
      process.env.ASTRO_API_KEY ||
      process.env.ANTHROPIC_AUTH_TOKEN,
    createdAt: now,
    updatedAt: now,
  }
}

async function promptForProviderConfig(): Promise<AgentProviderConfig> {
  const provider = await chooseProvider()
  const providerName =
    provider.id === 'other'
      ? await askWithDefault('Provider name', provider.label)
      : provider.label
  const baseUrl =
    provider.id === 'other' || provider.id === 'lmstudio'
      ? await askWithDefault('Base URL', provider.baseUrl)
      : provider.baseUrl
  const apiKey = provider.requiresApiKey
    ? await askSecretRequired('API key')
    : provider.defaultApiKey
  const model = await chooseModel(provider)
  const now = new Date().toISOString()

  return {
    provider: provider.id,
    providerName,
    baseUrl,
    model,
    apiKey,
    createdAt: now,
    updatedAt: now,
  }
}

async function chooseProvider(): Promise<ProviderSpec> {
  if (process.stdin.isTTY && process.stdout.isTTY) {
    return selectFromList(
      'Provider',
      PROVIDERS.map(provider => ({
        label: provider.label,
        description: provider.description,
        value: provider,
      })),
    )
  }

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  try {
    PROVIDERS.forEach((provider, index) => {
      process.stdout.write(`${index + 1}. ${provider.label}\n`)
    })

    while (true) {
      const answer = await rl.question('\nProvider number: ')
      const providerIndex = Number(answer.trim())
      if (
        Number.isInteger(providerIndex) &&
        providerIndex >= 1 &&
        providerIndex <= PROVIDERS.length
      ) {
        return PROVIDERS[providerIndex - 1]
      }
      process.stdout.write(`Enter a number from 1 to ${PROVIDERS.length}.\n`)
    }
  } finally {
    rl.close()
  }
}

async function chooseModel(
  provider: ProviderSpec,
): Promise<string> {
  if (provider.models.length === 0) {
    return askRequired('Model')
  }

  if (process.stdin.isTTY && process.stdout.isTTY) {
    const selected = await selectFromList(
      `${provider.label} model`,
      [
        ...provider.models.map(model => ({
          label: model,
          value: model,
        })),
        { label: 'Custom model', value: '__custom__' },
      ],
    )
    return selected === '__custom__' ? askRequired('Custom model') : selected
  }

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  try {
    process.stdout.write(`\nChoose ${provider.label} model.\n`)
    provider.models.forEach((model, index) => {
      process.stdout.write(`${index + 1}. ${model}\n`)
    })
    process.stdout.write(`${provider.models.length + 1}. Custom model\n`)

    while (true) {
      const answer = await rl.question('\nModel number: ')
      const modelIndex = Number(answer.trim())
      if (
        Number.isInteger(modelIndex) &&
        modelIndex >= 1 &&
        modelIndex <= provider.models.length
      ) {
        return provider.models[modelIndex - 1]
      }
      if (modelIndex === provider.models.length + 1) {
        return askRequired('Custom model')
      }
      process.stdout.write(
        `Enter a number from 1 to ${provider.models.length + 1}.\n`,
      )
    }
  } finally {
    rl.close()
  }
}

async function selectFromList<T>(
  title: string,
  choices: SelectChoice<T>[],
): Promise<T> {
  if (choices.length === 0) {
    throw new Error(`${title} has no choices.`)
  }

  emitKeypressEvents(process.stdin)

  const input = process.stdin
  const output = process.stdout
  const wasRaw = input.isRaw
  const wasPaused = input.isPaused()
  let selected = 0
  let renderedLineCount = 0

  function lines(): string[] {
    const rows = choices.flatMap((choice, index) => {
      const isSelected = index === selected
      const pointer = isSelected
        ? paint(' > ', ansi.black, ansi.bgCyan, ansi.bold)
        : paint('   ', ansi.dim)
      const label = isSelected
        ? paint(choice.label, ansi.bold, ansi.white)
        : paint(choice.label, ansi.cyan)
      const description = choice.description
        ? [paint(`     ${choice.description}`, ansi.dim)]
        : []
      return [`${pointer} ${label}`, ...description]
    })

    return [
      '',
      paint('╭────────────────────────────────────────╮', ansi.cyan),
      paint('│', ansi.cyan) +
        paint(' Agent CLI setup', ansi.bold, ansi.magenta) +
        paint('                     │', ansi.cyan),
      paint('╰────────────────────────────────────────╯', ansi.cyan),
      paint(`Select ${title.toLowerCase()}.`, ansi.yellow),
      '',
      ...rows,
      '',
      paint('Up/Down: move   Enter: select   Esc: cancel', ansi.dim),
    ]
  }

  function render(): void {
    if (renderedLineCount > 0) {
      output.write(`\x1b[${renderedLineCount}A`)
    }
    const nextLines = lines()
    for (const line of nextLines) {
      output.write(`\x1b[2K\r${line}\n`)
    }
    renderedLineCount = nextLines.length
  }

  return new Promise((resolve, reject) => {
    function cleanup(): void {
      input.off('keypress', onKeypress)
      if (input.isTTY) {
        input.setRawMode(Boolean(wasRaw))
      }
      if (wasPaused) {
        input.pause()
      }
    }

    function finish(): void {
      cleanup()
      if (renderedLineCount > 0) {
        output.write(`\x1b[${renderedLineCount}A`)
      }
      for (let i = 0; i < renderedLineCount; i++) {
        output.write('\x1b[2K\r')
        if (i < renderedLineCount - 1) output.write('\n')
      }
      output.write(
        `${paint('Selected', ansi.green, ansi.bold)} ${title}: ${paint(choices[selected].label, ansi.bold, ansi.white)}\n`,
      )
      resolve(choices[selected].value)
    }

    function cancel(): void {
      cleanup()
      output.write('\n')
      reject(new Error(`${title} selection cancelled.`))
    }

    function onKeypress(
      _str: string,
      key: { name?: string; ctrl?: boolean; sequence?: string },
    ): void {
      if (key.ctrl && key.name === 'c') {
        cancel()
        return
      }
      if (key.name === 'escape') {
        cancel()
        return
      }
      if (key.name === 'up') {
        selected = (selected - 1 + choices.length) % choices.length
        render()
        return
      }
      if (key.name === 'down') {
        selected = (selected + 1) % choices.length
        render()
        return
      }
      if (key.name === 'return' || key.name === 'enter') {
        finish()
      }
    }

    input.on('keypress', onKeypress)
    if (input.isTTY) {
      input.setRawMode(true)
    }
    input.resume()
    render()
  })
}

async function askRequired(label: string): Promise<string> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  try {
    while (true) {
      const value = (await rl.question(`${label}: `)).trim()
      if (value) return value
      process.stdout.write(`${label} is required.\n`)
    }
  } finally {
    rl.close()
  }
}

async function askSecretRequired(label: string): Promise<string> {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    return askRequired(label)
  }

  const input = process.stdin
  const output = process.stdout
  const wasRaw = input.isRaw
  const wasPaused = input.isPaused()
  let value = ''
  let settled = false
  let resolveSecret!: (value: string) => void
  let rejectSecret!: (error: Error) => void

  function cleanup(): void {
    input.off('data', onData)
    input.setRawMode(Boolean(wasRaw))
    if (wasPaused) {
      input.pause()
    }
  }

  function redraw(): void {
    output.write(`\r\x1b[2K${label}: ${'*'.repeat(value.length)}`)
  }

  function finish(): void {
    if (settled) return
    if (!value.trim()) {
      output.write(`\n${label} is required.`)
      value = ''
      redraw()
      return
    }
    settled = true
    cleanup()
    output.write('\n')
    resolveSecret(value.trim())
  }

  function cancel(): void {
    if (settled) return
    settled = true
    cleanup()
    output.write('\n')
    rejectSecret(new Error(`${label} entry cancelled.`))
  }

  function onData(chunk: Buffer | string): void {
    const bytes = typeof chunk === 'string' ? Buffer.from(chunk) : chunk
    for (let i = 0; i < bytes.length; i++) {
      const byte = bytes[i]!
      if (byte === 3) {
        cancel()
        return
      }
      if (byte === 13 || byte === 10) {
        finish()
        return
      }
      if (byte === 27) {
        while (
          i + 1 < bytes.length &&
          bytes[i + 1]! >= 32 &&
          bytes[i + 1]! < 127
        ) {
          i++
          if (bytes[i]! >= 64 && bytes[i]! <= 126) break
        }
        continue
      }
      if (byte === 8 || byte === 127) {
        value = value.slice(0, -1)
        redraw()
        continue
      }
      if (byte >= 32 && byte !== 127) {
        value += String.fromCharCode(byte)
        redraw()
      }
    }
  }

  return new Promise((resolve, reject) => {
    resolveSecret = resolve
    rejectSecret = reject
    input.on('data', onData)
    input.setRawMode(true)
    input.resume()
    redraw()
  })
}

async function askWithDefault(
  label: string,
  fallback: string,
): Promise<string> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  try {
    const suffix = fallback ? ` [${fallback}]` : ''
    while (true) {
      const value = (await rl.question(`${label}${suffix}: `)).trim()
      if (value) return value
      if (fallback) return fallback
      process.stdout.write(`${label} is required.\n`)
    }
  } finally {
    rl.close()
  }
}

function prepareTerminalForProviderPrompt(): void {
  if (!process.stdin.isTTY || !process.stdout.isTTY) return
  process.stdin.removeAllListeners('keypress')
  process.stdin.removeAllListeners('data')
  process.stdin.setRawMode(false)
  process.stdin.pause()
  while (process.stdin.read() !== null) {
    // Clear bytes captured before provider setup owns stdin.
  }
  process.stdout.write('\x1b[0m')
}

async function resetTerminalInput(): Promise<void> {
  if (!process.stdin.isTTY || !process.stdout.isTTY) return

  const wasRaw = process.stdin.isRaw
  process.stdin.removeAllListeners('keypress')
  process.stdin.setRawMode(true)
  process.stdin.resume()

  for (let i = 0; i < 2; i++) {
    while (process.stdin.read() !== null) {
      // Drain pending setup keystrokes before the Ink prompt starts.
    }
    await new Promise(resolve => setTimeout(resolve, 25))
  }

  process.stdin.setRawMode(Boolean(wasRaw))
  process.stdin.pause()
  process.stdout.write('\x1b[0m')
}

async function saveProviderConfig(config: AgentProviderConfig): Promise<void> {
  const normalizedConfig = normalizeProviderConfig(config)
  await mkdir(CONFIG_DIR, { recursive: true })
  await writeFile(CONFIG_FILE, `${JSON.stringify(normalizedConfig, null, 2)}\n`, {
    mode: 0o600,
  })
  if (existsSync(CONFIG_FILE)) {
    await chmod(CONFIG_FILE, 0o600)
  }
  await saveGlobalProviderConfig(normalizedConfig)
}

function getProviderSpec(provider: ProviderId): ProviderSpec | undefined {
  return PROVIDERS.find(spec => spec.id === provider)
}

function uniqueStrings(values: string[]): string[] {
  return [...new Set(values.map(value => value.trim()).filter(Boolean))]
}

async function readGlobalConfig(): Promise<Record<string, unknown> | null> {
  try {
    const raw = await readFile(ASTRO_GLOBAL_CONFIG_FILE, 'utf8')
    const parsed = JSON.parse(raw)
    return isRecord(parsed) ? parsed : null
  } catch {
    return null
  }
}

async function saveGlobalProviderConfig(
  config: AgentProviderConfig,
): Promise<void> {
  const globalConfig = (await readGlobalConfig()) || {}
  globalConfig[GLOBAL_PROVIDER_KEY] = config
  await mkdir(dirname(ASTRO_GLOBAL_CONFIG_FILE), { recursive: true })
  await writeFile(
    ASTRO_GLOBAL_CONFIG_FILE,
    `${JSON.stringify(globalConfig, null, 2)}\n`,
    { mode: 0o600 },
  )
  await chmod(ASTRO_GLOBAL_CONFIG_FILE, 0o600)
}

function isProviderConfig(value: unknown): value is AgentProviderConfig {
  if (!isRecord(value)) return false
  return (
    typeof value.provider === 'string' &&
    typeof value.providerName === 'string' &&
    typeof value.baseUrl === 'string' &&
    typeof value.model === 'string'
  )
}

function normalizeProviderConfig(
  config: AgentProviderConfig,
): AgentProviderConfig {
  if (config.provider !== 'ollama') return config
  return {
    ...config,
    baseUrl: config.baseUrl.replace(/\/v1\/?$/, ''),
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isTruthy(value: string | undefined): boolean {
  return value === '1' || value === 'true' || value === 'yes'
}

function isFalsey(value: string | undefined): boolean {
  return value === '0' || value === 'false' || value === 'no'
}
