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
    throw new Error(`Missing original implementation for src/memdir/memoryShapeTelemetry.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/memdir/memoryShapeTelemetry.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/memdir/memoryShapeTelemetry.ts (${label})`)
    },
  })
}

const stub = createStub("src/memdir/memoryShapeTelemetry.ts")

export type MemoryHeader = any
export type alreadySurfaced = any
export type gotchas = any
export type memories = any
export type memoryDir = any
export type recentTools = any
export type scanMemoryFiles = any
export type signal = any

export const MemoryHeader: any = stub
export const alreadySurfaced: any = stub
export const gotchas: any = stub
export const memories: any = stub
export const memoryDir: any = stub
export const recentTools: any = stub
export const scanMemoryFiles: any = stub
export const signal: any = stub

export default stub
