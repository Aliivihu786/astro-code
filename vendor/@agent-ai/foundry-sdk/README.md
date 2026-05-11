# <img src=".github/logo.svg" alt="" width="32"> Astro SDK for Microsoft Foundry

[![NPM version](https://img.shields.io/npm/v/@agent-ai/foundry-sdk.svg?color=blue)](https://npmjs.org/package/@agent-ai/foundry-sdk)

This library provides convenient access to the Astro API via Microsoft Azure AI Foundry. See the [documentation](https://platform.astro.com/docs/en/build-with-astro/astro-in-microsoft-foundry) for more details.

For the direct Astro API at api.anthropic.com, see [`@agent-ai/sdk`](https://github.com/anthropics/anthropic-sdk-typescript).

## Installation

```bash
npm install @agent-ai/foundry-sdk
```

## Usage

### Basic Usage with API Key

```ts
import { AnthropicFoundry } from '@agent-ai/foundry-sdk';

const client = new AnthropicFoundry({
  apiKey: process.env.ANTHROPIC_FOUNDRY_API_KEY, // defaults to process.env.ANTHROPIC_FOUNDRY_API_KEY
  resource: 'example-resource.azure.anthropic.com', // your Azure resource
});

const message = await client.messages.create({
  model: 'astro-3-5-sonnet-20241022',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello, Astro!' }],
});

console.log(message.content);
```

### Using Azure AD Token Provider

For enhanced security, you can use Azure AD (Microsoft Entra) authentication instead of an API key:

```ts
import { AnthropicFoundry } from '@agent-ai/foundry-sdk';
import { getBearerTokenProvider, DefaultAzureCredential } from '@azure/identity';

const credential = new DefaultAzureCredential();
const scope = 'https://ai.azure.com/.default';
const azureADTokenProvider = getBearerTokenProvider(credential, scope);

const client = new AnthropicFoundry({
  azureADTokenProvider,
  resource: 'example-resource.azure.anthropic.com', // your Azure resource
});

const message = await client.messages.create({
  model: 'astro-3-5-sonnet-20241022',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello, Astro!' }],
});

console.log(message.content);
```

### Using Model Deployments

If you have a model deployment configured, you can specify it to have the SDK automatically construct the correct URL path:

```ts
const client = new AnthropicFoundry({
  apiKey: process.env.ANTHROPIC_FOUNDRY_API_KEY,
  resource: 'example-resource.azure.anthropic.com',
});

// The SDK will automatically use /deployments/my-astro-deployment/messages
const message = await client.messages.create({
  model: 'astro-3-5-sonnet-20241022',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello!' }],
});
```
