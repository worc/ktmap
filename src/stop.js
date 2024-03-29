import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { flatEarthDistance } from './util/distance'
import { flatEarthNamedBearing } from './util/bearing'
import { walkingTimeEstimator } from "./util/walkingTimeEstimator";

export default ({ stop, userLocation }) => {
    const stopUrl = `/arrivals/${ stop.locid }`
    const stopLocation = { latitude: stop.lat, longitude: stop.lng }
    const distance = Math.trunc(flatEarthDistance(userLocation, stopLocation))
    const bearing = flatEarthNamedBearing(userLocation, { latitude: stop.lat, longitude: stop.lng })

    return (
        <StyledLink to={ stopUrl }>
            <StopInformation>
                <h2>#{ stop.locid}, { stop.desc }, { stop.dir }</h2>
                <div>distance: { distance }m, about a { walkingTimeEstimator(distance) } minute walk</div>
                <div>bearing: { bearing }</div>
            </StopInformation>
        </StyledLink>
    )
}

const StyledLink = styled(Link)`
  color: #810e0e;
  text-decoration: none;
`

const StopInformation = styled.div`
    margin-top: 20px;
`