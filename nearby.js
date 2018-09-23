import React from 'react'
import axios from 'axios'

import Stop from './stop'

// todo poll location, update if it's a significant enough difference from previous position
// todo also eventually and time out anyways after 15 seconds or so
export default class Nearby extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            latitude: 0,
            longitude: 0,
            stops: []
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position)
            this.fetchStops(position.coords)
            this.setState({ 
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        })
    }

    fetchStops({ latitude, longitude }) {
        const longLatQuery = `ll=${ longitude },${ latitude }`
        const distance = 5280 / 4 // quarter mile
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
            <div>
                <h1>NEARBY!</h1>
                { this.state.stops.map(stop => <Stop key={ stop.locid } stop={ stop } /> )}
            </div>
        )
    }
}
