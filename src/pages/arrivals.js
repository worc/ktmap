import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Arrival from '../arrival'
import { flatEarthDistance } from "../distance"
import { walkingTimeEstimator } from "../walking_time"

const appId = '5C3A497B4A51A9E15E3D97D4A'

const PORTLANDIA = {
    latitude: 45.515790,
    longitude: -122.679042,
}

export default ({ match }) => {
    const [nextArrivals, setNextArrivals] = useState([])
    const [stopLocation, setStopLocation] = useState({})
    const [userLocation, setUserLocation] = useState(PORTLANDIA)
    const [distance, setDistance] = useState(null)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setUserLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            })
        })
    }, [])

    useEffect(() => {
        debugger
        setDistance(Math.trunc(flatEarthDistance(userLocation, { latitude: stopLocation.lat, longitude: stopLocation.lng })))
    }, [userLocation, stopLocation])

    useEffect(() => {
        axios({
            method: 'GET',
            url: `https://developer.trimet.org/ws/v2/arrivals?locIDs=${ match.params.stopId }&appId=${ appId }`
        }).then(response => {
            setNextArrivals(response.data.resultSet.arrival)
            setStopLocation(response.data.resultSet.location[0])
        })
    }, [])

    return (
        <ArrivalsContainer>
            <h1>#{ stopLocation.id }, { stopLocation.desc }, { stopLocation.dir }</h1>
            <div>
                distance: { distance }m, about a { walkingTimeEstimator(distance) } minute walk
            </div>
            { nextArrivals
                ? nextArrivals.map(arrival => <Arrival key={ arrival.tripID } location={ stopLocation } arrival={ arrival } />)
                : null
            }
        </ArrivalsContainer>
    )
}

const ArrivalsContainer = styled.div`
    margin-bottom: 15px;
`
