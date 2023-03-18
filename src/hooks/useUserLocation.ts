import { useState, useEffect } from 'react'
import PORTLANDIA from '../portlandia'

export default (initialPosition = PORTLANDIA) => {
  const [userLocation, setUserLocation] = useState(initialPosition)

  function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(position => {
      setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        unit: 'DEGREES',
      })
    })
  }

  useEffect(() => {
    const interval = setInterval(getCurrentPosition, 5000)
    return () => clearInterval(interval)
  }, [])

  return userLocation
}
