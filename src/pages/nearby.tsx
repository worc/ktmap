import React, { useContext} from 'react'
import Stop from '../stop'
import UserLocation from "../context/UserLocation";
import NearbyStops from '../context/NearbyStops'

export default () => {
  const userLocation = useContext(UserLocation)
  const stops = useContext(NearbyStops)

  return (
    <>
      {stops.map(stop => <Stop key={stop.locid} stop={stop} userLocation={userLocation}/>)}
    </>
  )
}
