import { useState, useEffect } from 'react'
import { throttle } from 'lodash'

export default function useOrientation (invertAlpha = true) {
  const [absoluteOrientation, setAbsoluteOrientation] = useState<Partial<DeviceOrientationEvent>>()
  function handleAbsoluteOrientation(event: DeviceOrientationEvent) {
    setAbsoluteOrientation({
      absolute: event.absolute,
      alpha: invertAlpha ? -1 * (event.alpha ?? 0) : event.alpha,
      beta: event.beta,
      gamma: event.gamma,
    })
  }

  useEffect(() => {
    // @ts-ignore
    window.addEventListener('deviceorientationabsolute', throttle(handleAbsoluteOrientation, 33))
  }, [])

  return absoluteOrientation
}
