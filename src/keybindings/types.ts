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
    throw new Error(`Missing original implementation for src/keybindings/types.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/keybindings/types.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/keybindings/types.ts (${label})`)
    },
  })
}

const stub = createStub("src/keybindings/types.ts")

export type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS = any
export type Chord = any
export type KeybindingAction = any
export type KeybindingBlock = any
export type KeybindingContextName = any
export type KeybindingsLoadResult = any
export type ParsedBinding = any
export type ParsedKeystroke = any
export type RefObject = any
export type c = any
export type getBindingDisplayText = any
export type getKeyName = any
export type loadKeybindingsSyncWithWarnings = any
export type logEvent = any
export type normalizeKeyForComparison = any
export type parseChord = any
export type useCallback = any
export type useContext = any
export type useEffect = any
export type useLayoutEffect = any
export type useMemo = any
export type useRef = any
export type useSetVoiceState = any

export const KeybindingContextName: any = stub
export const ParsedBinding: any = stub
export const ParsedKeystroke: any = stub
export const c: any = stub
export const getBindingDisplayText: any = stub
export const getKeyName: any = stub
export const loadKeybindingsSyncWithWarnings: any = stub
export const logEvent: any = stub
export const normalizeKeyForComparison: any = stub
export const parseChord: any = stub
export const useCallback: any = stub
export const useContext: any = stub
export const useEffect: any = stub
export const useLayoutEffect: any = stub
export const useMemo: any = stub
export const useRef: any = stub
export const useSetVoiceState: any = stub

export default stub
