import React from 'react'
import { Arrival, ArrivalStop } from '../types/TrimetApi'

interface NextArrivals {
  nextArrivals: Arrival[]
  setStopId: (id: number) => void,
  stop?: ArrivalStop,
  show: boolean,
  setShow: (show: boolean) => void,
}

const defaultValue = {
  nextArrivals: [],
  setStopId: () => undefined,
  stop: undefined,
  show: false,
  setShow: () => undefined,
}

const NextArrivals = React.createContext<NextArrivals>(defaultValue)

export default NextArrivals
