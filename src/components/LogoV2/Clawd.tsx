import * as React from 'react'
import { Box, Text } from '../../ink.js'

export type ClawdPose =
  | 'default'
  | 'arms-up'
  | 'look-left'
  | 'look-right'

type Props = {
  pose?: ClawdPose
}

const ASTRO_LOGO = [
  ' █████  █████ ████████ ██████   ██████ ',
  '██   ██ ██       ██    ██   ██ ██    ██',
  '███████ █████    ██    ██████  ██    ██',
  '██   ██    ██    ██    ██   ██ ██    ██',
  '██   ██ █████    ██    ██   ██  ██████ ',
]

export function Clawd(_props: Props = {}): React.ReactNode {
  return (
    <Box flexDirection="column" alignItems="center">
      <Text> </Text>
      {ASTRO_LOGO.map((line, index) => (
        <Text key={index} color="astro">
          {line}
        </Text>
      ))}
      <Text> </Text>
    </Box>
  )
}
