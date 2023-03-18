import { describe, test } from '@jest/globals'
import { assert } from 'chai'
import { flatEarthBearingDegreesHeading, flatEarthNamedBearing } from './bearing'

const acceptableDelta = 5
const salmonStreetHouse = {
  longitude: -122.63752389999999,
  latitude: 45.514203699999996
}
const busStopOnMorrisonAnd25th = {
  longitude: -122.640068373575,
  latitude: 45.5168596679043
}
const busStopOnHawthorneAnd25th = {
  longitude: -122.640514520728,
  latitude: 45.5121325229861
}

describe('flatEarthBearingDegreesHeading', () => {
  test('gives a bearing of about 326 degrees from the salmon street house to the bus stop on morrison and 25th', () => {
    const bearing = flatEarthBearingDegreesHeading(salmonStreetHouse, busStopOnMorrisonAnd25th)
    assert.approximately(bearing, 326, acceptableDelta, `bearing--${bearing}--was not within ${ acceptableDelta } degrees`)
  })

  test('gives a bearing of about 225 degrees from the salmon street house to the bus stop on hawthorne and 25th', () => {
    const bearing = flatEarthBearingDegreesHeading(salmonStreetHouse, busStopOnHawthorneAnd25th)
    assert.approximately(bearing, 225, acceptableDelta, `bearing--${bearing}--was not within ${ acceptableDelta } degrees`)
  })
})

describe('flatEarthNamedBearing', () => {
  test('gives a named bearing, nw, from the salmon street house to the bus stop on morrison and 25th', () => {
    const bearing = flatEarthNamedBearing(salmonStreetHouse, busStopOnMorrisonAnd25th)
    assert(bearing, 'nw')
  })

  test('gives a named bearing, sw, from the salmon street house to the bus stop on hawthorne and 25th', () => {
    const bearing = flatEarthNamedBearing(salmonStreetHouse, busStopOnHawthorneAnd25th)
    assert(bearing, 'sw')
  })
})
