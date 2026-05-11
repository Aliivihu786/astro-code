#!/usr/bin/env node
import { spawnSync } from 'node:child_process'
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs'
import path from 'node:path'

const root = process.cwd()

function runSourceCheck() {
  const result = spawnSync(
    'node',
    ['scripts/check-source.mjs', '--allow-missing', '--json'],
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

function walkSourceFiles(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== 'dist') {
        walkSourceFiles(fullPath, acc)
      }
    } else if (/\.[cm]?[tj]sx?$/.test(entry.name)) {
      acc.push(fullPath)
    }
  }
  return acc
}

function parseLocalSpecs(filePath) {
  const specs = []
  const source = readFileSync(filePath, 'utf8')
  const lineForIndex = index => source.slice(0, index).split('\n').length
  const patterns = [
    /\bimport(?:\s+type)?(?:[\s\S]*?\s+from)?\s*['"]([^'"]+)['"]/g,
    /\bexport(?:\s+type)?[\s\S]*?\s+from\s*['"]([^'"]+)['"]/g,
    /\brequire\(\s*['"]([^'"]+)['"]\s*\)/g,
    /\bimport\(\s*['"]([^'"]+)['"]\s*\)/g,
  ]

  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) {
      if (match?.[1] && (match[1].startsWith('.') || match[1].startsWith('src/'))) {
        specs.push({
          file: path.relative(root, filePath),
          line: lineForIndex(match.index ?? 0),
          spec: match[1],
        })
      }
    }
  }

  return specs
}

function resolveTarget(file, spec) {
  const base = spec.startsWith('src/')
    ? path.join(root, path.normalize(spec))
    : path.resolve(root, path.dirname(file), spec)

  const parsed = path.parse(base)
  if (parsed.ext === '.txt' || parsed.ext === '.json') return base
  if (parsed.ext === '.js' || parsed.ext === '.jsx') {
    return path.join(parsed.dir, `${parsed.name}.ts`)
  }
  if (parsed.ext) return base
  return `${base}.ts`
}

function isGeneratedStub(target) {
  return (
    existsSync(target) &&
    readFileSync(target, 'utf8').includes('AUTO-GENERATED COMPATIBILITY STUB')
  )
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function isIdentifier(value) {
  return /^[A-Za-z_$][\w$]*$/.test(value)
}

const reservedWords = new Set([
  'any',
  'as',
  'bigint',
  'boolean',
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'else',
  'enum',
  'export',
  'extends',
  'false',
  'finally',
  'for',
  'from',
  'function',
  'if',
  'import',
  'in',
  'instanceof',
  'let',
  'never',
  'new',
  'null',
  'number',
  'object',
  'of',
  'return',
  'string',
  'super',
  'switch',
  'symbol',
  'this',
  'throw',
  'true',
  'try',
  'typeof',
  'undefined',
  'unknown',
  'var',
  'void',
  'while',
  'with',
  'yield',
])

function parseNamedList(raw) {
  const names = []
  for (const part of raw.split(',')) {
    const cleaned = part
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/g, '')
      .trim()
      .replace(/^type\s+/, '')
    if (!cleaned || cleaned.startsWith('...')) continue

    const sourceName = cleaned
      .split(/\s+as\s+/)[0]
      .split(':')[0]
      .split('=')[0]
      .trim()

    if (isIdentifier(sourceName) && !reservedWords.has(sourceName)) {
      names.push(sourceName)
    }
  }
  return names
}

function collectExportsFor(target, occurrences) {
  const runtime = new Set()
  const types = new Set()
  let needsDefault = true

  for (const occurrence of occurrences) {
    const sourcePath = path.join(root, occurrence.file)
    const source = readFileSync(sourcePath, 'utf8')
    const spec = escapeRegExp(occurrence.spec)
    const statements = importExportStatementsForSpec(source, occurrence.spec)

    for (const statement of statements) {
      const named = statement.match(/\{([\s\S]*?)\}/)
      if (named?.[1]) {
        for (const part of named[1].split(',')) {
          const trimmed = part.trim()
          for (const name of parseNamedList(trimmed)) {
            if (
              /^import\s+type\b/.test(statement) ||
              /^export\s+type\b/.test(statement) ||
              trimmed.startsWith('type ')
            ) {
              types.add(name)
            } else {
              runtime.add(name)
            }
          }
        }
      }

      if (/^import\s+[A-Za-z_$][\w$]*/.test(statement)) {
        needsDefault = true
      }
    }

    const importTypeRegex = new RegExp(
      `import\\s+type\\s+\\{([\\s\\S]*?)\\}\\s+from\\s+['"]${spec}['"]`,
      'g',
    )
    for (const match of source.matchAll(importTypeRegex)) {
      for (const name of parseNamedList(match[1] ?? '')) types.add(name)
    }

    const namedImportRegex = new RegExp(
      `import\\s+(?:[A-Za-z_$][\\w$]*\\s*,\\s*)?\\{([\\s\\S]*?)\\}\\s+from\\s+['"]${spec}['"]`,
      'g',
    )
    for (const match of source.matchAll(namedImportRegex)) {
      const raw = match[1] ?? ''
      for (const part of raw.split(',')) {
        const trimmed = part.trim()
        const names = parseNamedList(trimmed)
        for (const name of names) {
          if (trimmed.startsWith('type ')) types.add(name)
          else runtime.add(name)
        }
      }
    }

    const defaultImportRegex = new RegExp(
      `import\\s+[A-Za-z_$][\\w$]*(?:\\s*,\\s*\\{[\\s\\S]*?\\})?\\s+from\\s+['"]${spec}['"]`,
      'g',
    )
    if (defaultImportRegex.test(source)) needsDefault = true

    const exportNamedRegex = new RegExp(
      `export\\s+(?:type\\s+)?\\{([\\s\\S]*?)\\}\\s+from\\s+['"]${spec}['"]`,
      'g',
    )
    for (const match of source.matchAll(exportNamedRegex)) {
      const isTypeOnly = match[0].startsWith('export type')
      for (const name of parseNamedList(match[1] ?? '')) {
        if (isTypeOnly) types.add(name)
        else runtime.add(name)
      }
    }

    const requirePropertyRegex = new RegExp(
      `require\\(\\s*['"]${spec}['"]\\s*\\)\\.([A-Za-z_$][\\w$]*)`,
      'g',
    )
    for (const match of source.matchAll(requirePropertyRegex)) {
      const name = match[1]
      if (name === 'default') needsDefault = true
      else runtime.add(name)
    }

    const destructuredRegex = new RegExp(
      `\\{([\\s\\S]*?)\\}\\s*=\\s*(?:await\\s+)?(?:import\\(\\s*['"]${spec}['"]\\s*\\)|require\\(\\s*['"]${spec}['"]\\s*\\))`,
      'g',
    )
    for (const match of source.matchAll(destructuredRegex)) {
      for (const name of parseNamedList(match[1] ?? '')) runtime.add(name)
    }
  }

  return { target, runtime: [...runtime].sort(), types: [...types].sort(), needsDefault }
}

function importExportStatementsForSpec(source, spec) {
  const statements = []
  const lines = source.split('\n')

  for (let i = 0; i < lines.length; i += 1) {
    const trimmed = lines[i].trim()
    if (!/^(import|export)\b/.test(trimmed)) continue

    const parts = [lines[i]]
    while (
      i + 1 < lines.length &&
      !new RegExp(`from\\s+['"]${escapeRegExp(spec)}['"]`).test(parts.join('\n')) &&
      !new RegExp(`^\\s*import\\s+['"]${escapeRegExp(spec)}['"]`).test(parts.join('\n')) &&
      !/\bfrom\s+['"][^'"]+['"]/.test(parts.join('\n')) &&
      !parts.join('\n').includes(';')
    ) {
      i += 1
      parts.push(lines[i])
    }

    const statement = parts.join('\n')
    if (
      new RegExp(`from\\s+['"]${escapeRegExp(spec)}['"]`).test(statement) ||
      new RegExp(`^\\s*import\\s+['"]${escapeRegExp(spec)}['"]`).test(statement)
    ) {
      statements.push(statement)
    }
  }

  return statements
}

function stubFor({ target, runtime, types, needsDefault }) {
  const rel = path.relative(root, target)
  const lines = [
    '/*',
    ' * AUTO-GENERATED COMPATIBILITY STUB.',
    ' *',
    ' * The recovered source tree imports this module, but the original file is',
    ' * absent from this checkout. This stub only exists so local tooling can',
    ' * resolve modules; it is not a replacement for the original implementation.',
    ' */',
    '',
    'type StubCallable = ((...args: unknown[]) => unknown) & Record<PropertyKey, unknown>',
    '',
    'const createStub = (label: string): StubCallable => {',
    '  const target = function compatibilityStub() {',
    "    throw new Error(`Missing original implementation for " + rel + " (${label})`)",
    '  } as StubCallable',
    '  return new Proxy(target, {',
    '    get(current, prop) {',
    "      if (prop === 'then') return undefined",
    "      if (prop === Symbol.toStringTag) return 'CompatibilityStub'",
    '      if (prop in current) return current[prop]',
    '      return createStub(`${label}.${String(prop)}`)',
    '    },',
    '    apply() {',
    "      throw new Error(`Missing original implementation for " + rel + " (${label})`)",
    '    },',
    '    construct() {',
    "      throw new Error(`Missing original implementation for " + rel + " (${label})`)",
    '    },',
    '  })',
    '}',
    '',
    'const stub = createStub(' + JSON.stringify(rel) + ')',
    '',
  ]

  const allTypeNames = new Set([...types, ...runtime])
  for (const name of [...allTypeNames].sort()) {
    lines.push(`export type ${name} = any`)
  }
  if (allTypeNames.size > 0) lines.push('')

  for (const name of runtime) {
    lines.push(`export const ${name}: any = stub`)
  }
  if (runtime.length > 0) lines.push('')

  if (needsDefault) {
    lines.push('export default stub')
  }

  lines.push('')
  return lines.join('\n')
}

function writeStub(target, info) {
  const existed = existsSync(target)
  if (existed && !isGeneratedStub(target)) return false
  mkdirSync(path.dirname(target), { recursive: true })

  if (target.endsWith('.txt')) {
    writeFileSync(
      target,
      'AUTO-GENERATED COMPATIBILITY STUB: original prompt text is missing.\n',
    )
    return !existed
  }

  if (target.endsWith('.json')) {
    writeFileSync(target, '{}\n')
    return !existed
  }

  writeFileSync(target, stubFor(info))
  return !existed
}

const report = runSourceCheck()
const grouped = new Map()

for (const item of report.missingLocal) {
  const target = resolveTarget(item.file, item.spec)
  const key = path.normalize(target)
  const existing = grouped.get(key) ?? []
  existing.push(item)
  grouped.set(key, existing)
}

for (const file of walkSourceFiles(path.join(root, 'src'))) {
  for (const item of parseLocalSpecs(file)) {
    const target = resolveTarget(item.file, item.spec)
    if (!isGeneratedStub(target)) continue
    const key = path.normalize(target)
    const existing = grouped.get(key) ?? []
    existing.push(item)
    grouped.set(key, existing)
  }
}

let created = 0
for (const [target, occurrences] of grouped) {
  const info = collectExportsFor(target, occurrences)
  if (writeStub(target, info)) created += 1
}

console.log(`Generated ${created} compatibility stub files.`)
console.log(`Unique missing module targets: ${grouped.size}`)
