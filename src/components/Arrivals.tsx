import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import UserLocation from '../context/UserLocation'
import { flatEarthDistance } from '../util/distance'
import { walkingTimeEstimator } from '../util/walkingTimeEstimator'
import Arrival from './Arrival'
import { Arrival as IArrival } from '../types/TrimetApi'
import { DecimalCoordinates } from '../types/Coordinates'
import NextArrivals from '../context/NextArrivals'

export default function Arrivals () {
  const { stop, nextArrivals } = useContext(NextArrivals)
  const [distance, setDistance] = useState(0)
  const userLocation = useContext(UserLocation)
  const [routeArrivalMap, setRouteArrivalMap] = useState<Record<string, IArrival[]>>({})

  useEffect(() => {
    const latitude = stop?.lat
    const longitude = stop?.lng

    if (latitude && longitude) {
      const target: DecimalCoordinates = {
        accuracy: null,
        altitude: null,
        heading: null,
        latitude,
        longitude,
        unit: 'DEGREES',
      }

      setDistance(Math.trunc(flatEarthDistance(userLocation, target)))
    }
  }, [userLocation, stop])

  useEffect(() => {
    let routeArrivalMap: Record<string, IArrival[]> = {}

    nextArrivals.forEach(arrival => {
      const key = `${arrival.route}`
      if (!routeArrivalMap[key]) {
        routeArrivalMap[key] = []

      }
      routeArrivalMap[key].push(arrival)
    })

    console.log(routeArrivalMap)
    setRouteArrivalMap(routeArrivalMap)
  }, [nextArrivals])

  const routes = Object.keys(routeArrivalMap)

  return (
      <ArrivalsContainer>
        <ArrivalsHeader>
          <StopHeader>
            <div>#{ stop?.id }, { stop?.dir }</div>
            <div>{ stop?.desc }</div>
          </StopHeader>
          <div>
            distance: { distance }m, about a { walkingTimeEstimator(distance) } minute walk
          </div>
        </ArrivalsHeader>
        { routes.map(route =>
          <RouteContainer>
            <RouteHeader key={route}>Route: { route }</RouteHeader>
            { routeArrivalMap[route].map(arrival => (
              <Arrival key={arrival.tripID} arrival={arrival} />
            )) }
          </RouteContainer>
        )}
      </ArrivalsContainer>
  )
}

const ArrivalsContainer = styled.div`

`

const ArrivalsHeader = styled.div`
  margin: 0 0 12px 0;
  text-align: justify;
`

const StopHeader = styled.header`
  font-size: 20px;

  > :first-child {
    margin-bottom: 4px;
  }
`

const RouteContainer = styled.div`
  &:not(:last-child) {
    margin: 0 0 8px 0;
  }
`

const RouteHeader = styled.header`
  font-size: 18px;
`