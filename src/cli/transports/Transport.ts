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
    throw new Error(`Missing original implementation for src/cli/transports/Transport.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/cli/transports/Transport.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/cli/transports/Transport.ts (${label})`)
    },
  })
}

const stub = createStub("src/cli/transports/Transport.ts")

export type Transport = any
export type getWebSocketProxyUrl = any
export type setInternalEventWriter = any
export type setSessionStateChangedListener = any
export type unregisterSessionActivityCallback = any

export const getWebSocketProxyUrl: any = stub
export const setInternalEventWriter: any = stub
export const setSessionStateChangedListener: any = stub
export const unregisterSessionActivityCallback: any = stub

export default stub
