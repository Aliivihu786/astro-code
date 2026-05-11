#!/usr/bin/env node
import { spawnSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'

const localBin = process.platform === 'win32'
  ? 'node_modules/.bin/bun.cmd'
  : 'node_modules/.bin/bun'
const bunCommand = existsSync(localBin) ? localBin : 'bun'

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

function checkSource() {
  const result = spawnSync(
    'node',
    ['scripts/check-source.mjs', '--allow-missing', '--write-report', '--json'],
    {
      encoding: 'utf8',
      shell: process.platform === 'win32',
    },
  )

  if (result.status !== 0) {
    process.stdout.write(result.stdout ?? '')
    process.stderr.write(result.stderr ?? '')
    process.exit(result.status ?? 1)
  }

  return JSON.parse(result.stdout)
}

function writeShim(report) {
  mkdirSync('dist', { recursive: true })

  const output = 'dist/astro-code.js'
  const agentOutput = 'dist/agent.js'
  const version = JSON.parse(readFileSync('package.json', 'utf8')).version
  const payload = JSON.stringify(
    {
      version,
      sourceFiles: report.files,
      externalPackages: report.externalPackages.length,
      missingLocalImports: report.missingLocal.length,
      missingRuntimeImports: report.missingLocalRuntime.length,
      missingTypeOnlyImports: report.missingLocalTypeOnly.length,
      firstMissing: report.missingLocalRuntime.slice(0, 20),
    },
    null,
    2,
  )

  writeFileSync(
    output,
    `#!/usr/bin/env node
const status = ${payload};

function printHelp() {
  console.log(\`Astro Code local bootstrap shim v\${status.version}

This checkout is runnable, but it is not a complete original CLI build.
The recovered source tree is missing \${status.missingRuntimeImports} runtime imports and \${status.missingTypeOnlyImports} type-only imports across \${status.sourceFiles} scanned files.

Commands:
  --version, -v, -V    Print the local bootstrap version
  --status            Print source completeness status
  --missing           Print the first missing local imports
  --help, help        Show this help

Restore the missing runtime files listed in .bootstrap-report.json, install Bun, then rerun:
  make full-bootstrap
\`);
}

function printStatus() {
  console.log(JSON.stringify(status, null, 2));
}

const args = process.argv.slice(2);
if (args.length === 1 && ['--version', '-v', '-V'].includes(args[0])) {
  console.log(\`\${status.version} (Astro Code local bootstrap shim)\`);
} else if (args[0] === '--status' || args[0] === 'status') {
  printStatus();
} else if (args[0] === '--missing' || args[0] === 'missing') {
  for (const item of status.firstMissing) {
    console.log(\`\${item.file}:\${item.line} -> \${item.spec}\`);
  }
  if (status.missingLocalImports > status.firstMissing.length) {
    console.log(\`... \${status.missingLocalImports - status.firstMissing.length} more in .bootstrap-report.json\`);
  }
} else {
  printHelp();
}
`,
    { mode: 0o755 },
  )
  copyFileSync(output, agentOutput)

  console.warn(
    `Generated ${output} as a runnable shim because ${report.missingLocal.length} local imports are missing.`,
  )
}

function applyAstroEnvNames(file) {
  const upstreamPrefix = 'ANTHROP' + 'IC'
  const bundled = readFileSync(file, 'utf8')
    .replaceAll(`${upstreamPrefix}_API_KEY`, 'ASTRO_API_KEY')
    .replaceAll(`${upstreamPrefix}_BASE_URL`, 'ASTRO_BASE_URL')
  writeFileSync(file, bundled)
}

const report = checkSource()

if (report.missingLocalRuntime.length > 0) {
  writeShim(report)
  process.exit(0)
}

const bunCheck = spawnSync(bunCommand, ['--version'], {
  encoding: 'utf8',
  shell: process.platform === 'win32',
})

if (bunCheck.status !== 0) {
  console.error('\nBun is required for the original build path because the source imports bun:bundle.')
  console.error('Install Bun, restore the missing local source files, then rerun `make full-bootstrap`.')
  process.exit(1)
}

mkdirSync('dist', { recursive: true })

const output = 'dist/astro-code.js'
const agentOutput = 'dist/agent.js'
const version = JSON.parse(readFileSync('package.json', 'utf8')).version
const define = [
  `MACRO.VERSION=${JSON.stringify(version)}`,
  `MACRO.BUILD_TIME=${JSON.stringify(new Date().toISOString())}`,
  `MACRO.PACKAGE_URL=${JSON.stringify('@agent-ai/agent-cli')}`,
  `MACRO.NATIVE_PACKAGE_URL=${JSON.stringify('@agent-ai/agent-cli')}`,
  `MACRO.ISSUES_EXPLAINER=${JSON.stringify('open an issue with the project maintainer')}`,
  `MACRO.FEEDBACK_CHANNEL=${JSON.stringify('the configured feedback channel')}`,
  `MACRO.VERSION_CHANGELOG=${JSON.stringify('')}`,
]

run(bunCommand, [
  'build',
  'src/entrypoints/cli.tsx',
  '--target=node',
  `--outfile=${output}`,
  ...define.flatMap(item => ['--define', item]),
])

const bundled = readFileSync(output, 'utf8')
if (!bundled.startsWith('#!')) {
  writeFileSync(output, `#!/usr/bin/env node\n${bundled}`)
}
applyAstroEnvNames(output)
copyFileSync(output, agentOutput)

console.log(`Built ${output}`)
