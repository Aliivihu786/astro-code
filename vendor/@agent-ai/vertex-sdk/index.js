export class AnthropicVertex {
  constructor(options = {}) {
    this.options = options
    this.messages = {
      create: async () => {
        throw new Error('Local @agent-ai/vertex-sdk stub cannot call Vertex AI')
      },
      stream: () => {
        throw new Error('Local @agent-ai/vertex-sdk stub cannot call Vertex AI')
      },
    }
    this.beta = {}
  }
}
