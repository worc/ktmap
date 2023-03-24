import React from 'react'
import UserLocation from './UserLocation'
import MapRotationMode from './MapRotationMode'
import NearbyStops from './NearbyStops'
import useUserLocation from '../hooks/useUserLocation'
import useMapRotationMode from '../hooks/useMapRotationMode'
import useNearbyStops from '../hooks/useNearbyStops'

interface Props {

}

export default function ContextProviders (props: React.PropsWithChildren<Props>) {
  const userLocation = useUserLocation()
  const stops = useNearbyStops(userLocation)
  const [mode, toggle] = useMapRotationMode()

  return (
    <UserLocation.Provider value={userLocation}>
      <NearbyStops.Provider value={stops}>
        <MapRotationMode.Provider value={{ mode, toggle }}>
          {props.children}
        </MapRotationMode.Provider>
      </NearbyStops.Provider>
    </UserLocation.Provider>
  )
}
