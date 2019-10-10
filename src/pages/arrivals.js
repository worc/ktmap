import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Arrival from '../arrival'
import { flatEarthDistance } from "../distance"
import { walkingTimeEstimator } from "../walking_time"

export default class Arrivals extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nextArrivals: [],
            stopLocation: {},
            userLocation: {},
        }
    }

    componentDidMount() {
        const appId = '5C3A497B4A51A9E15E3D97D4A'
        const stopId = this.props.match.params.stopId

        navigator.geolocation.getCurrentPosition(position => {
            const userLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
            this.setState({
                userLocation,
            })
        })

        axios({
            method: 'GET',
            url: `https://developer.trimet.org/ws/v2/arrivals?locIDs=${ stopId }&appId=${ appId }`
        }).then(response => {
            console.log(response)
            this.setState({
                nextArrivals: response.data.resultSet.arrival,
                stopLocation: response.data.resultSet.location[0],
            })
        })
    }

    render() {
        const stopLocation = this.state.stopLocation
        const userLocation = this.state.userLocation
        const distance =  Math.trunc(flatEarthDistance(userLocation, { latitude: stopLocation.lat, longitude: stopLocation.lng }))

        return (
            <ArrivalsContainer>
                <h1>#{ stopLocation.id }, { stopLocation.desc }, { stopLocation.dir }</h1>
                <div>
                    distance: { distance }m, about a { walkingTimeEstimator(distance) } minute walk
                </div>
                { this.state.nextArrivals.map(arrival => <Arrival key={ arrival.tripID } location={ this.state.stopLocation } arrival={ arrival } />) }
            </ArrivalsContainer>
        )
    }
}

const ArrivalsContainer = styled.div`
    margin-bottom: 15px;
`
