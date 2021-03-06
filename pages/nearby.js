import React from 'react'
import axios from 'axios'

import Stop from '../stop'

// todo poll location, update if it's a significant enough difference from previous position
// todo also eventually and time out anyways after 15 seconds or so
export default class Nearby extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userLocation: {
                latitude: 0,
                longitude: 0,
            },
            stops: []
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position)
            this.fetchStops({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                distance: 5280 / 2 // half mile
            })
            const userLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
            this.setState({ 
                userLocation
            })
        })
    }

    fetchStops({ latitude, longitude, distance }) {
        const longLatQuery = `ll=${ longitude },${ latitude }`
        const appId = '5C3A497B4A51A9E15E3D97D4A'

        axios({
            method: 'GET',
            url: `https://developer.trimet.org/ws/V1/stops?${ longLatQuery }&feet=${ distance }&json=true&appId=${ appId }`,
        }).then(response => {
            console.log(response)
            this.setState({ stops: response.data.resultSet.location })
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return (
            <React.Fragment>
                { this.state.stops.map(stop => <Stop key={ stop.locid } stop={ stop } userLocation={ this.state.userLocation } /> )}
            </React.Fragment>
        )
    }
}
