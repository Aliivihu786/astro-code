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
    throw new Error(`Missing original implementation for src/proactive/index.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/proactive/index.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/proactive/index.ts (${label})`)
    },
  })
}

const stub = createStub("src/proactive/index.ts")

export type LocalAgentTaskState = any
export type discoveredSkillNames = any
export type getAgentTranscriptPath = any
export type getAppState = any
export type getOriginalCwd = any
export type getSessionEndHookTimeoutMs = any
export type getSessionId = any
export type initTaskOutputAsSymlink = any
export type last_request_id = any
export type loadedNestedMemoryPaths = any
export type logEvent = any
export type readFileState = any
export type regenerateSessionId = any
export type resetSessionFilePointer = any
export type saveWorktreeState = any
export type setAppState = any
export type setConversationId = any
export type signal = any
export type timeoutMs = any

export const LocalAgentTaskState: any = stub
export const discoveredSkillNames: any = stub
export const getAgentTranscriptPath: any = stub
export const getAppState: any = stub
export const getOriginalCwd: any = stub
export const getSessionEndHookTimeoutMs: any = stub
export const getSessionId: any = stub
export const initTaskOutputAsSymlink: any = stub
export const last_request_id: any = stub
export const loadedNestedMemoryPaths: any = stub
export const logEvent: any = stub
export const readFileState: any = stub
export const regenerateSessionId: any = stub
export const resetSessionFilePointer: any = stub
export const saveWorktreeState: any = stub
export const setAppState: any = stub
export const setConversationId: any = stub
export const signal: any = stub
export const timeoutMs: any = stub

export default stub
