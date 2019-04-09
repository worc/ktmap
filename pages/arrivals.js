import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Arrival from '../arrival'

export default class Arrivals extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nextArrivals: [],
            location: {},
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
            this.setState({
                nextArrivals: response.data.resultSet.arrival,
                location: response.data.resultSet.location[0],
            })
        })
    }

    render() {
        const location = this.state.location

        return (
            <ArrivalsContainer>
                <h1>#{ location.id }, { location.desc }, { location.dir }</h1>
                { this.state.nextArrivals.map(arrival => <Arrival key={ arrival.tripID } location={ this.state.location } arrival={ arrival } />) }
            </ArrivalsContainer>
        )
    }
}

const ArrivalsContainer = styled.div`
    margin-bottom: 15px;
`
