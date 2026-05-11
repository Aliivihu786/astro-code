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
    throw new Error(`Missing original implementation for src/services/contextCollapse/operations.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/services/contextCollapse/operations.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/services/contextCollapse/operations.ts (${label})`)
    },
  })
}

const stub = createStub("src/services/contextCollapse/operations.ts")

export type ContextData = any
export type agentDefinitions = any
export type appendSystemPrompt = any
export type customSystemPrompt = any
export type getAppState = any
export type options = any
export type projectView = any
export type tools = any

export const ContextData: any = stub
export const agentDefinitions: any = stub
export const appendSystemPrompt: any = stub
export const customSystemPrompt: any = stub
export const getAppState: any = stub
export const options: any = stub
export const projectView: any = stub
export const tools: any = stub

export default stub
