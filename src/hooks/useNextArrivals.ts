import { useState, useEffect } from 'react'
import axios from 'axios'
import { Arrival, Arrivals, ArrivalStop } from '../types/TrimetApi'

const appId = '5C3A497B4A51A9E15E3D97D4A'
export default function useNextArrivals (): [ArrivalStop, (id: number) => void, Arrival[]] {
  const [stopId, setStopId] = useState<number | null>(null)
  const [nextArrivals, setNextArrivals] = useState<Arrival[]>([])
  const [stopLocations, setStopLocations] = useState<ArrivalStop[]>([])

  useEffect(() => {
    if (stopId && appId) {
      axios.get<Arrivals>(`https://developer.trimet.org/ws/v2/arrivals?locIDs=${ stopId }&appId=${ appId }`)
        .then(response => {
          setNextArrivals(response.data.resultSet.arrival)
          setStopLocations(response.data.resultSet.location)
        })
    }
  }, [stopId])

  return [stopLocations[0], setStopId, nextArrivals]
}
