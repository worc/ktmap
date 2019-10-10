import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Stop from '../stop'

const appId = '5C3A497B4A51A9E15E3D97D4A'

// maximum distance in feet to search for stops
const distanceAway = 5280 / 2 // half mile

// todo poll location, update if it's a significant enough difference from previous position
// todo also eventually and time out anyways after 15 seconds or so
export default () => {
    const [userLocation, setUserLocation] = useState({})
    const [stops, setStops] = useState([])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setUserLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            })
        })
    }, [])

    useEffect(() => {
        if (userLocation.latitude && userLocation.longitude) {
            const longLatQuery = `ll=${userLocation.longitude},${userLocation.latitude}`
            axios({
                method: 'GET',
                url: `https://developer.trimet.org/ws/V1/stops?${ longLatQuery }&feet=${ distanceAway }&json=true&appId=${ appId }`,
            }).then(response => {
                setStops(response.data.resultSet.location)
            })
        }
    },[userLocation])

    return (
        <>
            { stops.map(stop => <Stop key={ stop.locid } stop={ stop } userLocation={ userLocation } /> )}
        </>
    )
}
