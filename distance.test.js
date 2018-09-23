import { assert } from 'chai'
import { flatEarthDistance } from './distance'

describe('flatEarthDistance', () => {
    it('turns lat/long objects into a distance', () => {
        const busStopOnHawthorneAnd27th = {
            longitude: -122.637997792068,
            latitude: 45.5121391578243,
        }

        const salmonStreetHouse = {
            longitude: -122.63752389999999,
            latitude: 45.514203699999996
        }
        
        const distance = flatEarthDistance(salmonStreetHouse, busStopOnHawthorneAnd27th)

        console.log(distance)
        // bus stop is approximately 230 meters away according to google maps
        const acceptableDelta = 23 // 10% error is big but fine when just sanity checking theflat earth distance
        assert.approximately(distance, 230, acceptableDelta, `distance--${ distance }--was not within 10% of expected`)
    })
})
