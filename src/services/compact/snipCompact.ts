/*
 * AUTO-GENERATED COMPATIBILITY STUB.
 *
 * The recovered source tree imports this module, but the original file is
 * absent from this checkout. This stub only exists so local tooling can
 * resolve modules; it is not a replacement for the original implementation.
 */

type StubCallable = ((...args: unknown[]) => unknown) & Record<PropertyKey, unknown>

const createStub = (label: string): StubCallable => {
  const target = function compatibilityStub() {
    throw new Error(`Missing original implementation for src/services/compact/snipCompact.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/services/compact/snipCompact.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/services/compact/snipCompact.ts (${label})`)
    },
  })
}

const stub = createStub("src/services/compact/snipCompact.ts")

export type AttachmentMessage = any
export type CollapsedReadSearchGroup = any
export type GroupedToolUseMessage = any
export type NormalizedUserMessage = any
export type ProgressMessage = any
export type TextBlockParam = any
export type ThinkingBlockParam = any
export type ToolResultBlockParam = any
export type addMargin = any
export type c = any
export type commands = any
export type containerWidth = any
export type inProgressToolUseIDs = any
export type isActiveCollapsedGroup = any
export type isTranscriptMode = any
export type isUserContinuation = any
export type lastThinkingBlockId = any
export type lookups = any
export type onOpenRateLimitOptions = any
export type progressMessagesForMessage = any
export type shouldAnimate = any
export type shouldShowDot = any
export type style = any
export type tools = any
export type verbose = any
export type width = any

export const AttachmentMessage: any = stub
export const CollapsedReadSearchGroup: any = stub
export const GroupedToolUseMessage: any = stub
export const NormalizedUserMessage: any = stub
export const ProgressMessage: any = stub
export const TextBlockParam: any = stub
export const ThinkingBlockParam: any = stub
export const ToolResultBlockParam: any = stub
export const addMargin: any = stub
export const c: any = stub
export const commands: any = stub
export const containerWidth: any = stub
export const inProgressToolUseIDs: any = stub
export const isActiveCollapsedGroup: any = stub
export const isTranscriptMode: any = stub
export const isUserContinuation: any = stub
export const lastThinkingBlockId: any = stub
export const lookups: any = stub
export const onOpenRateLimitOptions: any = stub
export const progressMessagesForMessage: any = stub
export const shouldAnimate: any = stub
export const shouldShowDot: any = stub
export const style: any = stub
export const tools: any = stub
export const verbose: any = stub
export const width: any = stub

export default stub
