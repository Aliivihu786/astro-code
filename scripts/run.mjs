#!/usr/bin/env node
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'

const builtCli = 'dist/astro-code.js'

if (!existsSync(builtCli)) {
  console.error('No built CLI found at dist/astro-code.js.')
  console.error('Run `make full-bootstrap` first.')
  process.exit(1)
}

const result = spawnSync(process.execPath, [builtCli, ...process.argv.slice(2)], {
  stdio: 'inherit',
})

process.exit(result.status ?? 1)
