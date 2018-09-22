import React from 'react'
import styled from 'styled-components'

export default ({ arrival }) => {
    const fields = Object.keys(arrival)
    return (
        <ArrivalGroup>
            { fields.map(field => <div key={ field } >{ field }: { arrival[field].toString() }</div>) }
        </ArrivalGroup>
    )
}

const ArrivalGroup = styled.div`
    margin-top: 10px;
`