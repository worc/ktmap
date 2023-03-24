import React from 'react'
import styled from 'styled-components'
import { format, formatDistanceToNow } from 'date-fns'
import { Arrival } from '../types/TrimetApi'

interface Props {
  key: string,
  arrival: Arrival,
}

export default function Arrival (props: Props) {
  const { key, arrival } = props

  const estimatedWait = arrival.estimated ? formatDistanceToNow(arrival.estimated) : null
  const estimatedTime = arrival.estimated ? format(arrival.estimated, 'h:mmaaa') : null
  const estimation = estimatedWait && estimatedTime ? `in ${estimatedWait} at ${estimatedTime}` : 'ETA unavailable'

  const scheduledWait = arrival.scheduled ? formatDistanceToNow(arrival.scheduled) : null
  const scheduledTime = arrival.scheduled ? format(arrival.scheduled, 'h:mmaaa') : null
  const schedule = scheduledWait && scheduledTime ? `in ${scheduledWait} at ${scheduledTime}` : 'No scheduled arrivals'

  return (
    <ArrivalGroup key={key}>
      <Estimated>{ estimation }</Estimated>
      <Scheduled>scheduled: { schedule }</Scheduled>
    </ArrivalGroup>
  )
}

const ArrivalGroup = styled.div`
  margin: 2px 0;
`

const Estimated = styled.div`
  font-size: 14px;
  margin: 0;
`

const Scheduled = styled.div`
  font-style: italic;
  margin: 0;
`
