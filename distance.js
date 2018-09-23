const EARTH_MEAN_RADIUS = 6371000; // in meters

// haversine formula, treats the earth as a spheroid and gets accurate distance across the globe
// with a maximum of 0.5% error margin
// export default ( origin = { latitude, longitude}, target = { latitude, longitude }) => {
//     const originLatitude = toRadians(origin.latitude)
//     const targetLatitude = toRadians(target.latitude)
//     const latitudeDifference = toRadians(target.latitude - origin.latitude)
//     const longitudeDifference = toRadians(target.longitude - origin.longitude)

//     const arcSin = 
    
//     var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
//             Math.cos(φ1) * Math.cos(φ2) *
//             Math.sin(Δλ/2) * Math.sin(Δλ/2);
//     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
//     var d = R * c;


//     return 'do some math'
// }

// treats lat and long as if they were (x, y) coordinate pairs on a 
// flat plane, includes the cosine correction term to account for 
// longitude distances shrinking as you move away from the equator
export const flatEarthDistance = (origin = { latitude, longitude }, target = { latitude, longitude }) => {
    const originRadians = pairToRadians(origin)
    const targetRadians = pairToRadians(target)
    const meridianCorrection = Math.cos(target.latitude) // either latitude here works apparently
    
    const longitudeDifference = targetRadians.longitude - originRadians.longitude
    const eastWestDifference = EARTH_MEAN_RADIUS * longitudeDifference * meridianCorrection
    
    const latitudeDifference = targetRadians.latitude - originRadians.latitude
    const northSouthDifference = EARTH_MEAN_RADIUS * latitudeDifference

    return Math.sqrt(eastWestDifference * eastWestDifference + northSouthDifference * northSouthDifference)
}

const toRadians = degree => degree * Math.PI / 180
const pairToRadians = ({ latitude, longitude }) => ({ latitude: toRadians(latitude), longitude: toRadians(longitude) })
