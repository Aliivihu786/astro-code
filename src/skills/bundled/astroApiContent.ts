// Content for the astro-api bundled skill.
// Each .md file is inlined as a string at build time via Bun's text loader.

import csharpAstroApi from './astro-api/csharp/astro-api.md'
import curlExamples from './astro-api/curl/examples.md'
import goAstroApi from './astro-api/go/astro-api.md'
import javaAstroApi from './astro-api/java/astro-api.md'
import phpAstroApi from './astro-api/php/astro-api.md'
import pythonAgentSdkPatterns from './astro-api/python/agent-sdk/patterns.md'
import pythonAgentSdkReadme from './astro-api/python/agent-sdk/README.md'
import pythonAstroApiBatches from './astro-api/python/astro-api/batches.md'
import pythonAstroApiFilesApi from './astro-api/python/astro-api/files-api.md'
import pythonAstroApiReadme from './astro-api/python/astro-api/README.md'
import pythonAstroApiStreaming from './astro-api/python/astro-api/streaming.md'
import pythonAstroApiToolUse from './astro-api/python/astro-api/tool-use.md'
import rubyAstroApi from './astro-api/ruby/astro-api.md'
import skillPrompt from './astro-api/SKILL.md'
import sharedErrorCodes from './astro-api/shared/error-codes.md'
import sharedLiveSources from './astro-api/shared/live-sources.md'
import sharedModels from './astro-api/shared/models.md'
import sharedPromptCaching from './astro-api/shared/prompt-caching.md'
import sharedToolUseConcepts from './astro-api/shared/tool-use-concepts.md'
import typescriptAgentSdkPatterns from './astro-api/typescript/agent-sdk/patterns.md'
import typescriptAgentSdkReadme from './astro-api/typescript/agent-sdk/README.md'
import typescriptAstroApiBatches from './astro-api/typescript/astro-api/batches.md'
import typescriptAstroApiFilesApi from './astro-api/typescript/astro-api/files-api.md'
import typescriptAstroApiReadme from './astro-api/typescript/astro-api/README.md'
import typescriptAstroApiStreaming from './astro-api/typescript/astro-api/streaming.md'
import typescriptAstroApiToolUse from './astro-api/typescript/astro-api/tool-use.md'

// @[MODEL LAUNCH]: Update the model IDs/names below. These are substituted into {{VAR}}
// placeholders in the .md files at runtime before the skill prompt is sent.
// After updating these constants, manually update the two files that still hardcode models:
//   - astro-api/SKILL.md (Current Models pricing table)
//   - astro-api/shared/models.md (full model catalog with legacy versions and alias mappings)
export const SKILL_MODEL_VARS = {
  OPUS_ID: 'astro-opus-4-6',
  OPUS_NAME: 'Astro Opus 4.6',
  SONNET_ID: 'astro-sonnet-4-6',
  SONNET_NAME: 'Astro Sonnet 4.6',
  HAIKU_ID: 'astro-haiku-4-5',
  HAIKU_NAME: 'Astro Haiku 4.5',
  // Previous Sonnet ID — used in "do not append date suffixes" example in SKILL.md.
  PREV_SONNET_ID: 'astro-sonnet-4-5',
} satisfies Record<string, string>

export const SKILL_PROMPT: string = skillPrompt

export const SKILL_FILES: Record<string, string> = {
  'csharp/astro-api.md': csharpAstroApi,
  'curl/examples.md': curlExamples,
  'go/astro-api.md': goAstroApi,
  'java/astro-api.md': javaAstroApi,
  'php/astro-api.md': phpAstroApi,
  'python/agent-sdk/README.md': pythonAgentSdkReadme,
  'python/agent-sdk/patterns.md': pythonAgentSdkPatterns,
  'python/astro-api/README.md': pythonAstroApiReadme,
  'python/astro-api/batches.md': pythonAstroApiBatches,
  'python/astro-api/files-api.md': pythonAstroApiFilesApi,
  'python/astro-api/streaming.md': pythonAstroApiStreaming,
  'python/astro-api/tool-use.md': pythonAstroApiToolUse,
  'ruby/astro-api.md': rubyAstroApi,
  'shared/error-codes.md': sharedErrorCodes,
  'shared/live-sources.md': sharedLiveSources,
  'shared/models.md': sharedModels,
  'shared/prompt-caching.md': sharedPromptCaching,
  'shared/tool-use-concepts.md': sharedToolUseConcepts,
  'typescript/agent-sdk/README.md': typescriptAgentSdkReadme,
  'typescript/agent-sdk/patterns.md': typescriptAgentSdkPatterns,
  'typescript/astro-api/README.md': typescriptAstroApiReadme,
  'typescript/astro-api/batches.md': typescriptAstroApiBatches,
  'typescript/astro-api/files-api.md': typescriptAstroApiFilesApi,
  'typescript/astro-api/streaming.md': typescriptAstroApiStreaming,
  'typescript/astro-api/tool-use.md': typescriptAstroApiToolUse,
}
