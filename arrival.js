import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

export default ({ arrival }) => {
    const fields = Object.keys(arrival)
    const scheduled = moment(arrival.scheduled)
    const estimated = moment(arrival.estimated)
    const omitPrefix = true

    return (
        <ArrivalGroup>
            <div>estimated arrival:</div>
            <div>{ estimated.fromNow(omitPrefix) } from now at { estimated.format('LT') }</div>
            <div>scheduled arrival:</div>
            <div>{ scheduled.fromNow(omitPrefix) } from now at { scheduled.format('LT') }</div>        
            { fields.map(field => <div key={ field } >{ field }: { arrival[field].toString() }</div>) }
        </ArrivalGroup>
    )
}

const ArrivalGroup = styled.div`
    margin-top: 10px;
`