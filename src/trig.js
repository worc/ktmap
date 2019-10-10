const toRadians = degree => degree * Math.PI / 180

export const pairToRadians = ({ latitude, longitude }) => ({ latitude: toRadians(latitude), longitude: toRadians(longitude) })

export const toDegrees = radian => radian * 180 / Math.PI