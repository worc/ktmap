import React, { useContext } from 'react'
import styled from 'styled-components'
import { Marker } from 'react-map-gl'
import NearbyStops from '../context/NearbyStops'

export default function NearbyStopMarkers () {
  const stops = useContext(NearbyStops)

  // debugger

  return (
    <>
      { stops.map(stop => (
        <Marker key={stop.locid} latitude={stop.lat} longitude={stop.lng} anchor="bottom">
          <Stop/>
        </Marker>
      ))}
    </>
  )
}

const Stop = styled.div`
  height: 25px;
  width: 25px;
  border: 4px solid red;
  border-radius: 50%;
`
