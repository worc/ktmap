import React, { useContext } from 'react'
import styled from 'styled-components'
import { Marker } from 'react-map-gl'
import UserLocation from '../context/UserLocation'

export default function UserMarker () {
  const userLocation = useContext(UserLocation)

  console.log(userLocation.heading)

  return (
    <Marker key="user-location" latitude={userLocation.latitude} longitude={userLocation.longitude} anchor="bottom">
      <User heading={userLocation.heading}/>
    </Marker>
  )
}

interface User {
  readonly heading: number | null,
}

const User = styled.div<User>`
  //height: 25px;
  //width: 25px;
  //border: 4px solid blue;
  //border-radius: 50%;

  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;

  border-bottom: 30px solid blue;
  
  transform: rotate(${props => props.heading ?? 0}deg);
`

// User.defaultProps = {
//   bearing: 0
// }
