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
    throw new Error(`Missing original implementation for src/entrypoints/sdk/runtimeTypes.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/entrypoints/sdk/runtimeTypes.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/entrypoints/sdk/runtimeTypes.ts (${label})`)
    },
  })
}

const stub = createStub("src/entrypoints/sdk/runtimeTypes.ts")

export type AnyZodRawShape = any
export type CallToolResult = any
export type EffortLevel = any
export type ForkSessionOptions = any
export type ForkSessionResult = any
export type GetSessionInfoOptions = any
export type GetSessionMessagesOptions = any
export type InferShape = any
export type InternalOptions = any
export type InternalQuery = any
export type ListSessionsOptions = any
export type McpSdkServerConfigWithInstance = any
export type Options = any
export type Query = any
export type SDKControlRequest = any
export type SDKControlResponse = any
export type SDKResultMessage = any
export type SDKSession = any
export type SDKSessionInfo = any
export type SDKSessionOptions = any
export type SDKUserMessage = any
export type SdkMcpToolDefinition = any
export type SessionMessage = any
export type SessionMutationOptions = any
export type ToolAnnotations = any
export type isMaxSubscriber = any

export const isMaxSubscriber: any = stub

export default stub
