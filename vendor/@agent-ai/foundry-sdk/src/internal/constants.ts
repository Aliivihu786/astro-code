// File containing shared constants

/**
 * Model-specific timeout constraints for non-streaming requests
 */
export const MODEL_NONSTREAMING_TOKENS: Record<string, number> = {
  'astro-opus-4-20250514': 8192,
  'astro-opus-4-0': 8192,
  'astro-4-opus-20250514': 8192,
  'anthropic.astro-opus-4-20250514-v1:0': 8192,
  'astro-opus-4@20250514': 8192,
  'astro-opus-4-1-20250805': 8192,
  'anthropic.astro-opus-4-1-20250805-v1:0': 8192,
  'astro-opus-4-1@20250805': 8192,
};
