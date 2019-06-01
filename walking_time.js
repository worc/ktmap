const WALKING_SPEED = 1.4 // m/s

/**
 *
 * @param distance - in meters
 * @returns {number}
 */
export function walkingTimeEstimator (distance) {
    return Math.round((distance / WALKING_SPEED) / 60)
}