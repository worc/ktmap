import React from 'react'
import UserLocation from './UserLocation'
import NearbyStops from './NearbyStops'
import useUserLocation from '../hooks/useUserLocation'
import useNearbyStops from '../hooks/useNearbyStops'

interface Props {

}

export default function ContextProviders (props: React.PropsWithChildren<Props>) {
  const userLocation = useUserLocation()
  const stops = useNearbyStops(userLocation)

  return (
    <UserLocation.Provider value={userLocation}>
      <NearbyStops.Provider value={stops}>
        {props.children}
      </NearbyStops.Provider>
    </UserLocation.Provider>
  )
}
