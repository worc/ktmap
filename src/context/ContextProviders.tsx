import React, { useState } from 'react'
import UserLocation from './UserLocation'
import MapRotationMode from './MapRotationMode'
import NearbyStops from './NearbyStops'
import NextArrivals from './NextArrivals'
import useUserLocation from '../hooks/useUserLocation'
import useMapRotationMode from '../hooks/useMapRotationMode'
import useNearbyStops from '../hooks/useNearbyStops'
import useNextArrivals from '../hooks/useNextArrivals'

interface Props {

}

export default function ContextProviders (props: React.PropsWithChildren<Props>) {
  const userLocation = useUserLocation()
  const stops = useNearbyStops(userLocation)
  const [mode, toggle] = useMapRotationMode()
  const [stop, setStopId, nextArrivals] = useNextArrivals()
  const [showNextArrivals, setShowNextArrivals] = useState(false)

  return (
    <UserLocation.Provider value={userLocation}>
      <NearbyStops.Provider value={stops}>
        <MapRotationMode.Provider value={{ mode, toggle }}>
          <NextArrivals.Provider value={{ stop, setStopId, nextArrivals, show: showNextArrivals, setShow: setShowNextArrivals}}>
            {props.children}
          </NextArrivals.Provider>
        </MapRotationMode.Provider>
      </NearbyStops.Provider>
    </UserLocation.Provider>
  )
}
