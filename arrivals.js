import React from 'react'
import axios from 'axios'

export default class Arrivals extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nextArrivals: []
        }
    }

    componentDidMount() {
        const appId = '5C3A497B4A51A9E15E3D97D4A'
        const stopId = this.props.match.params.stopId
        axios({
            method: 'GET',
            url: `https://developer.trimet.org/ws/v2/arrivals?locIDs=${ stopId }&appId=${ appId }`
        }).then(response => {
            console.log(response)
            this.setState({ nextArrivals: response.data.resultSet.arrival })
        })
    }

    render() {
        const stopId = this.props.match.params.stopId

        return (
            <div>
                <h1>ARRIVALS!</h1>
                <div>{ stopId }</div>
                { this.state.nextArrivals.map(arrival => <div key={ arrival.tripID }>{ arrival.shortSign }</div>) }
            </div>
        )
    }
}
