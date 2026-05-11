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
    throw new Error(`Missing original implementation for src/entrypoints/sdk/controlTypes.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/entrypoints/sdk/controlTypes.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/entrypoints/sdk/controlTypes.ts (${label})`)
    },
  })
}

const stub = createStub("src/entrypoints/sdk/controlTypes.ts")

export type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS = any
export type BoundedUUIDSet = any
export type BridgeConfig = any
export type BridgeFatalError = any
export type BridgePermissionResponse = any
export type BridgeState = any
export type CallToolResult = any
export type ElicitResult = any
export type EnvLessBridgeConfig = any
export type HookJSONOutput = any
export type JSONRPCMessage = any
export type McpSdkServerConfig = any
export type McpServerConfigForProcessTransport = any
export type McpServerStatus = any
export type ModelInfo = any
export type PermissionResult = any
export type PermissionUpdate = any
export type READ_FILE_STATE_CACHE_SIZE = any
export type ReplBridgeHandle = any
export type ReplBridgeTransport = any
export type RequiresActionDetails = any
export type RewindFilesResult = any
export type SDKControlCancelRequest = any
export type SDKControlInitializeRequest = any
export type SDKControlInitializeResponse = any
export type SDKControlMcpSetServersResponse = any
export type SDKControlPermissionRequest = any
export type SDKControlReloadPluginsResponse = any
export type SDKControlRequest = any
export type SDKControlRequestInner = any
export type SDKControlResponse = any
export type SDKMessage = any
export type SDKPartialAssistantMessage = any
export type SDKUserMessage = any
export type SDKUserMessageReplay = any
export type ScopedMcpServerConfig = any
export type SessionExternalMetadata = any
export type StdinMessage = any
export type StdoutMessage = any
export type Tool = any
export type ToolAnnotations = any
export type TurnInterruptionState = any
export type buildCCRv2SdkUrl = any
export type buildSdkUrl = any
export type createV1ReplTransport = any
export type createV2ReplTransport = any
export type dequeueAllMatching = any
export type enqueue = any
export type extractHttpStatus = any
export type extractTitleText = any
export type findChannelEntry = any
export type formatDescriptionWithSource = any
export type gateChannelServer = any
export type getCommandName = any
export type getCommandsByMaxPriority = any
export type gracefulShutdownSync = any
export type handleServerControlRequest = any
export type hasCommandsInQueue = any
export type isBuiltInAgent = any
export type isChannelsEnabled = any
export type isEligibleBridgeMessage = any
export type isExpiredErrorType = any
export type isShuttingDown = any
export type isSuppressible403 = any
export type logBridgeSkip = any
export type logError = any
export type logEvent = any
export type makeResultMessage = any
export type mergeFileStateCaches = any
export type notifySessionMetadataChanged = any
export type notifySessionStateChanged = any
export type parseAgentsFromJson = any
export type peek = any
export type redownloadUserSettings = any
export type registerProcessOutputErrorHandlers = any
export type sameSessionId = any
export type setPermissionModeChangedListener = any
export type subscribeToCommandQueue = any
export type useEffect = any
export type withDiagnosticsTiming = any
export type wrapChannelMessage = any

export const BoundedUUIDSet: any = stub
export const BridgeFatalError: any = stub
export const HookJSONOutput: any = stub
export const JSONRPCMessage: any = stub
export const McpSdkServerConfig: any = stub
export const McpServerConfigForProcessTransport: any = stub
export const McpServerStatus: any = stub
export const ModelInfo: any = stub
export const PermissionResult: any = stub
export const PermissionUpdate: any = stub
export const READ_FILE_STATE_CACHE_SIZE: any = stub
export const RewindFilesResult: any = stub
export const SDKControlInitializeRequest: any = stub
export const SDKControlInitializeResponse: any = stub
export const SDKControlMcpSetServersResponse: any = stub
export const SDKControlReloadPluginsResponse: any = stub
export const SDKControlRequest: any = stub
export const SDKControlRequestInner: any = stub
export const SDKControlResponse: any = stub
export const SDKMessage: any = stub
export const SDKUserMessage: any = stub
export const SDKUserMessageReplay: any = stub
export const ScopedMcpServerConfig: any = stub
export const StdinMessage: any = stub
export const StdoutMessage: any = stub
export const buildCCRv2SdkUrl: any = stub
export const buildSdkUrl: any = stub
export const createV1ReplTransport: any = stub
export const createV2ReplTransport: any = stub
export const dequeueAllMatching: any = stub
export const enqueue: any = stub
export const extractHttpStatus: any = stub
export const extractTitleText: any = stub
export const findChannelEntry: any = stub
export const formatDescriptionWithSource: any = stub
export const gateChannelServer: any = stub
export const getCommandName: any = stub
export const getCommandsByMaxPriority: any = stub
export const gracefulShutdownSync: any = stub
export const handleServerControlRequest: any = stub
export const hasCommandsInQueue: any = stub
export const isBuiltInAgent: any = stub
export const isChannelsEnabled: any = stub
export const isEligibleBridgeMessage: any = stub
export const isExpiredErrorType: any = stub
export const isShuttingDown: any = stub
export const isSuppressible403: any = stub
export const logBridgeSkip: any = stub
export const logError: any = stub
export const logEvent: any = stub
export const makeResultMessage: any = stub
export const mergeFileStateCaches: any = stub
export const notifySessionMetadataChanged: any = stub
export const notifySessionStateChanged: any = stub
export const parseAgentsFromJson: any = stub
export const peek: any = stub
export const redownloadUserSettings: any = stub
export const registerProcessOutputErrorHandlers: any = stub
export const sameSessionId: any = stub
export const setPermissionModeChangedListener: any = stub
export const subscribeToCommandQueue: any = stub
export const useEffect: any = stub
export const withDiagnosticsTiming: any = stub
export const wrapChannelMessage: any = stub

export default stub
