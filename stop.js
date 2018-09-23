import React from 'react'
import styled from 'styled-components'

export default ({ stop }) => {
    const fields = Object.keys(stop)

    return (
        <StopInformation>
            { fields.map(field => <div key={ field }>{ field }: { stop[field] }</div> )}
        </StopInformation>
    )
}

const StopInformation = styled.div`
    margin-top: 10px;
`