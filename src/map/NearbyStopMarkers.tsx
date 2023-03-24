import React, { useContext } from 'react'
import { Marker } from 'react-map-gl'
import NearbyStops from '../context/NearbyStops'
import Stop from '../components/Stop'

export default function NearbyStopMarkers () {
  const stops = useContext(NearbyStops)

  return (
    <>
      { stops.map(stop => (
        <Marker key={stop.locid} latitude={stop.lat} longitude={stop.lng} anchor="top">
          <Stop {...stop } />
        </Marker>
      ))}
    </>
  )
}

