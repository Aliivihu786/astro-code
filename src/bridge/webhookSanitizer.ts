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
    throw new Error(`Missing original implementation for src/bridge/webhookSanitizer.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/bridge/webhookSanitizer.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/bridge/webhookSanitizer.ts (${label})`)
    },
  })
}

const stub = createStub("src/bridge/webhookSanitizer.ts")

export type BridgePermissionResponse = any
export type abortControllerRef = any
export type commands = any
export type getAutoModeUnavailableReason = any
export type isAutoModeGateEnabled = any
export type isBypassPermissionsModeDisabled = any
export type jsx = any
export type mainLoopModel = any
export type priority = any
export type replBridgeEnabled = any
export type replBridgeError = any
export type setMessages = any
export type useAppStateStore = any
export type useEffect = any

export const BridgePermissionResponse: any = stub
export const abortControllerRef: any = stub
export const commands: any = stub
export const getAutoModeUnavailableReason: any = stub
export const isAutoModeGateEnabled: any = stub
export const isBypassPermissionsModeDisabled: any = stub
export const jsx: any = stub
export const mainLoopModel: any = stub
export const priority: any = stub
export const replBridgeEnabled: any = stub
export const replBridgeError: any = stub
export const setMessages: any = stub
export const useAppStateStore: any = stub
export const useEffect: any = stub

export default stub
