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
    throw new Error(`Missing original implementation for src/assistant/index.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/assistant/index.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/assistant/index.ts (${label})`)
    },
  })
}

const stub = createStub("src/assistant/index.ts")

export type BridgePermissionResponse = any
export type abortControllerRef = any
export type atCount = any
export type bridgeOauthDeadExpiresAt = any
export type bridgeOauthDeadFailCount = any
export type bridgeSessionId = any
export type c = any
export type commands = any
export type createBridgeSession = any
export type derived = any
export type errorCorrectionLevel = any
export type generateSessionTitle = any
export type getAccessToken = any
export type getAutoModeUnavailableReason = any
export type getBridgeBaseUrl = any
export type getBridgeDisabledReason = any
export type getBridgeTokenOverride = any
export type getAstroAIOAuthTokens = any
export type getMessages = any
export type getMessagesAfterCompactBoundary = any
export type handleOAuth401Error = any
export type initialHistoryCap = any
export type initialMessages = any
export type initialName = any
export type isAutoModeGateEnabled = any
export type isBridgeEnabledBlocking = any
export type isBypassPermissionsModeDisabled = any
export type isCseShimEnabled = any
export type isEnvLessBridgeEnabled = any
export type isSyntheticMessage = any
export type jsx = any
export type mainLoopModel = any
export type onAuth401 = any
export type onInterrupt = any
export type onPermissionResponse = any
export type onSetMaxThinkingTokens = any
export type onSetModel = any
export type onSetPermissionMode = any
export type onStateChange = any
export type onUserMessage = any
export type orgUUID = any
export type outboundOnly = any
export type perpetual = any
export type previouslyFlushedUUIDs = any
export type priority = any
export type replBridgeEnabled = any
export type replBridgeError = any
export type replBridgeExplicit = any
export type replBridgeInitialName = any
export type replBridgeOutboundOnly = any
export type setMessages = any
export type showRemoteCallout = any
export type small = any
export type tags = any
export type then = any
export type title = any
export type toSDKMessages = any
export type updateBridgeSessionTitle = any
export type useAppStateStore = any
export type useEffect = any
export type waitForPolicyLimitsToLoad = any

export const BridgePermissionResponse: any = stub
export const abortControllerRef: any = stub
export const atCount: any = stub
export const bridgeOauthDeadExpiresAt: any = stub
export const bridgeOauthDeadFailCount: any = stub
export const bridgeSessionId: any = stub
export const c: any = stub
export const commands: any = stub
export const createBridgeSession: any = stub
export const derived: any = stub
export const errorCorrectionLevel: any = stub
export const generateSessionTitle: any = stub
export const getAccessToken: any = stub
export const getAutoModeUnavailableReason: any = stub
export const getBridgeBaseUrl: any = stub
export const getBridgeDisabledReason: any = stub
export const getBridgeTokenOverride: any = stub
export const getAstroAIOAuthTokens: any = stub
export const getMessages: any = stub
export const getMessagesAfterCompactBoundary: any = stub
export const handleOAuth401Error: any = stub
export const initialHistoryCap: any = stub
export const initialMessages: any = stub
export const initialName: any = stub
export const isAutoModeGateEnabled: any = stub
export const isBridgeEnabledBlocking: any = stub
export const isBypassPermissionsModeDisabled: any = stub
export const isCseShimEnabled: any = stub
export const isEnvLessBridgeEnabled: any = stub
export const isSyntheticMessage: any = stub
export const jsx: any = stub
export const mainLoopModel: any = stub
export const onAuth401: any = stub
export const onInterrupt: any = stub
export const onPermissionResponse: any = stub
export const onSetMaxThinkingTokens: any = stub
export const onSetModel: any = stub
export const onSetPermissionMode: any = stub
export const onStateChange: any = stub
export const onUserMessage: any = stub
export const orgUUID: any = stub
export const outboundOnly: any = stub
export const perpetual: any = stub
export const previouslyFlushedUUIDs: any = stub
export const priority: any = stub
export const replBridgeEnabled: any = stub
export const replBridgeError: any = stub
export const replBridgeExplicit: any = stub
export const replBridgeInitialName: any = stub
export const replBridgeOutboundOnly: any = stub
export const setMessages: any = stub
export const showRemoteCallout: any = stub
export const small: any = stub
export const tags: any = stub
export const then: any = stub
export const title: any = stub
export const toSDKMessages: any = stub
export const updateBridgeSessionTitle: any = stub
export const useAppStateStore: any = stub
export const useEffect: any = stub
export const waitForPolicyLimitsToLoad: any = stub

export default stub
