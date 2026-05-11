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
    throw new Error(`Missing original implementation for src/services/oauth/types.ts (${label})`)
  } as StubCallable
  return new Proxy(target, {
    get(current, prop) {
      if (prop === 'then') return undefined
      if (prop === Symbol.toStringTag) return 'CompatibilityStub'
      if (prop in current) return current[prop]
      return createStub(`${label}.${String(prop)}`)
    },
    apply() {
      throw new Error(`Missing original implementation for src/services/oauth/types.ts (${label})`)
    },
    construct() {
      throw new Error(`Missing original implementation for src/services/oauth/types.ts (${label})`)
    },
  })
}

const stub = createStub("src/services/oauth/types.ts")

export type AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS = any
export type BillingType = any
export type ASTRO_AI_INFERENCE_SCOPE = any
export type ASTRO_AI_OAUTH_SCOPES = any
export type Link = any
export type OAuthProfileResponse = any
export type OAuthTokenExchangeResponse = any
export type OAuthTokens = any
export type RateLimitTier = any
export type ReferralCampaign = any
export type ReferralEligibilityResponse = any
export type ReferralRedemptionsResponse = any
export type ReferrerRewardInfo = any
export type SubscriptionType = any
export type Text = any
export type UserRolesResponse = any
export type clearAuthRelatedCaches = any
export type dirname = any
export type fetchAndStoreUserRoles = any
export type formatCreditAmount = any
export type getAstroAIOAuthTokens = any
export type getOauthConfig = any
export type getSubscriptionType = any
export type hasProfileScope = any
export type isAstroAISubscriber = any
export type join = any
export type logEvent = any
export type performLogout = any
export type preferThirdPartyAuthentication = any
export type refreshOAuthToken = any
export type saveApiKey = any
export type shouldUseAstroAIAuth = any
export type shouldUseMockSubscription = any
export type storeOAuthAccountInfo = any
export type useCallback = any
export type useEffect = any

export const ASTRO_AI_INFERENCE_SCOPE: any = stub
export const ASTRO_AI_OAUTH_SCOPES: any = stub
export const Link: any = stub
export const OAuthProfileResponse: any = stub
export const OAuthTokenExchangeResponse: any = stub
export const OAuthTokens: any = stub
export const RateLimitTier: any = stub
export const ReferralEligibilityResponse: any = stub
export const ReferralRedemptionsResponse: any = stub
export const ReferrerRewardInfo: any = stub
export const SubscriptionType: any = stub
export const Text: any = stub
export const UserRolesResponse: any = stub
export const clearAuthRelatedCaches: any = stub
export const dirname: any = stub
export const fetchAndStoreUserRoles: any = stub
export const formatCreditAmount: any = stub
export const getAstroAIOAuthTokens: any = stub
export const getOauthConfig: any = stub
export const getSubscriptionType: any = stub
export const hasProfileScope: any = stub
export const isAstroAISubscriber: any = stub
export const join: any = stub
export const logEvent: any = stub
export const performLogout: any = stub
export const preferThirdPartyAuthentication: any = stub
export const refreshOAuthToken: any = stub
export const saveApiKey: any = stub
export const shouldUseAstroAIAuth: any = stub
export const shouldUseMockSubscription: any = stub
export const storeOAuthAccountInfo: any = stub
export const useCallback: any = stub
export const useEffect: any = stub

export default stub
