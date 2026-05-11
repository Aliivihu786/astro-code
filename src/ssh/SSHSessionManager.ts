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
    throw new Error(`Missing original implementation for src/ssh/SSHSessionManager.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/ssh/SSHSessionManager.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/ssh/SSHSessionManager.ts (${label})`)
    },
  })
}

const stub = createStub("src/ssh/SSHSessionManager.ts")

export type SSHSessionManager = any
export type createToolStub = any
export type isSessionEndMessage = any
export type useEffect = any
export type useMemo = any

export const createToolStub: any = stub
export const isSessionEndMessage: any = stub
export const useEffect: any = stub
export const useMemo: any = stub

export default stub
