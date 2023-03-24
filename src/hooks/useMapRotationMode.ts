import { useState } from 'react'
import { RotationMode } from '../types/RotationMode'

// explicit return type here otherwise Typescript is "helpful"
// and coerces a type narrowing on RotationMode it seems
export default function useMapRotationMode (): [RotationMode, () => void] {
  const [mode, setMode] = useState<RotationMode>('user')

  function toggle () {
    if (mode === 'map') {
      setMode('user')
    } else {
      setMode('map')
    }
  }

  return [mode, toggle]
}
