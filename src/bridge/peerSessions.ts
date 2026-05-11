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
    throw new Error(`Missing original implementation for src/bridge/peerSessions.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/bridge/peerSessions.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/bridge/peerSessions.ts (${label})`)
    },
  })
}

const stub = createStub("src/bridge/peerSessions.ts")

export type agentId = any
export type agentName = any
export type approve = any
export type approved = any
export type backendType = any
export type canUseTool = any
export type classifierApprovable = any
export type color = any
export type content = any
export type context = any
export type createShutdownRejectedMessage = any
export type createShutdownRequestMessage = any
export type errorCode = any
export type feedback = any
export type getAgentName = any
export type getTeamName = any
export type getTeammateColor = any
export type isTeamLead = any
export type isTeammate = any
export type maxResultSizeChars = any
export type message = any
export type name = any
export type paneId = any
export type permissionMode = any
export type queuePendingMessage = any
export type reason = any
export type recipients = any
export type requestId = any
export type request_id = any
export type routing = any
export type searchHint = any
export type senderColor = any
export type shouldDefer = any
export type summary = any
export type target = any
export type targetColor = any
export type teamName = any
export type text = any
export type timestamp = any
export type type = any
export type updatedInput = any
export type writeToMailbox = any

export const agentId: any = stub
export const agentName: any = stub
export const approve: any = stub
export const approved: any = stub
export const backendType: any = stub
export const canUseTool: any = stub
export const classifierApprovable: any = stub
export const color: any = stub
export const content: any = stub
export const context: any = stub
export const createShutdownRejectedMessage: any = stub
export const createShutdownRequestMessage: any = stub
export const errorCode: any = stub
export const feedback: any = stub
export const getAgentName: any = stub
export const getTeamName: any = stub
export const getTeammateColor: any = stub
export const isTeamLead: any = stub
export const isTeammate: any = stub
export const maxResultSizeChars: any = stub
export const message: any = stub
export const name: any = stub
export const paneId: any = stub
export const permissionMode: any = stub
export const queuePendingMessage: any = stub
export const reason: any = stub
export const recipients: any = stub
export const requestId: any = stub
export const request_id: any = stub
export const routing: any = stub
export const searchHint: any = stub
export const senderColor: any = stub
export const shouldDefer: any = stub
export const summary: any = stub
export const target: any = stub
export const targetColor: any = stub
export const teamName: any = stub
export const text: any = stub
export const timestamp: any = stub
export const type: any = stub
export const updatedInput: any = stub
export const writeToMailbox: any = stub

export default stub
