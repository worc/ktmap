import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

export default ({ arrival }) => {
    // const fields = Object.keys(arrival)
    const scheduled = moment(arrival.scheduled)
    const estimated = moment(arrival.estimated)

    return (
        <ArrivalGroup>
            <h2>Route: { arrival.route }, { estimated.fromNow() } at { estimated.format('LT') }</h2>
            <Scheduled>scheduled: { scheduled.fromNow() } at { scheduled.format('LT') }</Scheduled>
            {/*{ fields.map(field => <div key={ field } >{ field }: { arrival[field] ? arrival[field].toString() : null }</div>) }*/}
        </ArrivalGroup>
    )
}

const ArrivalGroup = styled.div`
    margin-top: 10px;
`

const Scheduled = styled.div`
    font-style: italic;
    margin-top: -52px;
`
