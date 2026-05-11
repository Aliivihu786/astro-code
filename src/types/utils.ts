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
    throw new Error(`Missing original implementation for src/types/utils.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/types/utils.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/types/utils.ts (${label})`)
    },
  })
}

const stub = createStub("src/types/utils.ts")

export type AgentDefinitionsResult = any
export type AgentToolProgress = any
export type AttachmentMessage = any
export type BashProgress = any
export type BetaMessage = any
export type BetaRedactedThinkingBlock = any
export type BetaThinkingBlock = any
export type BetaToolUseBlock = any
export type BetaUsage = any
export type CompactMetadata = any
export type ContentBlockParam = any
export type DeepImmutable = any
export type ElicitResult = any
export type HookAttachment = any
export type HookPermissionDecisionAttachment = any
export type LOCAL_COMMAND_STDOUT_TAG = any
export type MAX_LINES_TO_READ = any
export type MCPProgress = any
export type Message = any
export type MessageOrigin = any
export type NormalizedAssistantMessage = any
export type NormalizedMessage = any
export type NormalizedUserMessage = any
export type PartialCompactDirection = any
export type PermissionMode = any
export type PermissionResult = any
export type Permutations = any
export type ProgressMessage = any
export type PromptRequest = any
export type PromptResponse = any
export type REPLToolProgress = any
export type RedactedThinkingBlock = any
export type RedactedThinkingBlockParam = any
export type RequestStartEvent = any
export type SDKAssistantMessageError = any
export type SDKCompactBoundaryMessage = any
export type SDKMessage = any
export type SDKRateLimitInfo = any
export type ServerResource = any
export type SkillToolProgress = any
export type StopHookInfo = any
export type StreamEvent = any
export type SystemAPIErrorMessage = any
export type SystemAgentsKilledMessage = any
export type SystemApiMetricsMessage = any
export type SystemAwaySummaryMessage = any
export type SystemBridgeStatusMessage = any
export type SystemCompactBoundaryMessage = any
export type SystemInformationalMessage = any
export type SystemLocalCommandMessage = any
export type SystemMemorySavedMessage = any
export type SystemMessage = any
export type SystemMessageLevel = any
export type SystemMicrocompactBoundaryMessage = any
export type SystemPermissionRetryMessage = any
export type SystemScheduledTaskFireMessage = any
export type SystemStopHookSummaryMessage = any
export type SystemTurnDurationMessage = any
export type TaskOutputProgress = any
export type TextBlockParam = any
export type ThinkingBlock = any
export type ThinkingBlockParam = any
export type TombstoneMessage = any
export type Tool = any
export type ToolPermissionContext = any
export type ToolProgressData = any
export type ToolResultBlockParam = any
export type ToolUseBlock = any
export type ToolUseBlockParam = any
export type ToolUseSummaryMessage = any
export type UserMessage = any
export type WebSearchProgress = any
export type c = any
export type getFeatureValue_CACHED_MAY_BE_STALE = any
export type getPdfInvalidErrorMessage = any
export type getPdfPasswordProtectedErrorMessage = any
export type getPdfTooLargeErrorMessage = any
export type getRequestTooLargeErrorMessage = any
export type isBackgroundTask = any
export type logEvent = any
export type memoryHeader = any
export type randomUUID = any
export type use = any
export type useDeferredValue = any
export type useEffect = any
export type useEffectEvent = any
export type useMemo = any
export type useRef = any

export const AttachmentMessage: any = stub
export const BetaMessage: any = stub
export const BetaRedactedThinkingBlock: any = stub
export const BetaThinkingBlock: any = stub
export const BetaToolUseBlock: any = stub
export const CompactMetadata: any = stub
export const ContentBlockParam: any = stub
export const LOCAL_COMMAND_STDOUT_TAG: any = stub
export const MAX_LINES_TO_READ: any = stub
export const Message: any = stub
export const MessageOrigin: any = stub
export const NormalizedAssistantMessage: any = stub
export const NormalizedMessage: any = stub
export const NormalizedUserMessage: any = stub
export const PartialCompactDirection: any = stub
export const ProgressMessage: any = stub
export const RedactedThinkingBlock: any = stub
export const RedactedThinkingBlockParam: any = stub
export const RequestStartEvent: any = stub
export const SDKAssistantMessageError: any = stub
export const SDKCompactBoundaryMessage: any = stub
export const SDKMessage: any = stub
export const SDKRateLimitInfo: any = stub
export const StopHookInfo: any = stub
export const StreamEvent: any = stub
export const SystemAPIErrorMessage: any = stub
export const SystemAgentsKilledMessage: any = stub
export const SystemApiMetricsMessage: any = stub
export const SystemAwaySummaryMessage: any = stub
export const SystemBridgeStatusMessage: any = stub
export const SystemCompactBoundaryMessage: any = stub
export const SystemInformationalMessage: any = stub
export const SystemLocalCommandMessage: any = stub
export const SystemMemorySavedMessage: any = stub
export const SystemMessage: any = stub
export const SystemMessageLevel: any = stub
export const SystemMicrocompactBoundaryMessage: any = stub
export const SystemPermissionRetryMessage: any = stub
export const SystemScheduledTaskFireMessage: any = stub
export const SystemStopHookSummaryMessage: any = stub
export const SystemTurnDurationMessage: any = stub
export const TextBlockParam: any = stub
export const ThinkingBlock: any = stub
export const ThinkingBlockParam: any = stub
export const TombstoneMessage: any = stub
export const ToolResultBlockParam: any = stub
export const ToolUseBlock: any = stub
export const ToolUseBlockParam: any = stub
export const ToolUseSummaryMessage: any = stub
export const UserMessage: any = stub
export const c: any = stub
export const getFeatureValue_CACHED_MAY_BE_STALE: any = stub
export const getPdfInvalidErrorMessage: any = stub
export const getPdfPasswordProtectedErrorMessage: any = stub
export const getPdfTooLargeErrorMessage: any = stub
export const getRequestTooLargeErrorMessage: any = stub
export const isBackgroundTask: any = stub
export const logEvent: any = stub
export const memoryHeader: any = stub
export const randomUUID: any = stub
export const use: any = stub
export const useDeferredValue: any = stub
export const useEffect: any = stub
export const useEffectEvent: any = stub
export const useMemo: any = stub
export const useRef: any = stub

export default stub
