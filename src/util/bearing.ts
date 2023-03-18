import {EARTH_MEAN_RADIUS} from './earth_mean_radius'
import { pairToRadians, toDegrees } from './trig'

const NORTH = 0
const NORTH_NORTH_EAST = 22.5
const NORTH_EAST = 45
const EAST_NORTH_EAST = 67.5
const EAST = 90
const EAST_SOUTH_EAST = 112.5
const SOUTH_EAST = 135
const SOUTH_SOUTH_EAST = 157.5
const SOUTH = 180
const SOUTH_SOUTH_WEST = 202.5
const SOUTH_WEST = 225
const WEST_SOUTH_WEST = 247.5
const WEST = 270
const WEST_NORTH_WEST = 292.5
const NORTH_WEST = 315
const NORTH_NORTH_WEST = 337.5

const degreesToNamedBearing = (degrees: number) => {
    switch (true) {
        case degrees < NORTH_NORTH_EAST || degrees > NORTH_NORTH_WEST:
            return 'n'
        case degrees > NORTH_NORTH_EAST && degrees < EAST_NORTH_EAST:
            return 'ne'
        case degrees > EAST_NORTH_EAST && degrees < EAST_SOUTH_EAST:
            return 'e'
        case degrees > EAST_SOUTH_EAST && degrees < SOUTH_SOUTH_EAST:
            return 'se'
        case degrees > SOUTH_SOUTH_EAST && degrees < SOUTH_SOUTH_WEST:
            return 's'
        case degrees > SOUTH_SOUTH_WEST && degrees < WEST_SOUTH_WEST:
            return 'sw'
        case degrees > WEST_SOUTH_WEST && degrees < WEST_NORTH_WEST:
            return 'w'
        case degrees > WEST_NORTH_WEST && degrees < NORTH_NORTH_WEST:
            return 'nw'
        default:
            throw new Error(`something has gone horribly wrong with the degrees: ${ degrees } `)
    }
}

const flatEarthBearingRadians = (origin = { latitude: 0, longitude: 0 }, target = { latitude: 0, longitude: 0 }) => {
    const originRadians = pairToRadians(origin)
    const targetRadians = pairToRadians(target)
    const meridianCorrection = Math.cos(targetRadians.latitude) // either latitude here works apparently

    const longitudeDifference = targetRadians.longitude - originRadians.longitude
    const eastWestDifference = EARTH_MEAN_RADIUS * longitudeDifference * meridianCorrection

    const latitudeDifference = targetRadians.latitude - originRadians.latitude
    const northSouthDifference = EARTH_MEAN_RADIUS * latitudeDifference

    console.log('east west', eastWestDifference)
    console.log('north south', northSouthDifference)
    console.log(eastWestDifference / northSouthDifference)

    return Math.atan2(northSouthDifference, eastWestDifference)
}

export const flatEarthBearingDegreesHeading = (origin = { latitude: 0, longitude: 0 }, target = { latitude: 0, longitude: 0 }) => {
    const degreesFromPositiveXAxis = toDegrees(flatEarthBearingRadians(origin, target))

    // converts trig unit-circle degrees to a north-at-zero degrees heading value
    return degreesFromPositiveXAxis > 0
        ? 360 - (degreesFromPositiveXAxis - 90)
        : (-1 * degreesFromPositiveXAxis) + 90
}

export const flatEarthNamedBearing = (origin = { latitude: 0, longitude: 0 }, target = { latitude: 0, longitude: 0 }) => {
    const degreesHeading = flatEarthBearingDegreesHeading(origin, target)
    return degreesToNamedBearing(degreesHeading)
}
