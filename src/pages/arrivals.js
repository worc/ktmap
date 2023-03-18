import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Arrival from '../arrival'
import { flatEarthDistance } from "../util/distance"
import { walkingTimeEstimator } from "../util/walkingTimeEstimator"
import UserLocation from "../context/UserLocation";

const appId = '5C3A497B4A51A9E15E3D97D4A'

export default ({ match }) => {
    const [nextArrivals, setNextArrivals] = useState([])
    const [stopLocation, setStopLocation] = useState({})
    const [distance, setDistance] = useState(null)
    const userLocation = useContext(UserLocation)

    useEffect(() => {
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
