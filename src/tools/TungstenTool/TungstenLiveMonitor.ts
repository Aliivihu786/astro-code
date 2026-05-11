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
    throw new Error(`Missing original implementation for src/tools/TungstenTool/TungstenLiveMonitor.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/tools/TungstenTool/TungstenLiveMonitor.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/tools/TungstenTool/TungstenLiveMonitor.ts (${label})`)
    },
  })
}

const stub = createStub("src/tools/TungstenTool/TungstenLiveMonitor.ts")

export type BriefIdleStatus = any
export type COMMAND_MESSAGE_TAG = any
export type COMMAND_NAME_TAG = any
export type CommandResultDisplay = any
export type FileHistorySnapshot = any
export type FileHistoryState = any
export type HookResultMessage = any
export type ProgressMessage = any
export type QueuedCommand = any
export type ResumeEntrypoint = any
export type SetAppState = any
export type StreamingThinking = any
export type StreamingToolUse = any
export type Text = any
export type TungstenLiveMonitor = any
export type UserMessage = any
export type _n = any
export type adoptResumedSessionFile = any
export type appendMessageToLocalAgent = any
export type applyPermissionUpdates = any
export type c = any
export type checkAndDisableAutoModeIfNeeded = any
export type closeOpenDiffs = any
export type copyFileHistoryForResume = any
export type copyPlanForResume = any
export type createAgentsKilledMessage = any
export type createApiMetricsMessage = any
export type createAssistantMessage = any
export type createCommandInputMessage = any
export type createSystemMessage = any
export type createTurnDurationMessage = any
export type createUserMessage = any
export type enqueue = any
export type expandPastedTextRefs = any
export type fileHistoryEnabled = any
export type fileHistoryRewind = any
export type generateSandboxRequestId = any
export type getBudgetContinuationCount = any
export type getCommandName = any
export type getCommandQueue = any
export type getCommandQueueLength = any
export type getConnectedIdeClient = any
export type getContentText = any
export type getCurrentSessionTitle = any
export type getCurrentTurnTokenBudget = any
export type getLastInteractionTime = any
export type getMessagesAfterCompactBoundary = any
export type getOriginalCwd = any
export type getPlanSlug = any
export type getProjectRoot = any
export type getSessionId = any
export type getTurnClassifierCount = any
export type getTurnClassifierDurationMs = any
export type getTurnHookCount = any
export type getTurnHookDurationMs = any
export type getTurnOutputTokens = any
export type getTurnToolCount = any
export type getTurnToolDurationMs = any
export type handleKeyEvent = any
export type handleMessageFromStream = any
export type handleTranscriptSelect = any
export type isCompactBoundaryMessage = any
export type isEphemeralToolProgress = any
export type isLoggableMessage = any
export type mergeFileStateCaches = any
export type queuePendingMessage = any
export type reconstructContentReplacementState = any
export type registerLeaderSetToolPermissionContext = any
export type removeLastFromHistory = any
export type removeTranscriptMessage = any
export type resetAnchor = any
export type resetCostState = any
export type resetSessionFilePointer = any
export type resetTurnHookDuration = any
export type resetTurnToolDuration = any
export type restoreAgentFromSession = any
export type restoreSessionMetadata = any
export type restoreSessionStateFromLog = any
export type restoreWorktreeForResume = any
export type saveCurrentSessionCosts = any
export type saveGlobalConfig = any
export type saveWorktreeState = any
export type selectableUserMessagesFilter = any
export type sendSandboxPermissionRequestViaMailbox = any
export type setCostStateForRestore = any
export type switchSession = any
export type unregisterLeaderToolUseConfirmQueue = any
export type updateSessionName = any
export type useCallback = any
export type useDeferredValue = any
export type useKickOffCheckAndDisableBypassPermissionsIfNeeded = any
export type useLayoutEffect = any
export type useMemo = any
export type useRef = any
export type useSetAppState = any
export type useState = any
export type useStdin = any
export type useTerminalFocus = any
export type useTerminalTitle = any
export type useTheme = any

export const BriefIdleStatus: any = stub
export const COMMAND_MESSAGE_TAG: any = stub
export const COMMAND_NAME_TAG: any = stub
export const HookResultMessage: any = stub
export const ProgressMessage: any = stub
export const QueuedCommand: any = stub
export const Text: any = stub
export const TungstenLiveMonitor: any = stub
export const UserMessage: any = stub
export const _n: any = stub
export const adoptResumedSessionFile: any = stub
export const appendMessageToLocalAgent: any = stub
export const applyPermissionUpdates: any = stub
export const c: any = stub
export const checkAndDisableAutoModeIfNeeded: any = stub
export const closeOpenDiffs: any = stub
export const copyFileHistoryForResume: any = stub
export const copyPlanForResume: any = stub
export const createAgentsKilledMessage: any = stub
export const createApiMetricsMessage: any = stub
export const createAssistantMessage: any = stub
export const createCommandInputMessage: any = stub
export const createSystemMessage: any = stub
export const createTurnDurationMessage: any = stub
export const createUserMessage: any = stub
export const enqueue: any = stub
export const expandPastedTextRefs: any = stub
export const fileHistoryEnabled: any = stub
export const fileHistoryRewind: any = stub
export const generateSandboxRequestId: any = stub
export const getBudgetContinuationCount: any = stub
export const getCommandName: any = stub
export const getCommandQueue: any = stub
export const getCommandQueueLength: any = stub
export const getConnectedIdeClient: any = stub
export const getContentText: any = stub
export const getCurrentSessionTitle: any = stub
export const getCurrentTurnTokenBudget: any = stub
export const getLastInteractionTime: any = stub
export const getMessagesAfterCompactBoundary: any = stub
export const getOriginalCwd: any = stub
export const getPlanSlug: any = stub
export const getProjectRoot: any = stub
export const getSessionId: any = stub
export const getTurnClassifierCount: any = stub
export const getTurnClassifierDurationMs: any = stub
export const getTurnHookCount: any = stub
export const getTurnHookDurationMs: any = stub
export const getTurnOutputTokens: any = stub
export const getTurnToolCount: any = stub
export const getTurnToolDurationMs: any = stub
export const handleKeyEvent: any = stub
export const handleMessageFromStream: any = stub
export const handleTranscriptSelect: any = stub
export const isCompactBoundaryMessage: any = stub
export const isEphemeralToolProgress: any = stub
export const isLoggableMessage: any = stub
export const mergeFileStateCaches: any = stub
export const queuePendingMessage: any = stub
export const reconstructContentReplacementState: any = stub
export const registerLeaderSetToolPermissionContext: any = stub
export const removeLastFromHistory: any = stub
export const removeTranscriptMessage: any = stub
export const resetAnchor: any = stub
export const resetCostState: any = stub
export const resetSessionFilePointer: any = stub
export const resetTurnHookDuration: any = stub
export const resetTurnToolDuration: any = stub
export const restoreAgentFromSession: any = stub
export const restoreSessionMetadata: any = stub
export const restoreSessionStateFromLog: any = stub
export const restoreWorktreeForResume: any = stub
export const saveCurrentSessionCosts: any = stub
export const saveGlobalConfig: any = stub
export const saveWorktreeState: any = stub
export const selectableUserMessagesFilter: any = stub
export const sendSandboxPermissionRequestViaMailbox: any = stub
export const setCostStateForRestore: any = stub
export const switchSession: any = stub
export const unregisterLeaderToolUseConfirmQueue: any = stub
export const updateSessionName: any = stub
export const useCallback: any = stub
export const useDeferredValue: any = stub
export const useKickOffCheckAndDisableBypassPermissionsIfNeeded: any = stub
export const useLayoutEffect: any = stub
export const useMemo: any = stub
export const useRef: any = stub
export const useSetAppState: any = stub
export const useState: any = stub
export const useStdin: any = stub
export const useTerminalFocus: any = stub
export const useTerminalTitle: any = stub
export const useTheme: any = stub

export default stub
