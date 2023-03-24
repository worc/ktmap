// Tried to implement a Kalman filter in this hook: https://stackoverflow.com/a/15657798/769780

import { useState, useEffect } from 'react'
import PORTLANDIA from '../portlandia'

const MINIMUM_ACCURACY = 1
const DECAY = 15 // in meters per second

export default (initialPosition = PORTLANDIA) => {
  const [lastTimestamp, setLastTimestamp] = useState(Date.now())
  const [userLocation, setUserLocation] = useState(initialPosition)
  const [variance, setVariance] = useState(1)
  const [lastKnownHeading, setLastKnownHeading] = useState(0)

  function setCurrentPosition (position: GeolocationPosition) {
    const now = Date.now()
    const timeElapsed = now - lastTimestamp
    const currentVariance = variance + (timeElapsed * DECAY * DECAY) / 1000
    const accuracy = Math.max(userLocation.accuracy ?? 0, MINIMUM_ACCURACY)

    const K = currentVariance / (currentVariance + accuracy * accuracy)
    const newVariance = (1 - K) * currentVariance

    const latitude = userLocation.latitude + K * (position.coords.latitude - userLocation.latitude)
    const longitude = userLocation.longitude + K * (position.coords.longitude - userLocation.longitude)

    const speed = position.coords.speed
    const heading = position.coords.heading ?? lastKnownHeading

    setLastTimestamp(now)

    setVariance(newVariance)

    setLastKnownHeading(heading)

    setUserLocation({
      ...userLocation,
      accuracy: position.coords.accuracy,
      altitude: position.coords.altitude,
      heading,
      latitude,
      longitude,
      unit: 'DEGREES',
    })
  }

  function handleError (error: GeolocationPositionError) {
    console.error(error.message)
  }

  useEffect(() => {
    const watch = navigator.geolocation.watchPosition(setCurrentPosition, handleError, {
      maximumAge: 1000,
      enableHighAccuracy: true,
    })

    return () => navigator.geolocation.clearWatch(watch)
  }, [])

  return userLocation
}
