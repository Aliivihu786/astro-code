import { toString as qrToString } from 'qrcode'
import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { getSessionId } from '../../bootstrap/state.js'
import { Pane } from '../../components/design-system/Pane.js'
import type { KeyboardEvent } from '../../ink/events/keyboard-event.js'
import { Box, Text } from '../../ink.js'
import { useKeybinding } from '../../keybindings/useKeybinding.js'
import { ensureWhatsAppServer } from '../../services/whatsapp/server.js'
import type {
  LocalJSXCommandContext,
  LocalJSXCommandOnDone,
} from '../../types/command.js'
import { getContentText } from '../../utils/messages.js'

type Props = {
  context: LocalJSXCommandContext
  onDone: () => void
}

function MobileQRCode({ context, onDone }: Props): React.ReactNode {
  const [qrCode, setQrCode] = useState('')
  const [status, setStatus] = useState('Starting WhatsApp webhook...')
  const [webhookUrl, setWebhookUrl] = useState('')
  const [publicWebhookUrl, setPublicWebhookUrl] = useState('')
  const [whatsappUrl, setWhatsappUrl] = useState('')

  useEffect(() => {
    async function startWhatsApp(): Promise<void> {
      const info = await ensureWhatsAppServer({
        cliSessionId: getSessionId(),
        seedMessages: getSeedMessages(context),
      })
      const qr = await qrToString(info.whatsappUrl, {
        type: 'utf8',
        errorCorrectionLevel: 'M',
        margin: 2,
        small: true,
      })
      setWebhookUrl(info.webhookUrl)
      setPublicWebhookUrl(info.publicWebhookUrl)
      setWhatsappUrl(info.whatsappUrl)
      setQrCode(qr)
      setStatus('WhatsApp webhook is running.')
    }

    startWhatsApp().catch(error => {
      const message = error instanceof Error ? error.message : String(error)
      setQrCode('')
      setStatus(`WhatsApp setup failed: ${message}`)
    })
  }, [context])

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
        <Text dimColor>{status}</Text>
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
          <Text bold>3.</Text> Configure your WhatsApp provider webhook
        </Text>
        <Text>
          <Text bold>4.</Text> Continue chatting with the agent from WhatsApp
        </Text>
        <Text> </Text>
        <Text dimColor>
          Webhook: {publicWebhookUrl || webhookUrl || 'starting...'}
        </Text>
        <Text dimColor>
          For Twilio WhatsApp, set "When a message comes in" to this webhook URL.
        </Text>
        <Text dimColor>Set ASTRO_WHATSAPP_PUBLIC_URL when using ngrok/cloudflared.</Text>
        <Text dimColor>QR opens: {whatsappUrl}</Text>
        <Text dimColor>Press q or esc to close.</Text>
      </Box>
    </Pane>
  )
}

export async function call(
  onDone: LocalJSXCommandOnDone,
  context: LocalJSXCommandContext,
): Promise<React.ReactNode> {
  return <MobileQRCode context={context} onDone={onDone} />
}

function getSeedMessages(context: LocalJSXCommandContext): Array<{
  role: 'user' | 'assistant'
  content: string
}> {
  return (context.messages || [])
    .map(message => {
      const role = message?.message?.role
      if (role !== 'user' && role !== 'assistant') return null
      if (message.isMeta || message.isCompactSummary || message.isVirtual) return null
      const content = getContentText(message.message.content)?.trim()
      if (!content) return null
      return { role, content }
    })
    .filter(
      (
        message,
      ): message is {
        role: 'user' | 'assistant'
        content: string
      } => message !== null,
    )
    .slice(-20)
}
