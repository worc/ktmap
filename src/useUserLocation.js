import React, { useState, useEffect } from 'react'
import PORTLANDIA from './portlandia'

export default (initialPostion = PORTLANDIA) => {
    const [userLocation, setUserLocation] = useState(initialPostion)

    function getCurrentPosition () {
        navigator.geolocation.getCurrentPosition(position => {
            setUserLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            })
        })
    }

    useEffect(() => {
        const interval = setInterval(getCurrentPosition, 5000)
        return () => clearInterval(interval)
    })

    return userLocation
}
