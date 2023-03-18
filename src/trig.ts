interface LatLng {
  latitude: number,
  longitude: number,
}

const toRadians = (degree: number) => degree * Math.PI / 180

export const pairToRadians = ({ latitude, longitude }: LatLng) => ({ latitude: toRadians(latitude), longitude: toRadians(longitude) })

export const toDegrees = (radian: number) => radian * 180 / Math.PI