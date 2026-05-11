# Repository Guidelines

## Project Structure & Module Organization

This repository is a standalone TypeScript/Node CLI. Source code lives in `src/`, with command implementations under `src/commands/`, UI components under `src/components/`, tools under `src/tools/`, shared utilities under `src/utils/`, and app state under `src/state/`. Build and helper scripts live in `scripts/`. Runtime entry wrappers are in `bin/`, vendored local packages are in `vendor/`, and compatibility stubs are in `stubs/`. Built output is generated into `dist/`; do not edit generated files directly unless the build process requires it.

## Build, Test, and Development Commands

- `npm run bootstrap`: prepares local project dependencies/state.
- `npm run full-bootstrap`: installs, bootstraps, and builds in one step.
- `npm run check:source`: scans source imports and package references; run this after structural changes.
- `npm run build`: bundles the CLI into `dist/astro-code.js`.
- `npm run start`: runs the built CLI through `scripts/run.mjs`.
- `npm run agent`: runs the agent entry through `scripts/run-agent.mjs`.

The project requires Node `>=20` and npm `>=9`.

## Coding Style & Naming Conventions

Use TypeScript ES modules. Keep imports explicit with `.js` runtime extensions when matching existing source patterns. Follow the surrounding file style: two-space indentation, semicolons only where already used, and concise named exports for shared helpers. Command folders generally live at `src/commands/<command-name>/` with an `index.ts` metadata entry and separate implementation file when needed.

## Testing Guidelines

There is no dedicated `npm test` script in this checkout. Use `npm run check:source` and `npm run build` as the required validation baseline. For behavior changes, add focused tests or local verification near the touched module when a test harness exists; otherwise document the manual command used to validate the CLI path.

## Commit & Pull Request Guidelines

Recent history uses Conventional Commit style, for example `docs(README): updated docs`. Prefer concise subjects such as `fix(model): show selected provider model` or `chore(build): remove stale command`. Pull requests should include a short summary, validation commands run, linked issues when applicable, and screenshots or terminal output for user-facing CLI/UI changes.

## Security & Configuration Tips

Do not commit real API keys, local auth files, or generated user config such as `.astro/` contents. Provider setup and model selection touch user credentials, so keep logs and error messages free of secret values.
