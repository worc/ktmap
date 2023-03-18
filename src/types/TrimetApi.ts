interface TrimetResponse<T> {
  arrival?: unknown[],
  detour?: unknown[],
  resultSet: {
    location: Array<T>
  }
  queryTime: string,
}

export interface Stop {
  lat: number,
  lng: number,
  metersDistance: number,
  feetDistance: number,
  dir: string,
  locid: number,
  desc: string,
}

export interface NearbyStops extends TrimetResponse<Stop> {}

// export interface Arrival {
//   lat: number,
//   lng: number,
//   passengerCode: string,
//   id: number,
//   dir: string,
//   desc: string,
// }
//
// export interface Arrivals extends TrimetResponse<Arrival> {
//
// }