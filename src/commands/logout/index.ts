import type { Command } from '../../commands.js'

export default {
  type: 'local-jsx',
  name: 'logout',
  description: 'Authentication is disabled in this Agent CLI build',
  isEnabled: () => false,
  load: () => import('./logout.js'),
} satisfies Command
