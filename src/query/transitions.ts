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
    throw new Error(`Missing original implementation for src/query/transitions.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/query/transitions.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/query/transitions.ts (${label})`)
    },
  })
}

const stub = createStub("src/query/transitions.ts")

export type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS = any
export type AttachmentMessage = any
export type AutoCompactTrackingState = any
export type Continue = any
export type Message = any
export type RequestStartEvent = any
export type StreamEvent = any
export type Terminal = any
export type TombstoneMessage = any
export type ToolResultBlockParam = any
export type ToolUseBlock = any
export type ToolUseSummaryMessage = any
export type UserMessage = any
export type createAssistantAPIErrorMessage = any
export type createMicrocompactBoundaryMessage = any
export type createSystemMessage = any
export type createToolUseSummaryMessage = any
export type createUserInterruptionMessage = any
export type filterDuplicateMemoryAttachments = any
export type finalContextTokensFromLastResponse = any
export type getAttachmentMessages = any
export type getCommandsByMaxPriority = any
export type getMessagesAfterCompactBoundary = any
export type isAutoCompactEnabled = any
export type isPromptTooLongMessage = any
export type isSlashCommand = any
export type normalizeMessagesForAPI = any
export type renderModelName = any
export type startRelevantMemoryPrefetch = any
export type stripSignatureBlocks = any
export type tokenCountWithEstimation = any

export const AttachmentMessage: any = stub
export const Continue: any = stub
export const Message: any = stub
export const RequestStartEvent: any = stub
export const StreamEvent: any = stub
export const TombstoneMessage: any = stub
export const ToolUseSummaryMessage: any = stub
export const UserMessage: any = stub
export const createAssistantAPIErrorMessage: any = stub
export const createMicrocompactBoundaryMessage: any = stub
export const createSystemMessage: any = stub
export const createToolUseSummaryMessage: any = stub
export const createUserInterruptionMessage: any = stub
export const filterDuplicateMemoryAttachments: any = stub
export const finalContextTokensFromLastResponse: any = stub
export const getAttachmentMessages: any = stub
export const getCommandsByMaxPriority: any = stub
export const getMessagesAfterCompactBoundary: any = stub
export const isAutoCompactEnabled: any = stub
export const isPromptTooLongMessage: any = stub
export const isSlashCommand: any = stub
export const normalizeMessagesForAPI: any = stub
export const renderModelName: any = stub
export const startRelevantMemoryPrefetch: any = stub
export const stripSignatureBlocks: any = stub
export const tokenCountWithEstimation: any = stub

export default stub
