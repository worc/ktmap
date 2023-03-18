export interface Coordinates {
  altitude?: number,
  heading?: number,
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
