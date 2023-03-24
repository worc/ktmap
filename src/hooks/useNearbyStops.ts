import { useState, useEffect } from 'react'
import { DecimalCoordinates } from '../types/Coordinates'
import { flatEarthDistance } from '../util/distance'
import axios from 'axios'
import { NearbyStops, Stop } from '../types/TrimetApi'

const appId = '5C3A497B4A51A9E15E3D97D4A'

// maximum distance in feet to search for stops
const distanceAway = 5280 / 2 // half mile

// todo also eventually timeout the drift and update anyways? 60 seconds?
export default function useNearbyStops (userCoordinates: DecimalCoordinates): Stop[] {
  const [queryLocation, setQueryLocation] = useState(userCoordinates)
  const [stops, setStops] = useState<Stop[]>([])

  useEffect(() => {
    const driftDistance = flatEarthDistance(userCoordinates, queryLocation)

    if (driftDistance > 50) {
      setQueryLocation(userCoordinates)
    }
  }, [userCoordinates])

  useEffect(() => {
    if (queryLocation.latitude && queryLocation.longitude) {
      const longLatQuery = `ll=${queryLocation.longitude},${queryLocation.latitude}`
      axios.get<NearbyStops>(`https://developer.trimet.org/ws/V1/stops?${longLatQuery}&feet=${distanceAway}&json=true&appId=${appId}&showRoutes=true`,)
        .then(response => {
          setStops(response.data.resultSet.location)
        })
    }
  }, [queryLocation])

  return stops
}
