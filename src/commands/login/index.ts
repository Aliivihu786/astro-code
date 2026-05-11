import type { Command } from '../../commands.js'
export default () =>
  ({
    type: 'local-jsx',
    name: 'login',
    description: 'Authentication is disabled in this Agent CLI build',
    isEnabled: () => false,
    load: () => import('./login.js'),
  }) satisfies Command
