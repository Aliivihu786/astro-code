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
    throw new Error(`Missing original implementation for src/services/lsp/types.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/services/lsp/types.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/services/lsp/types.ts (${label})`)
    },
  })
}

const stub = createStub("src/services/lsp/types.ts")

export type LSPServerInstance = any
export type LspServerConfig = any
export type LspServerState = any
export type ScopedLspServerConfig = any
export type relative = any

export const ScopedLspServerConfig: any = stub
export const relative: any = stub

export default stub
