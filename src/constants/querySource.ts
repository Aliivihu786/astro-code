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
    throw new Error(`Missing original implementation for src/constants/querySource.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/constants/querySource.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/constants/querySource.ts (${label})`)
    },
  })
}

const stub = createStub("src/constants/querySource.ts")

export type APIError = any
export type APIUserAbortError = any
export type AgentDefinitionsResult = any
export type AgentToolProgress = any
export type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS = any
export type AttachmentMessage = any
export type AutoCompactTrackingState = any
export type Base64ImageSource = any
export type BashProgress = any
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
export type CONTEXT_1M_BETA_HEADER = any
export type CONTEXT_MANAGEMENT_BETA_HEADER = any
export type ConnectorTextDelta = any
export type ContentBlockParam = any
export type EFFORT_BETA_HEADER = any
export type ElicitResult = any
export type FAST_MODE_BETA_HEADER = any
export type FILE_READ_TOOL_NAME = any
export type ImageBlockParam = any
export type MCPProgress = any
export type MaxFileReadTokenExceededError = any
export type MemoryFileInfo = any
export type Message = any
export type MessageOrigin = any
export type Output = any
export type PROMPT_CACHING_SCOPE_BETA_HEADER = any
export type PermissionMode = any
export type PermissionResult = any
export type ProgressMessage = any
export type QueryChainTracking = any
export type QuerySource = any
export type REDACT_THINKING_BETA_HEADER = any
export type REPLToolProgress = any
export type RequestStartEvent = any
export type STRUCTURED_OUTPUTS_BETA_HEADER = any
export type ServerResource = any
export type SkillToolProgress = any
export type StopHookInfo = any
export type StreamEvent = any
export type SystemAPIErrorMessage = any
export type SystemLocalCommandMessage = any
export type SystemMessage = any
export type SystemPrompt = any
export type TASK_BUDGETS_BETA_HEADER = any
export type TaskOutputProgress = any
export type TombstoneMessage = any
export type Tool = any
export type ToolPermissionContext = any
export type ToolProgressData = any
export type ToolResultBlockParam = any
export type ToolUseBlock = any
export type ToolUseBlockParam = any
export type ToolUseContext = any
export type ToolUseSummaryMessage = any
export type Tools = any
export type UserMessage = any
export type WebSearchProgress = any
export type applyTaskOffsetsAndEvictions = any
export type createAssistantAPIErrorMessage = any
export type createChildAbortController = any
export type createMicrocompactBoundaryMessage = any
export type createSystemMessage = any
export type createToolUseSummaryMessage = any
export type createUserInterruptionMessage = any
export type createUserMessage = any
export type enhanceSystemPromptWithEnvDetails = any
export type ensureToolResultPairing = any
export type executeTaskCompletedHooks = any
export type executeTeammateIdleHooks = any
export type extractQuotaStatusFromError = any
export type extractQuotaStatusFromHeaders = any
export type filterDuplicateMemoryAttachments = any
export type finalContextTokensFromLastResponse = any
export type getAttachmentMessages = any
export type getCLISyspromptPrefix = any
export type getCacheEditingHeaderLatched = any
export type getCommandName = any
export type getCommandsByMaxPriority = any
export type getConditionalRulesForCwdLevelDirectory = any
export type getCurrentTurnTokenBudget = any
export type getDefaultHaikuModel = any
export type getDefaultOpusModel = any
export type getDefaultSonnetModel = any
export type getFastModeHeaderLatched = any
export type getImagePasteIds = any
export type getKairosActive = any
export type getLastApiCompletionTimestamp = any
export type getLastEmittedDate = any
export type getManagedAndUserConditionalRules = any
export type getMemoryFiles = any
export type getMemoryFilesForNestedDirectory = any
export type getMergedBetas = any
export type getMessagesAfterCompactBoundary = any
export type getModelBetas = any
export type getModelMaxOutputTokens = any
export type getPromptCache1hAllowlist = any
export type getPromptCache1hEligible = any
export type getSdkBetas = any
export type getSessionId = any
export type getSkillToolCommands = any
export type getSmallFastModel = any
export type getSonnet1mExpTreatmentEnabled = any
export type getStopHookMessage = any
export type getTaskCompletedHookMessage = any
export type getTaskListId = any
export type getTeamName = any
export type getTeammateIdleHookMessage = any
export type getThinkingClearLatched = any
export type getTotalCostUSD = any
export type getTotalOutputTokens = any
export type getTurnOutputTokens = any
export type hasExitedPlanModeInSession = any
export type isAutoCompactEnabled = any
export type isConnectorTextBlock = any
export type isFileWithinReadSizeLimit = any
export type isFirstPartyAnthropicBaseUrl = any
export type isNonCustomOpusModel = any
export type isPromptTooLongMessage = any
export type isSlashCommand = any
export type isTodoV2Enabled = any
export type isValidImagePaste = any
export type listTasks = any
export type logAPIPrefix = any
export type logEvent = any
export type needsAutoModeExitAttachment = any
export type needsPlanModeExitAttachment = any
export type normalizeContentFromAPI = any
export type normalizeMessagesForAPI = any
export type parse = any
export type pathInAllowedWorkingPath = any
export type prefetch = any
export type readFile = any
export type readImageWithTokenBudget = any
export type relative = any
export type renderModelName = any
export type setAfkModeHeaderLatched = any
export type setCacheEditingHeaderLatched = any
export type setFastModeHeaderLatched = any
export type setHasExitedPlanMode = any
export type setLastApiCompletionTimestamp = any
export type setLastEmittedDate = any
export type setLastMainRequestId = any
export type setNeedsAutoModeExitAttachment = any
export type setNeedsPlanModeExitAttachment = any
export type setPromptCache1hAllowlist = any
export type setPromptCache1hEligible = any
export type setThinkingClearLatched = any
export type shouldInjectAgentListInMessages = any
export type splitSysPromptPrefix = any
export type startRelevantMemoryPrefetch = any
export type stripAdvisorBlocks = any
export type stripCallerFieldFromAssistantMessage = any
export type stripSignatureBlocks = any
export type stripToolReferenceBlocksFromUserMessage = any
export type tokenCountWithEstimation = any
export type toolMatchesName = any
export type toolToAPISchema = any

export const APIError: any = stub
export const APIUserAbortError: any = stub
export const AttachmentMessage: any = stub
export const Base64ImageSource: any = stub
export const CONTEXT_1M_BETA_HEADER: any = stub
export const CONTEXT_MANAGEMENT_BETA_HEADER: any = stub
export const ContentBlockParam: any = stub
export const EFFORT_BETA_HEADER: any = stub
export const FAST_MODE_BETA_HEADER: any = stub
export const FILE_READ_TOOL_NAME: any = stub
export const ImageBlockParam: any = stub
export const MaxFileReadTokenExceededError: any = stub
export const Message: any = stub
export const MessageOrigin: any = stub
export const PROMPT_CACHING_SCOPE_BETA_HEADER: any = stub
export const REDACT_THINKING_BETA_HEADER: any = stub
export const RequestStartEvent: any = stub
export const STRUCTURED_OUTPUTS_BETA_HEADER: any = stub
export const StopHookInfo: any = stub
export const StreamEvent: any = stub
export const SystemAPIErrorMessage: any = stub
export const TASK_BUDGETS_BETA_HEADER: any = stub
export const TombstoneMessage: any = stub
export const ToolUseSummaryMessage: any = stub
export const UserMessage: any = stub
export const applyTaskOffsetsAndEvictions: any = stub
export const createAssistantAPIErrorMessage: any = stub
export const createChildAbortController: any = stub
export const createMicrocompactBoundaryMessage: any = stub
export const createSystemMessage: any = stub
export const createToolUseSummaryMessage: any = stub
export const createUserInterruptionMessage: any = stub
export const createUserMessage: any = stub
export const enhanceSystemPromptWithEnvDetails: any = stub
export const ensureToolResultPairing: any = stub
export const executeTaskCompletedHooks: any = stub
export const executeTeammateIdleHooks: any = stub
export const extractQuotaStatusFromError: any = stub
export const extractQuotaStatusFromHeaders: any = stub
export const filterDuplicateMemoryAttachments: any = stub
export const finalContextTokensFromLastResponse: any = stub
export const getAttachmentMessages: any = stub
export const getCLISyspromptPrefix: any = stub
export const getCacheEditingHeaderLatched: any = stub
export const getCommandName: any = stub
export const getCommandsByMaxPriority: any = stub
export const getConditionalRulesForCwdLevelDirectory: any = stub
export const getCurrentTurnTokenBudget: any = stub
export const getDefaultHaikuModel: any = stub
export const getDefaultOpusModel: any = stub
export const getDefaultSonnetModel: any = stub
export const getFastModeHeaderLatched: any = stub
export const getImagePasteIds: any = stub
export const getKairosActive: any = stub
export const getLastApiCompletionTimestamp: any = stub
export const getLastEmittedDate: any = stub
export const getManagedAndUserConditionalRules: any = stub
export const getMemoryFiles: any = stub
export const getMemoryFilesForNestedDirectory: any = stub
export const getMergedBetas: any = stub
export const getMessagesAfterCompactBoundary: any = stub
export const getModelBetas: any = stub
export const getModelMaxOutputTokens: any = stub
export const getPromptCache1hAllowlist: any = stub
export const getPromptCache1hEligible: any = stub
export const getSdkBetas: any = stub
export const getSessionId: any = stub
export const getSkillToolCommands: any = stub
export const getSmallFastModel: any = stub
export const getSonnet1mExpTreatmentEnabled: any = stub
export const getStopHookMessage: any = stub
export const getTaskCompletedHookMessage: any = stub
export const getTaskListId: any = stub
export const getTeamName: any = stub
export const getTeammateIdleHookMessage: any = stub
export const getThinkingClearLatched: any = stub
export const getTotalCostUSD: any = stub
export const getTotalOutputTokens: any = stub
export const getTurnOutputTokens: any = stub
export const hasExitedPlanModeInSession: any = stub
export const isAutoCompactEnabled: any = stub
export const isConnectorTextBlock: any = stub
export const isFileWithinReadSizeLimit: any = stub
export const isFirstPartyAnthropicBaseUrl: any = stub
export const isNonCustomOpusModel: any = stub
export const isPromptTooLongMessage: any = stub
export const isSlashCommand: any = stub
export const isTodoV2Enabled: any = stub
export const isValidImagePaste: any = stub
export const listTasks: any = stub
export const logAPIPrefix: any = stub
export const logEvent: any = stub
export const needsAutoModeExitAttachment: any = stub
export const needsPlanModeExitAttachment: any = stub
export const normalizeContentFromAPI: any = stub
export const normalizeMessagesForAPI: any = stub
export const parse: any = stub
export const pathInAllowedWorkingPath: any = stub
export const prefetch: any = stub
export const readFile: any = stub
export const readImageWithTokenBudget: any = stub
export const relative: any = stub
export const renderModelName: any = stub
export const setAfkModeHeaderLatched: any = stub
export const setCacheEditingHeaderLatched: any = stub
export const setFastModeHeaderLatched: any = stub
export const setHasExitedPlanMode: any = stub
export const setLastApiCompletionTimestamp: any = stub
export const setLastEmittedDate: any = stub
export const setLastMainRequestId: any = stub
export const setNeedsAutoModeExitAttachment: any = stub
export const setNeedsPlanModeExitAttachment: any = stub
export const setPromptCache1hAllowlist: any = stub
export const setPromptCache1hEligible: any = stub
export const setThinkingClearLatched: any = stub
export const shouldInjectAgentListInMessages: any = stub
export const splitSysPromptPrefix: any = stub
export const startRelevantMemoryPrefetch: any = stub
export const stripAdvisorBlocks: any = stub
export const stripCallerFieldFromAssistantMessage: any = stub
export const stripSignatureBlocks: any = stub
export const stripToolReferenceBlocksFromUserMessage: any = stub
export const tokenCountWithEstimation: any = stub
export const toolMatchesName: any = stub
export const toolToAPISchema: any = stub

export default stub
