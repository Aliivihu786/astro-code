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
    throw new Error(`Missing original implementation for src/types/messageQueueTypes.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/types/messageQueueTypes.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/types/messageQueueTypes.ts (${label})`)
    },
  })
}

const stub = createStub("src/types/messageQueueTypes.ts")

export type AttachmentMessage = any
export type ContextCollapseCommitEntry = any
export type ContextCollapseSnapshotEntry = any
export type Entry = any
export type FileHistorySnapshotMessage = any
export type LogOption = any
export type Message = any
export type PersistedWorktreeSession = any
export type QueueOperation = any
export type QueueOperationMessage = any
export type SerializedMessage = any
export type SessionId = any
export type SystemCompactBoundaryMessage = any
export type SystemMessage = any
export type TranscriptMessage = any
export type UserMessage = any
export type asAgentId = any
export type asSessionId = any
export type dirname = any
export type fstatSync = any
export type getPlanSlugCache = any
export type getPromptId = any
export type getSessionId = any
export type getSessionProjectDir = any
export type isSessionPersistenceDisabled = any
export type logEvent = any
export type mkdir = any
export type open = any
export type openSync = any
export type readFile = any
export type readdir = any
export type sortLogs = any
export type stat = any
export type switchSession = any
export type unlink = any
export type writeFile = any

export const AttachmentMessage: any = stub
export const Message: any = stub
export const QueueOperationMessage: any = stub
export const SystemCompactBoundaryMessage: any = stub
export const SystemMessage: any = stub
export const UserMessage: any = stub
export const asAgentId: any = stub
export const asSessionId: any = stub
export const dirname: any = stub
export const fstatSync: any = stub
export const getPlanSlugCache: any = stub
export const getPromptId: any = stub
export const getSessionId: any = stub
export const getSessionProjectDir: any = stub
export const isSessionPersistenceDisabled: any = stub
export const logEvent: any = stub
export const mkdir: any = stub
export const open: any = stub
export const openSync: any = stub
export const readFile: any = stub
export const readdir: any = stub
export const sortLogs: any = stub
export const stat: any = stub
export const switchSession: any = stub
export const unlink: any = stub
export const writeFile: any = stub

export default stub
