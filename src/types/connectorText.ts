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
    throw new Error(`Missing original implementation for src/types/connectorText.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/types/connectorText.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/types/connectorText.ts (${label})`)
    },
  })
}

const stub = createStub("src/types/connectorText.ts")

export type BetaContentBlock = any
export type BetaContentBlockParam = any
export type BetaImageBlockParam = any
export type BetaJSONOutputFormat = any
export type BetaMessage = any
export type BetaMessageDeltaUsage = any
export type BetaMessageParam = any
export type BetaMessageStreamParams = any
export type BetaOutputConfig = any
export type BetaRawMessageStreamEvent = any
export type BetaRequestDocumentBlock = any
export type BetaStopReason = any
export type BetaToolChoiceAuto = any
export type BetaToolChoiceTool = any
export type BetaToolResultBlockParam = any
export type BetaToolUnion = any
export type BetaUsage = any
export type ConnectorTextBlock = any
export type ConnectorTextDelta = any
export type ContentBlockParam = any
export type QueryChainTracking = any
export type RedactedThinkingBlock = any
export type RedactedThinkingBlockParam = any
export type TextBlockParam = any
export type ThinkingBlock = any
export type ThinkingBlockParam = any
export type Tool = any
export type ToolPermissionContext = any
export type ToolResultBlockParam = any
export type ToolUseBlock = any
export type ToolUseBlockParam = any
export type Tools = any
export type c = any
export type consumePostCompaction = any
export type getCLISyspromptPrefix = any
export type getFeatureValue_CACHED_MAY_BE_STALE = any
export type getIsNonInteractiveSession = any
export type getLastApiCompletionTimestamp = any
export type getPdfInvalidErrorMessage = any
export type getPdfPasswordProtectedErrorMessage = any
export type getPdfTooLargeErrorMessage = any
export type getRequestTooLargeErrorMessage = any
export type getTeleportedSessionInfo = any
export type isConnectorTextBlock = any
export type isFirstPartyAnthropicBaseUrl = any
export type logEvent = any
export type markFirstTeleportMessageLogged = any
export type setLastApiCompletionTimestamp = any
export type toolMatchesName = any

export const BetaUsage: any = stub
export const ContentBlockParam: any = stub
export const RedactedThinkingBlock: any = stub
export const RedactedThinkingBlockParam: any = stub
export const TextBlockParam: any = stub
export const ThinkingBlock: any = stub
export const ThinkingBlockParam: any = stub
export const ToolResultBlockParam: any = stub
export const ToolUseBlock: any = stub
export const ToolUseBlockParam: any = stub
export const c: any = stub
export const consumePostCompaction: any = stub
export const getCLISyspromptPrefix: any = stub
export const getFeatureValue_CACHED_MAY_BE_STALE: any = stub
export const getIsNonInteractiveSession: any = stub
export const getLastApiCompletionTimestamp: any = stub
export const getPdfInvalidErrorMessage: any = stub
export const getPdfPasswordProtectedErrorMessage: any = stub
export const getPdfTooLargeErrorMessage: any = stub
export const getRequestTooLargeErrorMessage: any = stub
export const getTeleportedSessionInfo: any = stub
export const isConnectorTextBlock: any = stub
export const isFirstPartyAnthropicBaseUrl: any = stub
export const logEvent: any = stub
export const markFirstTeleportMessageLogged: any = stub
export const setLastApiCompletionTimestamp: any = stub
export const toolMatchesName: any = stub

export default stub
