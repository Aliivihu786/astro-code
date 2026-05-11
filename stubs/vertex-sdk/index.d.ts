export class AnthropicVertex {
  constructor(options?: Record<string, unknown>)
  messages: {
    create(...args: unknown[]): Promise<unknown>
    stream(...args: unknown[]): unknown
  }
  beta: Record<string, unknown>
}
