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
    throw new Error(`Missing original implementation for src/tasks/MonitorMcpTask/MonitorMcpTask.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/tasks/MonitorMcpTask/MonitorMcpTask.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/tasks/MonitorMcpTask/MonitorMcpTask.ts (${label})`)
    },
  })
}

const stub = createStub("src/tasks/MonitorMcpTask/MonitorMcpTask.ts")

export type MonitorMcpTask = any
export type MonitorMcpTaskState = any
export type c = any
export type useEffect = any
export type useEffectEvent = any
export type useMemo = any
export type useRef = any

export const MonitorMcpTask: any = stub
export const c: any = stub
export const useEffect: any = stub
export const useEffectEvent: any = stub
export const useMemo: any = stub
export const useRef: any = stub

export default stub
