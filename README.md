# Astro Code

Astro Code is a terminal agent CLI for coding workflows. It supports multiple OpenAI-compatible providers, local providers, model switching, slash commands, and agent creation flows.

## Requirements

- Node.js 20+
- npm
- Provider API key, unless using Ollama or LM Studio

## Install

```bash
npm install
```

## Start

```bash
npm start
```

First launch opens provider setup. Choose provider with arrow keys, enter API key if needed, then choose a model.

Supported providers:

- Google AI Studio
- Kimi
- OpenAI
- OpenRouter
- DeepSeek
- Ollama
- LM Studio
- Other OpenAI-compatible provider

## Build

```bash
npm run build
```

Build output goes to `dist/astro-code.js` and `dist/agent.js`.

## Run Built CLI

```bash
node dist/astro-code.js
```

Or use npm bin after install:

```bash
npx agent
```

## Useful Commands

Inside CLI:

```text
/model      Show current provider/model and change model
/statusline Show active provider/model in status line
/help       Show available commands
/init       Create project guidance files
```

## Provider Config

Provider setup stores config under:

```text
~/.agent-cli/provider.json
~/.astro.json
```

Reset setup:

```bash
rm -f ~/.agent-cli/provider.json ~/.astro.json
npm start
```

Ollama uses default URL:

```text
http://localhost:11434
```

LM Studio uses default URL:

```text
http://localhost:1234/v1
```

## Development

```bash
npm run check:source
npm run build
npm start
```

`check:source` validates local imports and runtime imports. Run it before pushing.

## Project Layout

```text
src/        CLI source
scripts/    build/run/check scripts
dist/       bundled output
bin/        executable entry
stubs/      generated compatibility stubs
vendor/     vendored SDK/runtime files
```

## Notes

Do not commit local config, API keys, or `node_modules`. `.gitignore` excludes local state and dependencies.
