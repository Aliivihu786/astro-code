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
    throw new Error(`Missing original implementation for src/utils/filePersistence/types.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/utils/filePersistence/types.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/utils/filePersistence/types.ts (${label})`)
    },
  })
}

const stub = createStub("src/utils/filePersistence/types.ts")

export type DEFAULT_UPLOAD_CONCURRENCY = any
export type FILE_COUNT_LIMIT = any
export type FailedPersistence = any
export type FilesPersistedEventData = any
export type OUTPUTS_SUBDIR = any
export type PersistedFile = any
export type TurnStartTime = any
export type getEnvironmentKind = any
export type logDebug = any
export type logEvent = any
export type uploadSessionFiles = any

export const DEFAULT_UPLOAD_CONCURRENCY: any = stub
export const FILE_COUNT_LIMIT: any = stub
export const OUTPUTS_SUBDIR: any = stub
export const getEnvironmentKind: any = stub
export const logDebug: any = stub
export const logEvent: any = stub
export const uploadSessionFiles: any = stub

export default stub
