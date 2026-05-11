import type { Command } from '../../commands.js'

const mobile = {
  type: 'local-jsx',
  name: 'mobile',
  aliases: ['ios', 'android'],
  description: 'Connect Astro Code to WhatsApp',
  load: () => import('./mobile.js'),
} satisfies Command

export default mobile
