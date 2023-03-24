import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import UserLocation from './context/UserLocation'
import MapRotationMode from './context/MapRotationMode'

export default function Debug () {
  const userLocation = useContext(UserLocation)
  const [orientation, setOrientation] = useState<DeviceOrientationEvent>()
  const [absoluteOrientation, setAbsoluteOrientation] = useState<DeviceOrientationEvent>()
  const { mode, toggle } = useContext(MapRotationMode)

  function handleOrientation(event: DeviceOrientationEvent) {
    console.log('orientation', event)
    setOrientation(event)
  }

  function handleAbsoluteOrientation(event: DeviceOrientationEvent) {
    console.log('absolute orientation', event)
    setAbsoluteOrientation(event)
  }

  useEffect(() => {
    window.addEventListener('deviceorientation', handleOrientation)
    // @ts-ignore
    window.addEventListener('deviceorientationabsolute', handleAbsoluteOrientation)
  }, [])

  return (
    <Container onClick={toggle}>
      <div>altitude: { userLocation.altitude }</div>
      <div>heading: { userLocation.heading }</div>
      <div>latitude: { userLocation.latitude }</div>
      <div>longitude: { userLocation.longitude }</div>
      <hr/>
      <div>absolute: { orientation?.absolute ? 'true' : 'false' }</div>
      <div>x: { orientation?.alpha ?? null }</div>
      <div>y: { orientation?.beta ?? null }</div>
      <div>z: { orientation?.gamma ?? null }</div>
      <hr/>
      <div>absolute: { absoluteOrientation?.absolute ? 'true' : 'false'}</div>
      <div>x: { absoluteOrientation?.alpha ?? null }</div>
      <div>y: { absoluteOrientation?.beta ?? null }</div>
      <div>z: { absoluteOrientation?.gamma ?? null }</div>
      <hr/>
      <div>Map Rotation Mode: { mode }</div>
    </Container>
  )
}

const Container = styled.div`
  display: block;
  position: relative;
  z-index: 100;
`