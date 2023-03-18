import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import Stop from '../stop'
import UserLocation from "../context/UserLocation";
import {flatEarthDistance} from "../util/distance";

const appId = '5C3A497B4A51A9E15E3D97D4A'

// maximum distance in feet to search for stops
const distanceAway = 5280 / 2 // half mile

// todo also eventually timeout the drift and update anyways? 60 seconds?
export default () => {
  const userLocation = useContext(UserLocation)
  const [queryLocation, setQueryLocation] = useState(userLocation)
  const [stops, setStops] = useState([])

  useEffect(() => {
    const driftDistance = flatEarthDistance(userLocation, queryLocation)

    if (driftDistance > 50) {
      setQueryLocation(userLocation)
    }
  }, [userLocation])

  useEffect(() => {
    if (queryLocation.latitude && queryLocation.longitude) {
      const longLatQuery = `ll=${queryLocation.longitude},${queryLocation.latitude}`
      axios({
        method: 'GET',
        url: `https://developer.trimet.org/ws/V1/stops?${longLatQuery}&feet=${distanceAway}&json=true&appId=${appId}`,
      }).then(response => {
        setStops(response.data.resultSet.location)
      })
    }
  }, [queryLocation])

  return (
    <>
      {stops.map(stop => <Stop key={stop.locid} stop={stop} userLocation={userLocation}/>)}
    </>
  )
}
