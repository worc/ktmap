import { useContext, useEffect, useState } from 'react'
import UserLocation from '../context/UserLocation'
import PORTLANDIA from '../portlandia'
import { flatEarthDistance } from '../util/distance'
import { DecimalCoordinates } from '../types/Coordinates'

function getWindowSize () {
  return {
    height: window.innerHeight,
    width: window.innerWidth,
  }
}

interface Viewport {
  height: number,
  width: number,
  latitude: number,
  longitude: number,
  zoom: number
}

export default function useViewport () {
  const userLocation = useContext(UserLocation)
  const [viewport, setViewport] = useState<Viewport>({
    ...getWindowSize(),
    ...PORTLANDIA,
    zoom: 16,
  })

  useEffect(() => {
    const viewportPosition: DecimalCoordinates = {
      accuracy: null,
      altitude: null,
      heading: null,
      latitude: viewport.latitude,
      longitude: viewport.longitude,
      unit: 'DEGREES',
    }
    const driftDistance = flatEarthDistance(userLocation, viewportPosition)

    if (driftDistance > 50) {
      setViewport({
        ...viewport,
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      })
    }
  }, [userLocation])

  useEffect(() => {
    function handleResize () {
      setViewport({
        ...viewport,
        ...getWindowSize(),
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return viewport
}
