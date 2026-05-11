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
    throw new Error(`Missing original implementation for src/types/tools.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/types/tools.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/types/tools.ts (${label})`)
    },
  })
}

const stub = createStub("src/types/tools.ts")

export type AgentDefinitionsResult = any
export type AgentToolProgress = any
export type AnalyticsMetadata_I_VERIFIED_THIS_IS_PII_TAGGED = any
export type AttachmentMessage = any
export type BashProgress = any
export type BetaContentBlock = any
export type BetaWebSearchTool20250305 = any
export type Box = any
export type ElicitResult = any
export type FORK_AGENT = any
export type LEGACY_AGENT_TOOL_NAME = any
export type MCPProgress = any
export type Message = any
export type PermissionMode = any
export type PermissionResult = any
export type PowerShellProgress = any
export type ProgressMessage = any
export type PromptCommand = any
export type REPLToolProgress = any
export type SdkWorkflowProgress = any
export type ServerResource = any
export type ShellProgress = any
export type SkillToolProgress = any
export type SystemLocalCommandMessage = any
export type SystemMessage = any
export type TaskOutputProgress = any
export type Tool = any
export type ToolCallProgress = any
export type ToolDef = any
export type ToolProgressData = any
export type ToolResult = any
export type ToolResultBlockParam = any
export type ToolUseBlockParam = any
export type ToolUseContext = any
export type UserMessage = any
export type ValidationResult = any
export type WebSearchProgress = any
export type _simulatedSedEdit = any
export type agentId = any
export type allowed_domains = any
export type assistantAutoBackgrounded = any
export type backgroundTaskId = any
export type backgroundedByUser = any
export type block = any
export type blocked_domains = any
export type buildWorktreeNotice = any
export type c = any
export type canReadOutputFile = any
export type classifyHandoffIfNeeded = any
export type clearInvokedSkillsForAgent = any
export type commandHasAnyCd = any
export type content = any
export type createActivityDescriptionResolver = any
export type createProgressTracker = any
export type cwd = any
export type dangerouslyDisableSandbox = any
export type description = any
export type detectLineEndings = any
export type durationSeconds = any
export type emitTaskProgress = any
export type enqueueAgentNotification = any
export type ensureToolResultsDir = any
export type errorMessage = any
export type extractPartialResult = any
export type extractTextContent = any
export type failAgentTask = any
export type finalizeAgentTool = any
export type find = any
export type findCommand = any
export type formatPreconditionError = any
export type generatePreview = any
export type getCommands = any
export type getFileModificationTime = any
export type getLastToolUseName = any
export type getMaxTimeoutMs = any
export type getProgressUpdate = any
export type getRemoteTaskSessionUrl = any
export type getSessionId = any
export type getTokenCountFromTracker = any
export type getToolResultPath = any
export type hasRequiredMcpServers = any
export type hasWorktreeChanges = any
export type head = any
export type interrupted = any
export type isForkSubagentEnabled = any
export type isImage = any
export type isImageOutput = any
export type isList = any
export type isLocalAgentTask = any
export type isRead = any
export type isReadOnlyCommand = any
export type isSyntheticMessage = any
export type killAsyncAgent = any
export type logEvent = any
export type markTaskNotified = any
export type matchWildcardPattern = any
export type mode = any
export type model = any
export type newContent = any
export type noOutputExpected = any
export type npm = any
export type outputFile = any
export type parsePluginIdentifier = any
export type persistedOutputPath = any
export type persistedOutputSize = any
export type prepareForkedCommandContext = any
export type printf = any
export type prompt = any
export type query = any
export type rawOutputPath = any
export type registerAgentForeground = any
export type registerAsyncAgent = any
export type registerForeground = any
export type renderToolResultMessage = any
export type renderToolUseErrorMessage = any
export type renderToolUseMessage = any
export type renderToolUseProgressMessage = any
export type renderToolUseRejectedMessage = any
export type renderToolUseTag = any
export type resetCwdIfOutsideProject = any
export type resizeShellImageOutput = any
export type results = any
export type returnCodeInterpretation = any
export type run_in_background = any
export type spawnShellTask = any
export type stat = any
export type stdErrAppendShellResetMessage = any
export type stderr = any
export type structuredContent = any
export type subagent_type = any
export type subshells = any
export type tagMessagesWithToolUseID = any
export type team_name = any
export type timeout = any
export type tree = any
export type truncate = any
export type unregisterAgentForeground = any
export type updateAgentProgress = any
export type url = any
export type userFacingName = any

export const AttachmentMessage: any = stub
export const Box: any = stub
export const FORK_AGENT: any = stub
export const LEGACY_AGENT_TOOL_NAME: any = stub
export const Message: any = stub
export const ShellProgress: any = stub
export const SystemMessage: any = stub
export const Tool: any = stub
export const ToolCallProgress: any = stub
export const ToolResult: any = stub
export const ToolUseContext: any = stub
export const UserMessage: any = stub
export const ValidationResult: any = stub
export const _simulatedSedEdit: any = stub
export const agentId: any = stub
export const allowed_domains: any = stub
export const assistantAutoBackgrounded: any = stub
export const backgroundTaskId: any = stub
export const backgroundedByUser: any = stub
export const block: any = stub
export const blocked_domains: any = stub
export const buildWorktreeNotice: any = stub
export const c: any = stub
export const canReadOutputFile: any = stub
export const classifyHandoffIfNeeded: any = stub
export const clearInvokedSkillsForAgent: any = stub
export const commandHasAnyCd: any = stub
export const content: any = stub
export const createActivityDescriptionResolver: any = stub
export const createProgressTracker: any = stub
export const cwd: any = stub
export const dangerouslyDisableSandbox: any = stub
export const description: any = stub
export const detectLineEndings: any = stub
export const durationSeconds: any = stub
export const emitTaskProgress: any = stub
export const enqueueAgentNotification: any = stub
export const ensureToolResultsDir: any = stub
export const errorMessage: any = stub
export const extractPartialResult: any = stub
export const extractTextContent: any = stub
export const failAgentTask: any = stub
export const finalizeAgentTool: any = stub
export const find: any = stub
export const findCommand: any = stub
export const formatPreconditionError: any = stub
export const generatePreview: any = stub
export const getCommands: any = stub
export const getFileModificationTime: any = stub
export const getLastToolUseName: any = stub
export const getMaxTimeoutMs: any = stub
export const getProgressUpdate: any = stub
export const getRemoteTaskSessionUrl: any = stub
export const getSessionId: any = stub
export const getTokenCountFromTracker: any = stub
export const getToolResultPath: any = stub
export const hasRequiredMcpServers: any = stub
export const hasWorktreeChanges: any = stub
export const head: any = stub
export const interrupted: any = stub
export const isForkSubagentEnabled: any = stub
export const isImage: any = stub
export const isImageOutput: any = stub
export const isList: any = stub
export const isLocalAgentTask: any = stub
export const isRead: any = stub
export const isReadOnlyCommand: any = stub
export const isSyntheticMessage: any = stub
export const killAsyncAgent: any = stub
export const logEvent: any = stub
export const markTaskNotified: any = stub
export const matchWildcardPattern: any = stub
export const mode: any = stub
export const model: any = stub
export const newContent: any = stub
export const noOutputExpected: any = stub
export const npm: any = stub
export const outputFile: any = stub
export const parsePluginIdentifier: any = stub
export const persistedOutputPath: any = stub
export const persistedOutputSize: any = stub
export const prepareForkedCommandContext: any = stub
export const printf: any = stub
export const prompt: any = stub
export const rawOutputPath: any = stub
export const registerAgentForeground: any = stub
export const registerAsyncAgent: any = stub
export const registerForeground: any = stub
export const renderToolResultMessage: any = stub
export const renderToolUseErrorMessage: any = stub
export const renderToolUseMessage: any = stub
export const renderToolUseProgressMessage: any = stub
export const renderToolUseRejectedMessage: any = stub
export const renderToolUseTag: any = stub
export const resetCwdIfOutsideProject: any = stub
export const resizeShellImageOutput: any = stub
export const results: any = stub
export const returnCodeInterpretation: any = stub
export const run_in_background: any = stub
export const spawnShellTask: any = stub
export const stat: any = stub
export const stdErrAppendShellResetMessage: any = stub
export const stderr: any = stub
export const structuredContent: any = stub
export const subagent_type: any = stub
export const subshells: any = stub
export const tagMessagesWithToolUseID: any = stub
export const team_name: any = stub
export const timeout: any = stub
export const tree: any = stub
export const truncate: any = stub
export const unregisterAgentForeground: any = stub
export const updateAgentProgress: any = stub
export const url: any = stub
export const userFacingName: any = stub

export default stub
