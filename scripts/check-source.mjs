#!/usr/bin/env node
import { builtinModules } from 'node:module'
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const srcDir = path.join(root, 'src')
const builtinSpecs = new Set(
  builtinModules.flatMap(name => [name, `node:${name}`]),
)
const sourceExts = [
  '',
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.json',
  '.txt',
  '/index.ts',
  '/index.tsx',
  '/index.js',
  '/index.jsx',
]

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(fullPath, acc)
    } else if (/\.[cm]?[tj]sx?$/.test(entry.name)) {
      acc.push(fullPath)
    }
  }
  return acc
}

function parseStaticSpecs(filePath) {
  const specs = []
  const lines = readFileSync(filePath, 'utf8').split('\n')

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    const patterns = [
      /^\s*import(?:\s+type)?(?:[\s\S]*?\s+from)?\s*['"]([^'"]+)['"]/,
      /^\s*export(?:\s+type)?[\s\S]*?\s+from\s*['"]([^'"]+)['"]/,
      /^\s*(?:const|let|var)\s+[^=]+?=\s*require\(\s*['"]([^'"]+)['"]\s*\)/,
      /\bimport\(\s*['"]([^'"]+)['"]\s*\)/,
      /\brequire\(\s*['"]([^'"]+)['"]\s*\)/,
    ]

    for (const pattern of patterns) {
      const match = line.match(pattern)
      if (match?.[1]) {
        specs.push({
          line: index + 1,
          spec: match[1],
          typeOnly: isTypeOnlyImportLine(line),
        })
        break
      }
    }
  }

  return specs
}

function isTypeOnlyImportLine(line) {
  return (
    /^\s*(import|export)\s+type\b/.test(line) ||
    /^\s*import\s*\{\s*type\b/.test(line) ||
    /\bimport\s+type\b/.test(line)
  )
}

function resolveLocalSpec(fromFile, spec) {
  const base = spec.startsWith('src/')
    ? path.join(root, spec)
    : path.resolve(path.dirname(fromFile), spec)
  const withoutJsSuffix = base.replace(/\.js$/, '')

  for (const ext of sourceExts) {
    if (existsSync(base + ext)) return true
    if (existsSync(withoutJsSuffix + ext)) return true
  }

  return false
}

function packageName(spec) {
  return spec.startsWith('@') ? spec.split('/').slice(0, 2).join('/') : spec.split('/')[0]
}

if (!existsSync(srcDir)) {
  console.error('Missing src/ directory.')
  process.exit(1)
}

const files = walk(srcDir)
const missingLocal = []
const externalPackages = new Set()

for (const file of files) {
  for (const { line, spec, typeOnly } of parseStaticSpecs(file)) {
    if (spec.startsWith('.') || spec.startsWith('src/')) {
      if (!resolveLocalSpec(file, spec)) {
        missingLocal.push({
          file: path.relative(root, file),
          line,
          spec,
          typeOnly,
        })
      }
      continue
    }

    if (
      builtinSpecs.has(spec) ||
      spec === 'bun:bundle' ||
      spec.startsWith('bun:')
    ) {
      continue
    }

    externalPackages.add(packageName(spec))
  }
}

const report = {
  files: files.length,
  externalPackages: [...externalPackages].sort(),
  missingLocal,
  missingLocalRuntime: missingLocal.filter(item => !item.typeOnly),
  missingLocalTypeOnly: missingLocal.filter(item => item.typeOnly),
}

if (process.argv.includes('--json')) {
  console.log(JSON.stringify(report, null, 2))
} else {
  console.log(`Source files scanned: ${report.files}`)
  console.log(`External packages referenced: ${report.externalPackages.length}`)
  console.log(`Missing local imports: ${report.missingLocal.length}`)
  console.log(`Missing runtime imports: ${report.missingLocalRuntime.length}`)
  console.log(`Missing type-only imports: ${report.missingLocalTypeOnly.length}`)

  if (report.missingLocal.length > 0) {
    console.log('\nFirst missing local imports:')
    for (const item of report.missingLocal.slice(0, 80)) {
      const kind = item.typeOnly ? 'type' : 'runtime'
      console.log(`- ${item.file}:${item.line} -> ${item.spec} (${kind})`)
    }
    if (report.missingLocal.length > 80) {
      console.log(`- ... ${report.missingLocal.length - 80} more`)
    }
  }
}

if (process.argv.includes('--write-report')) {
  writeFileSync(
    path.join(root, '.bootstrap-report.json'),
    JSON.stringify(report, null, 2),
  )
}

if (
  report.missingLocalRuntime.length > 0 &&
  !process.argv.includes('--allow-missing')
) {
  console.error(
    '\nBootstrap cannot build the full CLI until the missing runtime source files are restored.',
  )
  console.error('Run with --json or --write-report for a machine-readable report.')
  process.exit(1)
}
