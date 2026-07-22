# Astro Code

Astro Code is a terminal AI coding agent CLI. It runs inside your project, talks to chosen LLM provider, edits files, runs tools, manages agents, and gives interactive slash-command control from terminal UI.

## Features

- Multi-provider setup: Google AI Studio, Kimi, OpenAI, OpenRouter, DeepSeek, Ollama, LM Studio, custom OpenAI-compatible APIs
- Interactive provider/model picker
- `/model` live model switch from configured provider list
- Agent creation and agent model inheritance
- Terminal UI built with Ink/React
- Tool system for file edits, shell commands, search, agents, plugins, tasks, MCP, browser tools
- Local config in `~/.agent-cli/provider.json` and `~/.astro.json`
- Buildable single-file runtime in `dist/`

## Requirements

- Node.js 20+
- npm
- API key for cloud providers
- Ollama or LM Studio running locally for local providers

## Quick Start

```bash
npm install
npm start
```

First run opens setup:

1. Select provider with arrow keys.
2. Enter API key when provider needs one.
3. Select model.
4. Start chatting in terminal.

Reset setup:

```bash
rm -f ~/.agent-cli/provider.json ~/.astro.json
npm start
```

## Scripts

```bash
npm run bootstrap       # prepare generated files
npm run full-bootstrap  # install/build bootstrap flow
npm run check:source    # validate local imports and runtime imports
npm run build           # bundle dist/astro-code.js and dist/agent.js
npm start               # run Astro Code CLI
npm run agent           # run agent entry
```

## CLI Commands

Inside Astro Code:

```text
/model       show/change current provider model
/statusline  show provider/model in status line
/help        command help
/init        create project guidance
/config      edit settings
/agents      manage agents
/permissions manage tool permissions
/mcp         manage MCP servers
/theme       change terminal theme
```

## Architecture

```text
bin/                    executable shims
dist/                   bundled runtime output
scripts/                build, bootstrap, source checks, run scripts
src/                    main TypeScript source
stubs/                  compatibility stubs for native/optional modules
vendor/                 vendored @agent-ai SDK packages
```

## Source Map

```text
src/main.tsx            CLI boot, args, startup config
src/entrypoints/        executable entrypoints and SDK entry
src/screens/REPL.tsx    main interactive loop and prompt handling
src/query.ts            agent query loop, tool-use flow, stop hooks
src/QueryEngine.ts      non-interactive/headless query engine
src/Tool.ts             tool contract
src/Task.ts             task contract
```

## Core Subsystems

### Provider Setup

```text
src/utils/providerSetup.ts
```

Owns first-run provider wizard, saved provider config, active model env, static provider model lists, `/model` model source.

Config files:

```text
~/.agent-cli/provider.json
~/.astro.json
```

Default local URLs:

```text
Ollama    http://localhost:11434
LM Studio http://localhost:1234/v1
```

### Terminal UI

```text
src/components/
src/components/PromptInput/
src/components/messages/
src/components/LogoV2/
src/ink/
```

Ink/React render tree. `PromptInput` handles typing, paste, slash command dispatch, loading state, and prompt footer. `messages` render assistant, user, system, API error, and tool messages.

### Commands

```text
src/commands/
```

Slash commands live here. Each command has `index.ts` plus implementation file/folder. `/model` lives in:

```text
src/commands/model/model.tsx
```

### Tools

```text
src/tools/
```

Tools implement agent actions: file read/write, shell, search, agent spawning, browser, MCP, workflow, review, sleep, monitor, and more. Tool permissions flow through `src/components/permissions/` and `src/utils/permissions/`.

### Agents

```text
src/components/agents/
src/tools/AgentTool/
src/utils/model/agent.ts
```

Agent UI, creation wizard, agent model selector, agent display, and tool runtime. Agents inherit current provider model unless user selects another provider-listed model.

### API Layer

```text
src/services/api/
src/utils/model/
vendor/@agent-ai/
```

API client creation, retry behavior, streaming, error formatting, model parsing, model display, and provider-specific SDK compatibility. Provider model shown to user comes from static CLI lists, not live `/models` discovery.

### State

```text
src/bootstrap/state.ts
src/state/
src/context.ts
```

Global app/session state: model, cost, tokens, tasks, streaming state, permissions, durations, memory, notifications.

### Tasks And Background Work

```text
src/tasks/
src/jobs/
src/daemon/
src/server/
src/bridge/
```

Foreground/background tasks, local and remote sessions, bridge connections, task queues, server helpers, transport clients.

### Plugins, Skills, MCP

```text
src/plugins/
src/skills/
src/commands/plugin/
src/components/mcp/
src/services/skillSearch/
```

Plugin marketplace, installed plugins, skill loading, MCP server UI, MCP tools, and skill discovery.

### Memory And Context

```text
src/memdir/
src/services/compact/
src/services/contextCollapse/
src/services/sessionTranscript/
src/utils/context.ts
```

Project memory, session transcript, context compaction, microcompaction, memory discovery, and context budget handling.

## Request Flow

```text
User input
  -> PromptInput
  -> processSlashCommand or REPL onQuery
  -> query.ts
  -> services/api/astro.ts
  -> provider API stream
  -> handleMessageFromStream
  -> Messages render
  -> tools/tasks mutate files or run commands
```

Slash command flow:

```text
/model
  -> src/commands/model/model.tsx
  -> src/utils/providerSetup.ts
  -> setProviderModel()
  -> AppState mainLoopModel update
```

Tool-use flow:

```text
model requests tool
  -> query loop validates permission
  -> tool runs
  -> result appended
  -> model continues or stops
```

## Build Output

```text
dist/astro-code.js   main CLI bundle
dist/agent.js        agent executable bundle
bin/agent.js         package bin shim
```

Build:

```bash
npm run build
```

Run built CLI:

```bash
node dist/astro-code.js
```

## Development Workflow

```bash
npm install
npm run check:source
npm run build
npm start
```

Before push:

```bash
npm run check:source
npm run build
git status
```

## Security

Never commit API keys, local config, `node_modules`, or generated local state. `.gitignore` excludes:

```text
node_modules/
.astro/
.agent/
.bootstrap-report.json
```

Rotate any token pasted into terminal logs or chat.
## Burn buld fix
```bun buld
$env:BUN_EXE = "$env:USERPROFILE\.bun\bin\bun.exe"
node .\scripts\build.mjs
```
