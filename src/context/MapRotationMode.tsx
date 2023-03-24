import React from 'react'
import { RotationMode } from '../types/RotationMode'

interface IMapRotationMode {
  mode: RotationMode,
  toggle: () => void,
}

const defaultValue: IMapRotationMode = {
  mode: 'map',
  toggle: () => {},
}

const MapRotationMode = React.createContext<IMapRotationMode>(defaultValue)

export default MapRotationMode
