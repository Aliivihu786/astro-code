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
    throw new Error(`Missing original implementation for src/commands/plugin/unifiedTypes.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/commands/plugin/unifiedTypes.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/commands/plugin/unifiedTypes.ts (${label})`)
    },
  })
}

const stub = createStub("src/commands/plugin/unifiedTypes.ts")

export type HTTPServerInfo = any
export type McpAstroAIProxyServerConfig = any
export type McpHTTPServerConfig = any
export type McpSSEServerConfig = any
export type McpbNeedsConfigResult = any
export type PluginOptionSchema = any
export type SSEServerInfo = any
export type Text = any
export type UnifiedInstalledItem = any
export type c = any
export type color = any
export type enablePluginOp = any
export type getPluginInstallationFromV2 = any
export type getSettingsForSource = any
export type isInstallableScope = any
export type isPluginEnabledAtProjectScope = any
export type loadMcpbFile = any
export type markFlaggedPluginsSeen = any
export type uninstallPluginOp = any
export type useCallback = any
export type useEffect = any
export type useInput = any
export type useMemo = any
export type useRef = any

export const HTTPServerInfo: any = stub
export const McpAstroAIProxyServerConfig: any = stub
export const McpHTTPServerConfig: any = stub
export const McpSSEServerConfig: any = stub
export const SSEServerInfo: any = stub
export const Text: any = stub
export const c: any = stub
export const color: any = stub
export const enablePluginOp: any = stub
export const getPluginInstallationFromV2: any = stub
export const getSettingsForSource: any = stub
export const isInstallableScope: any = stub
export const isPluginEnabledAtProjectScope: any = stub
export const loadMcpbFile: any = stub
export const markFlaggedPluginsSeen: any = stub
export const uninstallPluginOp: any = stub
export const useCallback: any = stub
export const useEffect: any = stub
export const useInput: any = stub
export const useMemo: any = stub
export const useRef: any = stub

export default stub
