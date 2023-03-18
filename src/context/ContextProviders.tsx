import React from 'react'
import UserLocation from './UserLocation'
import useUserLocation from '../hooks/useUserLocation'

interface Props {

}

export default function ContextProviders (props: React.PropsWithChildren<Props>) {
  const userLocation = useUserLocation()

  return (
    <UserLocation.Provider value={userLocation}>
      {props.children}
    </UserLocation.Provider>
  )
}
