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
    throw new Error(`Missing original implementation for src/services/contextCollapse/index.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/services/contextCollapse/index.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/services/contextCollapse/index.ts (${label})`)
    },
  })
}

const stub = createStub("src/services/contextCollapse/index.ts")

export type AgentDefinitionsResult = any
export type AttachmentMessage = any
export type ContextData = any
export type ERROR_MESSAGE_USER_ABORT = any
export type MANUAL_COMPACT_BUFFER_TOKENS = any
export type MAX_OUTPUT_TOKENS_FOR_SUMMARY = any
export type Message = any
export type NormalizedAssistantMessage = any
export type NormalizedUserMessage = any
export type RecompactionInfo = any
export type SYSTEM_PROMPT_DYNAMIC_BOUNDARY = any
export type Tool = any
export type ToolPermissionContext = any
export type ToolUseContext = any
export type Tools = any
export type UserMessage = any
export type agentDefinitions = any
export type agentInfo = any
export type agents = any
export type appendSystemPrompt = any
export type assistantMessageTokens = any
export type attachmentTokens = any
export type attachmentsByType = any
export type breakdown = any
export type c = any
export type astroMdTokens = any
export type color = any
export type commandInfo = any
export type compactConversation = any
export type content = any
export type context = any
export type countTokensViaHaikuFallback = any
export type customSystemPrompt = any
export type defaultSystemPrompt = any
export type deferredBuiltinDetails = any
export type deferredBuiltinTokens = any
export type description = any
export type emptySpawns = any
export type errors = any
export type getAppState = any
export type getEffectiveContextWindowSize = any
export type getSkillToolInfo = any
export type getToolPermissionContext = any
export type includedCommands = any
export type includedSkills = any
export type input_schema = any
export type isAboveAutoCompactThreshold = any
export type isAboveErrorThreshold = any
export type isAboveWarningThreshold = any
export type isAtBlockingLimit = any
export type isAutoCompactEnabled = any
export type isContextCollapseEnabled = any
export type isDeferred = any
export type isLoaded = any
export type loadedMcpToolNames = any
export type mainLoopModel = any
export type mcpToolDetails = any
export type mcpTools = any
export type memoryFiles = any
export type messageBreakdown = any
export type messages = any
export type model = any
export type options = any
export type percentage = any
export type projectView = any
export type rawMaxTokens = any
export type roughTokenCountEstimation = any
export type runtimeModel = any
export type serverName = any
export type skillFrontmatter = any
export type skillInfo = any
export type skills = any
export type source = any
export type staged = any
export type systemPromptSections = any
export type systemToolDetails = any
export type systemTools = any
export type tokens = any
export type toolCallTokens = any
export type toolCallsByType = any
export type toolMatchesName = any
export type toolResultTokens = any
export type toolResultsByType = any
export type toolUseContext = any
export type toolUseIdToName = any
export type tools = any
export type totalTokens = any
export type type = any
export type userMessageTokens = any
export type value = any

export const AgentDefinitionsResult: any = stub
export const AttachmentMessage: any = stub
export const ContextData: any = stub
export const ERROR_MESSAGE_USER_ABORT: any = stub
export const MANUAL_COMPACT_BUFFER_TOKENS: any = stub
export const MAX_OUTPUT_TOKENS_FOR_SUMMARY: any = stub
export const Message: any = stub
export const NormalizedAssistantMessage: any = stub
export const NormalizedUserMessage: any = stub
export const RecompactionInfo: any = stub
export const SYSTEM_PROMPT_DYNAMIC_BOUNDARY: any = stub
export const Tool: any = stub
export const ToolPermissionContext: any = stub
export const ToolUseContext: any = stub
export const Tools: any = stub
export const UserMessage: any = stub
export const agentDefinitions: any = stub
export const agentInfo: any = stub
export const agents: any = stub
export const appendSystemPrompt: any = stub
export const assistantMessageTokens: any = stub
export const attachmentTokens: any = stub
export const attachmentsByType: any = stub
export const breakdown: any = stub
export const c: any = stub
export const astroMdTokens: any = stub
export const color: any = stub
export const commandInfo: any = stub
export const compactConversation: any = stub
export const content: any = stub
export const context: any = stub
export const countTokensViaHaikuFallback: any = stub
export const customSystemPrompt: any = stub
export const defaultSystemPrompt: any = stub
export const deferredBuiltinDetails: any = stub
export const deferredBuiltinTokens: any = stub
export const description: any = stub
export const emptySpawns: any = stub
export const errors: any = stub
export const getAppState: any = stub
export const getEffectiveContextWindowSize: any = stub
export const getSkillToolInfo: any = stub
export const getToolPermissionContext: any = stub
export const includedCommands: any = stub
export const includedSkills: any = stub
export const input_schema: any = stub
export const isAboveAutoCompactThreshold: any = stub
export const isAboveErrorThreshold: any = stub
export const isAboveWarningThreshold: any = stub
export const isAtBlockingLimit: any = stub
export const isAutoCompactEnabled: any = stub
export const isContextCollapseEnabled: any = stub
export const isDeferred: any = stub
export const isLoaded: any = stub
export const loadedMcpToolNames: any = stub
export const mainLoopModel: any = stub
export const mcpToolDetails: any = stub
export const mcpTools: any = stub
export const memoryFiles: any = stub
export const messageBreakdown: any = stub
export const messages: any = stub
export const model: any = stub
export const options: any = stub
export const percentage: any = stub
export const projectView: any = stub
export const rawMaxTokens: any = stub
export const roughTokenCountEstimation: any = stub
export const runtimeModel: any = stub
export const serverName: any = stub
export const skillFrontmatter: any = stub
export const skillInfo: any = stub
export const skills: any = stub
export const source: any = stub
export const staged: any = stub
export const systemPromptSections: any = stub
export const systemToolDetails: any = stub
export const systemTools: any = stub
export const tokens: any = stub
export const toolCallTokens: any = stub
export const toolCallsByType: any = stub
export const toolMatchesName: any = stub
export const toolResultTokens: any = stub
export const toolResultsByType: any = stub
export const toolUseContext: any = stub
export const toolUseIdToName: any = stub
export const tools: any = stub
export const totalTokens: any = stub
export const type: any = stub
export const userMessageTokens: any = stub
export const value: any = stub

export default stub
