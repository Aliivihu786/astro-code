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
    throw new Error(`Missing original implementation for src/services/skillSearch/signals.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/services/skillSearch/signals.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/services/skillSearch/signals.ts (${label})`)
    },
  })
}

const stub = createStub("src/services/skillSearch/signals.ts")

export type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS = any
export type Base64ImageSource = any
export type DiscoverySignal = any
export type ImageBlockParam = any
export type MaxFileReadTokenExceededError = any
export type MemoryFileInfo = any
export type Message = any
export type MessageOrigin = any
export type Output = any
export type ToolPermissionContext = any
export type ToolUseContext = any
export type Tools = any
export type getConditionalRulesForCwdLevelDirectory = any
export type getDefaultHaikuModel = any
export type getDefaultOpusModel = any
export type getImagePasteIds = any
export type getManagedAndUserConditionalRules = any
export type getMemoryFiles = any
export type getMemoryFilesForNestedDirectory = any
export type getTaskListId = any
export type isTodoV2Enabled = any
export type isValidImagePaste = any
export type listTasks = any
export type logEvent = any
export type parse = any
export type readImageWithTokenBudget = any
export type relative = any

export const Base64ImageSource: any = stub
export const ImageBlockParam: any = stub
export const MaxFileReadTokenExceededError: any = stub
export const Message: any = stub
export const MessageOrigin: any = stub
export const getConditionalRulesForCwdLevelDirectory: any = stub
export const getDefaultHaikuModel: any = stub
export const getDefaultOpusModel: any = stub
export const getImagePasteIds: any = stub
export const getManagedAndUserConditionalRules: any = stub
export const getMemoryFiles: any = stub
export const getMemoryFilesForNestedDirectory: any = stub
export const getTaskListId: any = stub
export const isTodoV2Enabled: any = stub
export const isValidImagePaste: any = stub
export const listTasks: any = stub
export const logEvent: any = stub
export const parse: any = stub
export const readImageWithTokenBudget: any = stub
export const relative: any = stub

export default stub
