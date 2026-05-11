export class ColorDiff {
  constructor(patch = {}, firstLine = 1, filePath = '', fileContent = '') {
    this.patch = patch
    this.firstLine = firstLine
    this.filePath = filePath
    this.fileContent = fileContent
  }

  render() {
    const hunks = Array.isArray(this.patch?.hunks) ? this.patch.hunks : []
    if (hunks.length === 0) return null

    const lines = []
    for (const hunk of hunks) {
      if (typeof hunk.header === 'string') {
        lines.push(hunk.header)
      }
      for (const line of hunk.lines ?? []) {
        lines.push(typeof line === 'string' ? line : String(line))
      }
    }
    return lines
  }
}

export class ColorFile {
  constructor(fileContent = '') {
    this.fileContent = fileContent
  }

  render() {
    return String(this.fileContent).split('\n')
  }
}

export function getSyntaxTheme() {
  return null
}
