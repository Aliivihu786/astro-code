#!/usr/bin/env node
import { spawnSync } from 'node:child_process'

const shouldInstall = process.argv.includes('--install')
const shouldBuild = process.argv.includes('--build')

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
    ...options,
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

const check = spawnSync(
  'node',
  ['scripts/check-source.mjs', '--allow-missing', '--write-report', '--json'],
  {
    encoding: 'utf8',
    shell: process.platform === 'win32',
  },
)

if (check.status !== 0) {
  process.stdout.write(check.stdout ?? '')
  process.stderr.write(check.stderr ?? '')
  process.exit(check.status ?? 1)
}

const report = JSON.parse(check.stdout)
const hasMissingSource = report.missingLocalRuntime.length > 0

if (hasMissingSource) {
  console.warn(
    `Source tree is incomplete (${report.missingLocalRuntime.length} missing runtime imports, ${report.missingLocalTypeOnly.length} missing type-only imports).`,
  )
  console.warn('Skipping npm install and generating a runnable local shim.')
} else if (shouldInstall) {
  run('npm', ['install'])
}

if (shouldBuild) {
  run('node', ['scripts/build.mjs'])
}
