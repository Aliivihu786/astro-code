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
    throw new Error(`Missing original implementation for src/services/tips/types.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/services/tips/types.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/services/tips/types.ts (${label})`)
    },
  })
}

const stub = createStub("src/services/tips/types.ts")

export type Tip = any
export type TipContext = any
export type formatCreditAmount = any
export type getCachedOverageCreditGrant = any
export type getCachedReferrerReward = any
export type getSettingsForSource = any
export type getSettings_DEPRECATED = any
export type getSortedIdeLockfiles = any
export type getUserSpecifiedModelSetting = any
export type isCursorInstalled = any
export type isCustomTitleEnabled = any
export type isSupportedTerminal = any
export type isSupportedVSCodeTerminal = any
export type isVSCodeInstalled = any
export type isWindsurfInstalled = any
export type logEvent = any
export type modelSupportsEffort = any

export const TipContext: any = stub
export const formatCreditAmount: any = stub
export const getCachedOverageCreditGrant: any = stub
export const getCachedReferrerReward: any = stub
export const getSettingsForSource: any = stub
export const getSettings_DEPRECATED: any = stub
export const getSortedIdeLockfiles: any = stub
export const getUserSpecifiedModelSetting: any = stub
export const isCursorInstalled: any = stub
export const isCustomTitleEnabled: any = stub
export const isSupportedTerminal: any = stub
export const isSupportedVSCodeTerminal: any = stub
export const isVSCodeInstalled: any = stub
export const isWindsurfInstalled: any = stub
export const logEvent: any = stub
export const modelSupportsEffort: any = stub

export default stub
