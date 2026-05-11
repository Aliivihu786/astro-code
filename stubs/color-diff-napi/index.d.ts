export type SyntaxTheme = Record<string, unknown>

export class ColorDiff {
  constructor(
    patch?: unknown,
    firstLine?: number,
    filePath?: string,
    fileContent?: string,
  )
  render(theme?: SyntaxTheme | null, width?: number, dim?: boolean): string[] | null
}

export class ColorFile {
  constructor(fileContent?: string)
  render(theme?: SyntaxTheme | null, width?: number, dim?: boolean): string[] | null
}

export function getSyntaxTheme(themeName: string): SyntaxTheme | null
