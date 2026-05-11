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
    throw new Error(`Missing original implementation for src/components/ui/option.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/components/ui/option.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/components/ui/option.ts (${label})`)
    },
  })
}

const stub = createStub("src/components/ui/option.ts")

export type Option = any
export type PermissionRule = any
export type Tabs = any
export type Text = any
export type c = any
export type getAllowRules = any
export type getAskRules = any
export type getDenyRules = any
export type useEffect = any
export type useMemo = any
export type useRef = any
export type useTabHeaderFocus = any

export const PermissionRule: any = stub
export const Tabs: any = stub
export const Text: any = stub
export const c: any = stub
export const getAllowRules: any = stub
export const getAskRules: any = stub
export const getDenyRules: any = stub
export const useEffect: any = stub
export const useMemo: any = stub
export const useRef: any = stub
export const useTabHeaderFocus: any = stub

export default stub
