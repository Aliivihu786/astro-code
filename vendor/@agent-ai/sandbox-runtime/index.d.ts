export type FsReadRestrictionConfig = Record<string, unknown>
export type FsWriteRestrictionConfig = Record<string, unknown>
export type IgnoreViolationsConfig = Record<string, unknown>
export type NetworkHostPattern = { host: string; port?: number }
export type NetworkRestrictionConfig = Record<string, unknown>
export type SandboxAskCallback = (
  hostPattern: NetworkHostPattern,
) => boolean | Promise<boolean>
export type SandboxDependencyCheck = {
  errors: string[]
  warnings: string[]
}
export type SandboxRuntimeConfig = Record<string, unknown>
export type SandboxViolationEvent = Record<string, unknown>

export class SandboxViolationStore {
  clear(): void
  getViolations(): SandboxViolationEvent[]
  addViolation(event?: SandboxViolationEvent): void
}

export const SandboxRuntimeConfigSchema: {
  parse<T>(value: T): T
  safeParse<T>(value: T): { success: true; data: T }
}

export class SandboxManager {
  static checkDependencies(options?: unknown): SandboxDependencyCheck
  static isSupportedPlatform(): boolean
  static wrapWithSandbox(
    command: string,
    binShell?: string,
    customConfig?: Partial<SandboxRuntimeConfig>,
    abortSignal?: AbortSignal,
  ): Promise<string>
  static initialize(
    config?: SandboxRuntimeConfig,
    callback?: SandboxAskCallback,
  ): Promise<void>
  static updateConfig(config?: SandboxRuntimeConfig): void
  static reset(): Promise<void>
  static getFsReadConfig(): FsReadRestrictionConfig | undefined
  static getFsWriteConfig(): FsWriteRestrictionConfig | undefined
  static getNetworkRestrictionConfig(): NetworkRestrictionConfig | undefined
  static getIgnoreViolations(): IgnoreViolationsConfig | undefined
  static getAllowUnixSockets(): string[] | undefined
  static getAllowLocalBinding(): boolean | undefined
  static getEnableWeakerNestedSandbox(): boolean | undefined
  static getProxyPort(): number | undefined
  static getSocksProxyPort(): number | undefined
  static getLinuxHttpSocketPath(): string | undefined
  static getLinuxSocksSocketPath(): string | undefined
  static waitForNetworkInitialization(): Promise<boolean>
  static getSandboxViolationStore(): SandboxViolationStore
  static annotateStderrWithSandboxFailures(
    command: string,
    stderr: string,
  ): string
  static cleanupAfterCommand(): void
}
