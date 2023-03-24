import React, { useContext } from 'react'
import { Marker } from 'react-map-gl'
import NearbyStops from '../context/NearbyStops'
import Stop from '../components/Stop'
import NextArrivals from '../context/NextArrivals'

export default function NearbyStopMarkers () {
  const stops = useContext(NearbyStops)
  const { setShow, setStopId } = useContext(NextArrivals)

  function handleClick (stopId: number) {
    setShow(true)
    setStopId(stopId)
  }

  return (
    <>
      { stops.map(stop => (
        <Marker key={stop.locid} latitude={stop.lat} longitude={stop.lng} anchor="top" onClick={() => handleClick(stop.locid)}>
          <Stop {...stop } />
        </Marker>
      ))}
    </>
  )
}

