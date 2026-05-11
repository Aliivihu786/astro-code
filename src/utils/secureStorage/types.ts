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
    throw new Error(`Missing original implementation for src/utils/secureStorage/types.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/utils/secureStorage/types.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/utils/secureStorage/types.ts (${label})`)
    },
  })
}

const stub = createStub("src/utils/secureStorage/types.ts")

export type KEYCHAIN_CACHE_TTL_MS = any
export type OAuthClientInformation = any
export type OAuthClientInformationFull = any
export type OAuthClientMetadata = any
export type OAuthClientProvider = any
export type OAuthDiscoveryState = any
export type OAuthError = any
export type OAuthErrorResponseSchema = any
export type OAuthMetadataSchema = any
export type OAuthTokens = any
export type OAuthTokensSchema = any
export type SecureStorage = any
export type SecureStorageData = any
export type ServerError = any
export type TemporarilyUnavailableError = any
export type TooManyRequestsError = any
export type auth = any
export type clearKeychainCache = any
export type discoverAuthorizationServerMetadata = any
export type discoverOAuthServerInfo = any
export type getMacOsKeychainStorageServiceName = any
export type getUsername = any
export type jsonStringify = any
export type keychainCacheState = any
export type randomBytes = any
export type refreshAuthorization = any
export type writeFileSync_DEPRECATED = any

export const KEYCHAIN_CACHE_TTL_MS: any = stub
export const OAuthError: any = stub
export const OAuthErrorResponseSchema: any = stub
export const OAuthMetadataSchema: any = stub
export const OAuthTokensSchema: any = stub
export const SecureStorageData: any = stub
export const ServerError: any = stub
export const TemporarilyUnavailableError: any = stub
export const TooManyRequestsError: any = stub
export const auth: any = stub
export const clearKeychainCache: any = stub
export const discoverAuthorizationServerMetadata: any = stub
export const discoverOAuthServerInfo: any = stub
export const getMacOsKeychainStorageServiceName: any = stub
export const getUsername: any = stub
export const jsonStringify: any = stub
export const keychainCacheState: any = stub
export const randomBytes: any = stub
export const refreshAuthorization: any = stub
export const writeFileSync_DEPRECATED: any = stub

export default stub
