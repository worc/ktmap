import React, { useContext } from 'react'
import styled from 'styled-components'
import { Marker } from 'react-map-gl'
import UserLocation from '../context/UserLocation'

export default function UserMarker () {
  const userLocation = useContext(UserLocation)

  return (
    <Marker key="user-location" latitude={userLocation.latitude} longitude={userLocation.longitude} anchor="bottom">
      <User/>
    </Marker>
  )
}

const User = styled.div`
  height: 25px;
  width: 25px;
  border: 4px solid blue;
  border-radius: 50%;
`
