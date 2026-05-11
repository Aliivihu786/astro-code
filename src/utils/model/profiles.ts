export const MODEL_PROFILES = [
  'default',
  'fast',
  'balanced',
  'deep',
  'best',
] as const

export type ModelProfile = (typeof MODEL_PROFILES)[number]

export function isModelProfile(value: string): value is ModelProfile {
  return (MODEL_PROFILES as readonly string[]).includes(value)
}

export function getDisplayModelProfile(
  value: string | null | undefined,
): ModelProfile {
  if (!value) return 'default'
  const normalized = value.toLowerCase()
  if (isModelProfile(normalized)) return normalized
  if (normalized.includes('haiku')) return 'fast'
  if (normalized.includes('sonnet')) return 'balanced'
  if (normalized.includes('opus')) return 'deep'
  return 'default'
}

export function formatModelProfileStatus(active: ModelProfile): string {
  const currentModel = process.env.AGENT_MODEL || process.env.ANTHROPIC_MODEL
  const baseUrl =
    process.env.AGENT_BASE_URL ||
    process.env.ASTRO_BASE_URL ||
    process.env.ASTRO_BASE_URL
  const providerLines = [
    process.env.AGENT_PROVIDER_NAME
      ? `Provider: ${process.env.AGENT_PROVIDER_NAME}`
      : null,
    currentModel ? `Current model: ${currentModel}` : null,
    baseUrl ? `Base URL: ${baseUrl}` : null,
  ].filter(Boolean)

  return [
    `Current model profile: ${active}`,
    ...providerLines,
    `Available profiles: ${MODEL_PROFILES.join(', ')}`,
  ].join('\n')
}
