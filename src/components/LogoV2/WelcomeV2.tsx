import React from 'react'
import { Box, Text } from 'src/ink.js'

export function WelcomeV2(): React.ReactNode {
  return (
    <Box>
      <Text>
        <Text color="astro">Welcome to Astro Code </Text>
        <Text dimColor>v{MACRO.VERSION}</Text>
      </Text>
    </Box>
  )
}
