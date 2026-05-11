import { useEffect, useState } from 'react'
import {
  type AstroAILimits,
  currentLimits,
  statusListeners,
} from './astroAiLimits.js'

export function useAstroAiLimits(): AstroAILimits {
  const [limits, setLimits] = useState<AstroAILimits>({ ...currentLimits })

  useEffect(() => {
    const listener = (newLimits: AstroAILimits) => {
      setLimits({ ...newLimits })
    }
    statusListeners.add(listener)

    return () => {
      statusListeners.delete(listener)
    }
  }, [])

  return limits
}
