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
    throw new Error(`Missing original implementation for src/components/mcp/types.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/components/mcp/types.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/components/mcp/types.ts (${label})`)
    },
  })
}

const stub = createStub("src/components/mcp/types.ts")

export type AgentMcpServerInfo = any
export type AstroAIServerInfo = any
export type HTTPServerInfo = any
export type Link = any
export type MCPViewState = any
export type McpHTTPServerConfig = any
export type McpSSEServerConfig = any
export type SSEServerInfo = any
export type ServerInfo = any
export type StdioServerInfo = any
export type Text = any
export type c = any
export type color = any
export type excludeCommandsByServer = any
export type excludeResourcesByServer = any
export type excludeToolsByServer = any
export type performMCPOAuthFlow = any
export type useCallback = any
export type useEffect = any
export type useInput = any
export type useMemo = any
export type useRef = any

export const HTTPServerInfo: any = stub
export const Link: any = stub
export const MCPViewState: any = stub
export const McpHTTPServerConfig: any = stub
export const McpSSEServerConfig: any = stub
export const SSEServerInfo: any = stub
export const ServerInfo: any = stub
export const StdioServerInfo: any = stub
export const Text: any = stub
export const c: any = stub
export const color: any = stub
export const excludeCommandsByServer: any = stub
export const excludeResourcesByServer: any = stub
export const excludeToolsByServer: any = stub
export const performMCPOAuthFlow: any = stub
export const useCallback: any = stub
export const useEffect: any = stub
export const useInput: any = stub
export const useMemo: any = stub
export const useRef: any = stub

export default stub
