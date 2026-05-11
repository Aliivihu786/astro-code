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
    throw new Error(`Missing original implementation for src/types/notebook.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/types/notebook.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/types/notebook.ts (${label})`)
    },
  })
}

const stub = createStub("src/types/notebook.ts")

export type ImageBlockParam = any
export type NoSelect = any
export type NotebookCell = any
export type NotebookCellOutput = any
export type NotebookCellSource = any
export type NotebookCellSourceOutput = any
export type NotebookCellType = any
export type NotebookContent = any
export type NotebookOutputImage = any
export type TextBlockParam = any
export type ToolDef = any
export type ToolResultBlockParam = any
export type c = any
export type fileHistoryTrackEdit = any
export type isAbsolute = any
export type use = any

export const NoSelect: any = stub
export const NotebookCellOutput: any = stub
export const NotebookCellSource: any = stub
export const NotebookCellSourceOutput: any = stub
export const NotebookContent: any = stub
export const NotebookOutputImage: any = stub
export const c: any = stub
export const fileHistoryTrackEdit: any = stub
export const isAbsolute: any = stub
export const use: any = stub

export default stub
