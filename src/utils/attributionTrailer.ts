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
    throw new Error(`Missing original implementation for src/utils/attributionTrailer.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/utils/attributionTrailer.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/utils/attributionTrailer.ts (${label})`)
    },
  })
}

const stub = createStub("src/utils/attributionTrailer.ts")

export type FILE_EDIT_TOOL_NAME = any
export type FILE_WRITE_TOOL_NAME = any
export type GLOB_TOOL_NAME = any
export type GREP_TOOL_NAME = any
export type PRODUCT_URL = any
export type calculateCommitAttribution = any
export type getMainLoopModel = any
export type getPublicModelDisplayName = any
export type getPublicModelName = any
export type isInternalModelRepo = any
export type isInternalModelRepoCached = any
export type isRemoteSessionLocal = any
export type memoryAccessCount = any
export type pr = any
export type promptCount = any
export type sanitizeModelName = any

export const FILE_EDIT_TOOL_NAME: any = stub
export const FILE_WRITE_TOOL_NAME: any = stub
export const GLOB_TOOL_NAME: any = stub
export const GREP_TOOL_NAME: any = stub
export const PRODUCT_URL: any = stub
export const calculateCommitAttribution: any = stub
export const getMainLoopModel: any = stub
export const getPublicModelDisplayName: any = stub
export const getPublicModelName: any = stub
export const isInternalModelRepo: any = stub
export const isInternalModelRepoCached: any = stub
export const isRemoteSessionLocal: any = stub
export const memoryAccessCount: any = stub
export const pr: any = stub
export const promptCount: any = stub
export const sanitizeModelName: any = stub

export default stub
