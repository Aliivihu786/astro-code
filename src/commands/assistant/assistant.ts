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
    throw new Error(`Missing original implementation for src/commands/assistant/assistant.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/commands/assistant/assistant.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/commands/assistant/assistant.ts (${label})`)
    },
  })
}

const stub = createStub("src/commands/assistant/assistant.ts")

export type computeDefaultInstallDir = any
export type done = any
export type onCancel = any
export type props = any

export const computeDefaultInstallDir: any = stub
export const done: any = stub
export const onCancel: any = stub
export const props: any = stub

export default stub
