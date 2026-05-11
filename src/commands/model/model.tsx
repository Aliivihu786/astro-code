import * as React from 'react'
import { Box, Text } from '../../ink.js'
import type {
  LocalJSXCommandContext,
  LocalJSXCommandOnDone,
} from '../../types/command.js'
import type { ToolUseContext } from '../../Tool.js'
import { Select } from '../../components/CustomSelect/index.js'
import { Pane } from '../../components/design-system/Pane.js'
import {
  formatModelProfileStatus,
  getDisplayModelProfile,
  isModelProfile,
  MODEL_PROFILES,
} from '../../utils/model/profiles.js'
import {
  formatProviderModelChoices,
  getActiveProviderId,
  getAvailableProviderModels,
  getProviderModels,
  setProviderModel,
} from '../../utils/providerSetup.js'

const CUSTOM_MODEL_VALUE = '__custom_model__'

type CommandContext = ToolUseContext & LocalJSXCommandContext

type ModelPickerProps = {
  context: CommandContext
  currentModel: string | undefined
  models: string[]
  onDone: LocalJSXCommandOnDone
  providerName: string
}

function applyModelToState(context: CommandContext, nextModel: string): void {
  context.setAppState(prev => ({
    ...prev,
    mainLoopModel: nextModel,
    mainLoopModelForSession: null,
  }))
}

async function changeProviderModel(
  context: CommandContext,
  onDone: LocalJSXCommandOnDone,
  model: string,
): Promise<void> {
  try {
    const nextModel = await setProviderModel(model)
    applyModelToState(context, nextModel)
    onDone(`Model changed to ${nextModel}`, { display: 'system' })
  } catch (error) {
    onDone(error instanceof Error ? error.message : String(error), {
      display: 'system',
    })
  }
}

function ModelPicker({
  context,
  currentModel,
  models,
  onDone,
  providerName,
}: ModelPickerProps): React.ReactNode {
  const [customModel, setCustomModel] = React.useState('')
  const [isChanging, setIsChanging] = React.useState(false)

  const options = React.useMemo(
    () => [
      ...models.map(model => ({
        label: model === currentModel ? `${model} (current)` : model,
        value: model,
      })),
      {
        type: 'input' as const,
        label: 'Custom model',
        value: CUSTOM_MODEL_VALUE,
        placeholder: 'enter model id',
        initialValue: '',
        onChange: setCustomModel,
        showLabelWithValue: true,
        labelValueSeparator: ': ',
      },
    ],
    [currentModel, models],
  )

  async function onSelect(value: string): Promise<void> {
    if (isChanging) return
    const selectedModel =
      value === CUSTOM_MODEL_VALUE ? customModel.trim() : value.trim()

    if (!selectedModel) {
      onDone('Model is required.', { display: 'system' })
      return
    }

    setIsChanging(true)
    await changeProviderModel(context, onDone, selectedModel)
  }

  return (
    <Pane color="permission">
      <Box flexDirection="column" gap={1}>
        <Box flexDirection="column">
          <Text bold>Select model</Text>
          <Text dimColor>
            Provider: {providerName}
            {currentModel ? ` | Current: ${currentModel}` : ''}
          </Text>
        </Box>
        <Select
          defaultFocusValue={currentModel}
          defaultValue={currentModel}
          isDisabled={isChanging}
          layout="compact-vertical"
          options={options}
          visibleOptionCount={Math.min(Math.max(options.length, 5), 12)}
          onChange={value => void onSelect(value)}
          onCancel={() =>
            onDone('Model selection cancelled', { display: 'system' })
          }
        />
      </Box>
    </Pane>
  )
}

async function showCurrent(
  onDone: LocalJSXCommandOnDone,
  context: CommandContext,
): Promise<void> {
  const state = context.getAppState()
  const active = getDisplayModelProfile(
    state.mainLoopModelForSession ?? state.mainLoopModel,
  )
  const providerChoices = await formatProviderModelChoices()
  onDone(`${formatModelProfileStatus(active)}\n\n${providerChoices}`, {
    display: 'system',
  })
}

async function applyArgument(
  onDone: LocalJSXCommandOnDone,
  context: CommandContext,
  rawRequested: string,
): Promise<void> {
  const requested = rawRequested.toLowerCase()
  const providerModels = await getAvailableProviderModels()
  const staticProviderModels = getProviderModels(getActiveProviderId())
  const providerModel = requested.startsWith('custom ')
    ? rawRequested.slice('custom '.length).trim()
    : rawRequested

  if (
    providerModels.includes(providerModel) ||
    requested.startsWith('custom ') ||
    staticProviderModels.length === 0
  ) {
    await changeProviderModel(context, onDone, providerModel)
    return
  }

  if (isModelProfile(requested)) {
    context.setAppState(prev => ({
      ...prev,
      mainLoopModel: requested === 'default' ? null : requested,
      mainLoopModelForSession: null,
    }))

    onDone(`Model profile set to ${requested}`, { display: 'system' })
    return
  }

  const providerChoices = await formatProviderModelChoices()
  onDone(
    `Unknown model '${rawRequested}'.\n\n${providerChoices}\nProfiles: ${MODEL_PROFILES.join(', ')}`,
    { display: 'system' },
  )
}

export async function call(
  onDone: LocalJSXCommandOnDone,
  context: CommandContext,
  args?: string,
): Promise<React.ReactNode> {
  const rawRequested = args?.trim() ?? ''
  const requested = rawRequested.toLowerCase()

  if (requested === 'current' || requested === 'status' || requested === 'list') {
    await showCurrent(onDone, context)
    return null
  }

  if (rawRequested) {
    await applyArgument(onDone, context, rawRequested)
    return null
  }

  const provider = getActiveProviderId()
  const providerName = process.env.AGENT_PROVIDER_NAME || provider || ''
  if (!provider || !providerName) {
    onDone('No provider configured. Restart Agent CLI and complete provider setup.', {
      display: 'system',
    })
    return null
  }

  const models = await getAvailableProviderModels()
  if (models.length === 0) {
    onDone('No models found for this provider. Use /model custom <model>.', {
      display: 'system',
    })
    return null
  }

  return (
    <ModelPicker
      context={context}
      currentModel={process.env.AGENT_MODEL || process.env.ANTHROPIC_MODEL}
      models={models}
      onDone={onDone}
      providerName={providerName}
    />
  )
}
