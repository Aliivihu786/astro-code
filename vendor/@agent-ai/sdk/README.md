# <img src=".github/logo.svg" alt="" width="32"> Astro SDK for TypeScript

[![NPM version](https://img.shields.io/npm/v/@agent-ai/sdk.svg)](https://npmjs.org/package/@agent-ai/sdk)

The Astro SDK for TypeScript provides access to the [Astro API](https://docs.anthropic.com/en/api/) from server-side TypeScript or JavaScript applications.

## Documentation

Full documentation is available at **[platform.astro.com/docs/en/api/sdks/typescript](https://platform.astro.com/docs/en/api/sdks/typescript)**.

## Installation

```sh
npm install @agent-ai/sdk
```

## Getting started

```js
import Anthropic from '@agent-ai/sdk';

const client = new Anthropic({
  apiKey: process.env['ANTHROPIC_API_KEY'], // This is the default and can be omitted
});

const message = await client.messages.create({
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello, Astro' }],
  model: 'astro-opus-4-6',
});

console.log(message.content);
```

## Requirements

Node.js 18+

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
