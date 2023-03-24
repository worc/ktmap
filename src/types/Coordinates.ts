export interface Coordinates {
  accuracy: number | null,
  altitude: number | null,
  heading: number | null,
  latitude: number,
  longitude: number,
  unit?: 'DEGREES' | 'RADIANS',
}

export interface DecimalCoordinates extends Coordinates {
  unit: 'DEGREES',
}

export interface RadianCoordinates extends Coordinates {
  unit: 'RADIANS',
}
