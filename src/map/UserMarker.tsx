import React, { useContext } from 'react'
import styled from 'styled-components'
import { Marker } from 'react-map-gl'
import UserLocation from '../context/UserLocation'
import MapRotationMode from '../context/MapRotationMode'
import useOrientation from '../hooks/useOrientation'

export default function UserMarker () {
  const userLocation = useContext(UserLocation)
  const { mode, toggle } = useContext(MapRotationMode)
  const absoluteOrientation = useOrientation()

  const bearing = mode === 'map' ? 0 : absoluteOrientation?.alpha ?? userLocation.heading ?? 0
  const dashed = mode === 'user'

  console.log(userLocation.heading)

  return (
    <Marker
      anchor="bottom"
      key="user-location"
      latitude={userLocation.latitude}
      longitude={userLocation.longitude}
      onClick={toggle}
      pitchAlignment="map"
      rotation={bearing}
    >
      <User dashed={dashed}/>
    </Marker>
  )
}

interface User {
  readonly dashed: boolean,
}

const User = styled.div<User>`
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;

  border-bottom: 30px solid #084c8d;
  
  &:after {
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 15px solid white;
    content: '';
    position: absolute;
    top: 9px;
    left: 5px;
  }
`
