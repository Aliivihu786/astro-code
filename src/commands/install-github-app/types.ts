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
    throw new Error(`Missing original implementation for src/commands/install-github-app/types.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/commands/install-github-app/types.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/commands/install-github-app/types.ts (${label})`)
    },
  })
}

const stub = createStub("src/commands/install-github-app/types.ts")

export type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS = any
export type PR_BODY = any
export type PR_TITLE = any
export type State = any
export type WORKFLOW_CONTENT = any
export type Warning = any
export type Workflow = any
export type c = any
export type logEvent = any

export const PR_BODY: any = stub
export const PR_TITLE: any = stub
export const WORKFLOW_CONTENT: any = stub
export const Warning: any = stub
export const Workflow: any = stub
export const c: any = stub
export const logEvent: any = stub

export default stub
