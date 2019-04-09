import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

export default ({ arrival }) => {
    const fields = Object.keys(arrival)
    const scheduled = moment(arrival.scheduled)
    const estimated = moment(arrival.estimated)

    return (
        <ArrivalGroup>
            <h2>Route: { arrival.route }</h2>
            <div>estimated arrival:</div>
            <div>{ estimated.fromNow() } at { estimated.format('LT') }</div>
            <div>scheduled arrival:</div>
            <div>{ scheduled.fromNow() } at { scheduled.format('LT') }</div>
            { fields.map(field => <div key={ field } >{ field }: { arrival[field] ? arrival[field].toString() : null }</div>) }
        </ArrivalGroup>
    )
}

const ArrivalGroup = styled.div`
    margin-top: 10px;
`