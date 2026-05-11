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
    throw new Error(`Missing original implementation for src/components/Spinner/types.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/components/Spinner/types.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/components/Spinner/types.ts (${label})`)
    },
  })
}

const stub = createStub("src/components/Spinner/types.ts")

export type RGBColor = any
export type SpinnerMode = any
export type Text = any
export type c = any
export type getCommandName = any
export type useAppStateStore = any
export type useCallback = any
export type useEffect = any
export type useMemo = any
export type useSetAppState = any

export const Text: any = stub
export const c: any = stub
export const getCommandName: any = stub
export const useAppStateStore: any = stub
export const useCallback: any = stub
export const useEffect: any = stub
export const useMemo: any = stub
export const useSetAppState: any = stub

export default stub
