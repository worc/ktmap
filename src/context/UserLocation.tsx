import React from 'react'
import PORTLANDIA from '../portlandia'
import { DecimalCoordinates } from '../types/Coordinates'

export const defaultValue = PORTLANDIA

const UserLocation = React.createContext<DecimalCoordinates>(defaultValue)

export default UserLocation
