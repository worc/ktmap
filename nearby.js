import React from 'react'
import axios from 'axios'

export default class Nearby extends React.Component {
    componentDidMount() {
        const latitude = '45.512109'
        const longitude = '-122.637136'
        const longLatQuery = `ll=${ longitude },${ latitude }`

        const appId = '5C3A497B4A51A9E15E3D97D4A'
        const distance = 5280 / 4 // quarter mile

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
