interface TrimetResponse<T> {
  arrival?: unknown[],
  detour?: unknown[],
  resultSet: {
    location: Array<T>
  }
  queryTime: string,
}

// https://developer.trimet.org/schema/schedule.xsd
// https://developer.trimet.org/ws_docs/stop_location_ws.shtml
interface Route {
  desc: string,
  routeColor: string,
  route: number,
  routeSubType: 'Bus' | string,
  type: string,
}

// https://developer.trimet.org/ws_docs/stop_location_ws.shtml
export interface Stop {
  lat: number,
  lng: number,
  metersDistance: number,
  feetDistance: number,
  dir: string,
  locid: number,
  desc: string,
  route?: Route[],
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