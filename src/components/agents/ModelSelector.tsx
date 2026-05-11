import * as React from 'react'
import { Box, Text } from '../../ink.js'
import {
  getActiveProviderId,
  getAvailableProviderModels,
} from '../../utils/providerSetup.js'
import { Select } from '../CustomSelect/select.js'

interface ModelSelectorProps {
  initialModel?: string
  onComplete: (model?: string) => void
  onCancel?: () => void
}

const CUSTOM_MODEL_VALUE = '__custom_model__'

export function ModelSelector({
  initialModel,
  onComplete,
  onCancel,
}: ModelSelectorProps): React.ReactNode {
  const [customModel, setCustomModel] = React.useState('')
  const [providerModels, setProviderModels] = React.useState<string[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [loadError, setLoadError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let cancelled = false

    getAvailableProviderModels()
      .then(models => {
        if (cancelled) return
        setProviderModels(models)
        setLoadError(null)
      })
      .catch(error => {
        if (cancelled) return
        setProviderModels([])
        setLoadError(error instanceof Error ? error.message : String(error))
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const currentProviderModel = process.env.AGENT_MODEL || process.env.ANTHROPIC_MODEL
  const provider = getActiveProviderId()
  const providerName = process.env.AGENT_PROVIDER_NAME || provider || 'provider'

  const modelOptions = React.useMemo(() => {
    const values = Array.from(
      new Set([
        ...(currentProviderModel ? [currentProviderModel] : []),
        ...providerModels,
        ...(initialModel && initialModel !== 'inherit' ? [initialModel] : []),
      ]),
    )

    return [
      {
        value: 'inherit',
        label: 'Inherit from parent',
        description: currentProviderModel
          ? `Use current conversation model: ${currentProviderModel}`
          : 'Use the same model as the main conversation',
      },
      ...values.map(model => ({
        value: model,
        label: model === currentProviderModel ? `${model} (current)` : model,
        description:
          model === initialModel && model !== currentProviderModel
            ? 'Current agent model'
            : `${providerName} model`,
      })),
      {
        type: 'input' as const,
        value: CUSTOM_MODEL_VALUE,
        label: 'Custom model',
        placeholder: 'enter model id',
        initialValue: '',
        onChange: setCustomModel,
        showLabelWithValue: true,
        labelValueSeparator: ': ',
      },
    ]
  }, [currentProviderModel, initialModel, providerModels, providerName])

  const defaultModel = initialModel ?? 'inherit'

  function complete(value: string): void {
    const selectedModel =
      value === CUSTOM_MODEL_VALUE ? customModel.trim() : value.trim()
    if (!selectedModel) {
      onComplete(undefined)
      return
    }
    onComplete(selectedModel === 'inherit' ? undefined : selectedModel)
  }

  return (
    <Box flexDirection="column">
      <Box marginBottom={1} flexDirection="column">
        <Text dimColor>
          Select a model from {providerName}. Inherit uses the current
          conversation model.
        </Text>
        {isLoading ? <Text dimColor>Loading provider models...</Text> : null}
        {loadError ? <Text color="warning">{loadError}</Text> : null}
      </Box>
      <Select
        options={modelOptions}
        defaultValue={defaultModel}
        defaultFocusValue={defaultModel}
        visibleOptionCount={Math.min(Math.max(modelOptions.length, 5), 12)}
        layout="compact-vertical"
        onChange={complete}
        onCancel={() => (onCancel ? onCancel() : onComplete(undefined))}
      />
    </Box>
  )
}
