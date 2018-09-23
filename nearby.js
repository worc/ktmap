import React from 'react'
import axios from 'axios'

export default class Nearby extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            latitude: 0,
            longitude: 0
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position)
            this.setState({ 
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        })
    }

    componentDidUpdate() {
        const longLatQuery = `ll=${ this.state.longitude },${ this.state.latitude }`
        const distance = 5280 / 4 // quarter mile
        const appId = '5C3A497B4A51A9E15E3D97D4A'

        axios({
            method: 'GET',
            url: `https://developer.trimet.org/ws/V1/stops?${ longLatQuery }&feet=${ distance }&json=true&appId=${ appId }`,
        }).then(response => {
            console.log(response)
        })
    }

    render() {
        return (
            <div>
                <h1>NEARBY!</h1>
            </div>
        )
    }
}
