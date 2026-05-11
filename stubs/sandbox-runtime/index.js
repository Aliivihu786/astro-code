export class SandboxViolationStore {
  clear() {}
  getViolations() {
    return []
  }
  addViolation() {}
}

const defaultStore = new SandboxViolationStore()

export const SandboxRuntimeConfigSchema = {
  parse(value) {
    return value
  },
  safeParse(value) {
    return { success: true, data: value }
  },
}

export class SandboxManager {
  static checkDependencies() {
    return {
      errors: ['local sandbox-runtime stub is active'],
      warnings: [],
    }
  }

  static isSupportedPlatform() {
    return false
  }

  static async wrapWithSandbox(command) {
    return command
  }

  static async initialize() {}
  static updateConfig() {}
  static async reset() {}
  static getFsReadConfig() {}
  static getFsWriteConfig() {}
  static getNetworkRestrictionConfig() {}
  static getIgnoreViolations() {}
  static getAllowUnixSockets() {}
  static getAllowLocalBinding() {}
  static getEnableWeakerNestedSandbox() {}
  static getProxyPort() {}
  static getSocksProxyPort() {}
  static getLinuxHttpSocketPath() {}
  static getLinuxSocksSocketPath() {}
  static async waitForNetworkInitialization() {
    return false
  }
  static getSandboxViolationStore() {
    return defaultStore
  }
  static annotateStderrWithSandboxFailures(_command, stderr) {
    return stderr
  }
  static cleanupAfterCommand() {}
}
