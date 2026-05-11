import { toString as qrToString } from 'qrcode'
import * as React from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Pane } from '../../components/design-system/Pane.js'
import type { KeyboardEvent } from '../../ink/events/keyboard-event.js'
import { Box, Text } from '../../ink.js'
import { useKeybinding } from '../../keybindings/useKeybinding.js'
import type { LocalJSXCommandOnDone } from '../../types/command.js'

type Props = {
  onDone: () => void
}

const DEFAULT_WHATSAPP_MESSAGE =
  'Connect Astro Code to WhatsApp so I can continue this agent chat from my phone.'

function getWhatsAppConnectUrl(): string {
  const configuredUrl = process.env.ASTRO_WHATSAPP_URL?.trim()
  if (configuredUrl) return configuredUrl

  const phoneNumber = process.env.ASTRO_WHATSAPP_NUMBER?.replace(/[^\d]/g, '')
  const message = encodeURIComponent(
    process.env.ASTRO_WHATSAPP_MESSAGE?.trim() || DEFAULT_WHATSAPP_MESSAGE,
  )

  if (phoneNumber) return `https://wa.me/${phoneNumber}?text=${message}`
  return `https://wa.me/?text=${message}`
}

function MobileQRCode({ onDone }: Props): React.ReactNode {
  const [qrCode, setQrCode] = useState('')
  const whatsappUrl = useMemo(getWhatsAppConnectUrl, [])

  useEffect(() => {
    async function generateQRCode(): Promise<void> {
      const qr = await qrToString(whatsappUrl, {
        type: 'utf8',
        errorCorrectionLevel: 'L',
      })
      setQrCode(qr)
    }

    generateQRCode().catch(() => {
      setQrCode('')
    })
  }, [whatsappUrl])

  const handleClose = useCallback(() => {
    onDone()
  }, [onDone])

  useKeybinding('confirm:no', handleClose, { context: 'Confirmation' })

  function handleKeyDown(e: KeyboardEvent): void {
    if (e.key === 'q' || (e.ctrl && e.key === 'c')) {
      e.preventDefault()
      onDone()
    }
  }

  const lines = qrCode.split('\n').filter(line => line.length > 0)

  return (
    <Pane>
      <Box flexDirection="column" tabIndex={0} autoFocus onKeyDown={handleKeyDown}>
        <Text bold color="green">
          Connect Astro Code to WhatsApp
        </Text>
        <Text dimColor>Scan this QR with your phone to open WhatsApp.</Text>
        <Text> </Text>
        {lines.length > 0 ? (
          lines.map((line, i) => <Text key={i}>{line}</Text>)
        ) : (
          <Text dimColor>Generating WhatsApp QR...</Text>
        )}
        <Text> </Text>
        <Text>
          <Text bold>1.</Text> Scan QR
        </Text>
        <Text>
          <Text bold>2.</Text> Send the prefilled connect message
        </Text>
        <Text>
          <Text bold>3.</Text> Continue chatting with the agent from WhatsApp
        </Text>
        <Text> </Text>
        <Text dimColor>
          Set ASTRO_WHATSAPP_URL or ASTRO_WHATSAPP_NUMBER to use your own
          WhatsApp agent endpoint.
        </Text>
        <Text dimColor>{whatsappUrl}</Text>
        <Text dimColor>Press q or esc to close.</Text>
      </Box>
    </Pane>
  )
}

export async function call(
  onDone: LocalJSXCommandOnDone,
): Promise<React.ReactNode> {
  return <MobileQRCode onDone={onDone} />
}
