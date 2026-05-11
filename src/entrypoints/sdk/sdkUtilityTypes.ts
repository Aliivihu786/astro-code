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
    throw new Error(`Missing original implementation for src/entrypoints/sdk/sdkUtilityTypes.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/entrypoints/sdk/sdkUtilityTypes.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/entrypoints/sdk/sdkUtilityTypes.ts (${label})`)
    },
  })
}

const stub = createStub("src/entrypoints/sdk/sdkUtilityTypes.ts")

export type BetaStopReason = any
export type BetaUsage = any
export type NonNullableUsage = any
export type SandboxFilesystemConfig = any
export type SandboxIgnoreViolations = any
export type SandboxNetworkConfig = any
export type SandboxSettings = any
export type Span = any
export type consumePostCompaction = any
export type getIsNonInteractiveSession = any
export type getLastApiCompletionTimestamp = any
export type getTeleportedSessionInfo = any
export type isBetaTracingEnabled = any
export type markFirstTeleportMessageLogged = any
export type setLastApiCompletionTimestamp = any

export const BetaUsage: any = stub
export const consumePostCompaction: any = stub
export const getIsNonInteractiveSession: any = stub
export const getLastApiCompletionTimestamp: any = stub
export const getTeleportedSessionInfo: any = stub
export const isBetaTracingEnabled: any = stub
export const markFirstTeleportMessageLogged: any = stub
export const setLastApiCompletionTimestamp: any = stub

export default stub
