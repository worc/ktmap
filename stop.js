import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default ({ stop }) => {
    const fields = Object.keys(stop)
    const stopUrl = `/arrivals/${ stop.locid }`

    return (
        <Link to={ stopUrl }>
            <StopInformation>
                { fields.map(field => <div key={ field }>{ field }: { stop[field] }</div> )}
            </StopInformation>
        </Link>
    )
}

const StopInformation = styled.div`
    margin-top: 10px;
`