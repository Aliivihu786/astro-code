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
    throw new Error(`Missing original implementation for src/components/agents/new-agent-creation/types.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/components/agents/new-agent-creation/types.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/components/agents/new-agent-creation/types.ts (${label})`)
    },
  })
}

const stub = createStub("src/components/agents/new-agent-creation/types.ts")

export type AgentWizardData = any
export type ReactNode = any
export type c = any
export type useCallback = any
export type useRef = any

export const c: any = stub
export const useCallback: any = stub
export const useRef: any = stub

export default stub
