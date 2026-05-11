import type { Command } from '../../types/command.js'

const model = {
  type: 'local-jsx',
  name: 'model',
  description: 'Show or change the current provider model',
  argumentHint: '[model|custom model|current|list|default|fast|balanced|deep|best]',
  immediate: true,
  load: () => import('./model.js'),
} satisfies Command

export default model
