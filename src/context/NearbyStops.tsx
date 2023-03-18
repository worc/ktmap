import React from 'react'
import { Stop } from '../types/TrimetApi'

export const defaultValue: Stop[] = []

const NearbyStops = React.createContext<Stop[]>(defaultValue)

export default NearbyStops
