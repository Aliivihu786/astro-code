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
    throw new Error(`Missing original implementation for src/types/statusLine.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/types/statusLine.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/types/statusLine.ts (${label})`)
    },
  })
}

const stub = createStub("src/types/statusLine.ts")

export type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS = any
export type AsyncHookJSONOutput = any
export type Box = any
export type ConfigChangeHookInput = any
export type CwdChangedHookInput = any
export type ElicitationHookInput = any
export type ElicitationResultHookInput = any
export type ExitReason = any
export type FileChangedHookInput = any
export type HookCallback = any
export type HookCallbackMatcher = any
export type HookInput = any
export type HookJSONOutput = any
export type InstructionsLoadedHookInput = any
export type NotificationHookInput = any
export type PermissionDeniedHookInput = any
export type PermissionRequestHookInput = any
export type PermissionRequestResult = any
export type PermissionUpdate = any
export type PostCompactHookInput = any
export type PostToolUseFailureHookInput = any
export type PostToolUseHookInput = any
export type PreCompactHookInput = any
export type PreToolUseHookInput = any
export type PromptRequest = any
export type PromptResponse = any
export type SessionEndHookInput = any
export type SessionStartHookInput = any
export type SetupHookInput = any
export type StatusLineCommandInput = any
export type StopFailureHookInput = any
export type StopHookInput = any
export type SubagentStartHookInput = any
export type SubagentStopHookInput = any
export type SyncHookJSONOutput = any
export type TaskCompletedHookInput = any
export type TaskCreatedHookInput = any
export type TeammateIdleHookInput = any
export type UserPromptSubmitHookInput = any
export type addToTurnHookDuration = any
export type endHookSpan = any
export type getAgentTranscriptPath = any
export type getIsNonInteractiveSession = any
export type getKairosActive = any
export type getMainThreadAgentType = any
export type getOriginalCwd = any
export type getProjectRoot = any
export type getRegisteredHooks = any
export type getSdkBetas = any
export type getSettingsForSource = any
export type getStatsStore = any
export type getTotalCost = any
export type getTotalDuration = any
export type getTotalInputTokens = any
export type getTotalLinesAdded = any
export type getTotalLinesRemoved = any
export type invalidateSessionEnvCache = any
export type isAsyncHookJSONOutput = any
export type isBetaTracingEnabled = any
export type isSyncHookJSONOutput = any
export type promptRequestSchema = any
export type shouldAllowManagedHooksOnly = any
export type shouldDisableAllHooksIncludingManaged = any
export type substituteUserConfigVariables = any
export type useCallback = any
export type useEffect = any

export const AsyncHookJSONOutput: any = stub
export const Box: any = stub
export const ConfigChangeHookInput: any = stub
export const CwdChangedHookInput: any = stub
export const ElicitationHookInput: any = stub
export const ElicitationResultHookInput: any = stub
export const ExitReason: any = stub
export const FileChangedHookInput: any = stub
export const HookInput: any = stub
export const HookJSONOutput: any = stub
export const InstructionsLoadedHookInput: any = stub
export const NotificationHookInput: any = stub
export const PermissionDeniedHookInput: any = stub
export const PermissionRequestHookInput: any = stub
export const PermissionUpdate: any = stub
export const PostCompactHookInput: any = stub
export const PostToolUseFailureHookInput: any = stub
export const PostToolUseHookInput: any = stub
export const PreCompactHookInput: any = stub
export const PreToolUseHookInput: any = stub
export const SessionEndHookInput: any = stub
export const SessionStartHookInput: any = stub
export const SetupHookInput: any = stub
export const StopFailureHookInput: any = stub
export const StopHookInput: any = stub
export const SubagentStartHookInput: any = stub
export const SubagentStopHookInput: any = stub
export const SyncHookJSONOutput: any = stub
export const TaskCompletedHookInput: any = stub
export const TaskCreatedHookInput: any = stub
export const TeammateIdleHookInput: any = stub
export const UserPromptSubmitHookInput: any = stub
export const addToTurnHookDuration: any = stub
export const endHookSpan: any = stub
export const getAgentTranscriptPath: any = stub
export const getIsNonInteractiveSession: any = stub
export const getKairosActive: any = stub
export const getMainThreadAgentType: any = stub
export const getOriginalCwd: any = stub
export const getProjectRoot: any = stub
export const getRegisteredHooks: any = stub
export const getSdkBetas: any = stub
export const getSettingsForSource: any = stub
export const getStatsStore: any = stub
export const getTotalCost: any = stub
export const getTotalDuration: any = stub
export const getTotalInputTokens: any = stub
export const getTotalLinesAdded: any = stub
export const getTotalLinesRemoved: any = stub
export const invalidateSessionEnvCache: any = stub
export const isAsyncHookJSONOutput: any = stub
export const isBetaTracingEnabled: any = stub
export const isSyncHookJSONOutput: any = stub
export const promptRequestSchema: any = stub
export const shouldAllowManagedHooksOnly: any = stub
export const shouldDisableAllHooksIncludingManaged: any = stub
export const substituteUserConfigVariables: any = stub
export const useCallback: any = stub
export const useEffect: any = stub

export default stub
