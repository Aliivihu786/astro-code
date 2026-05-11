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
    throw new Error(`Missing original implementation for src/entrypoints/sdk/settingsTypes.generated.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/entrypoints/sdk/settingsTypes.generated.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/entrypoints/sdk/settingsTypes.generated.ts (${label})`)
    },
  })
}

const stub = createStub("src/entrypoints/sdk/settingsTypes.generated.ts")

export type CallToolResult = any
export type SDKControlRequest = any
export type SDKControlResponse = any
export type Settings = any
export type ToolAnnotations = any

export default stub
