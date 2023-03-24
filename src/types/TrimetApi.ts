interface TrimetResponse<T> {
  resultSet: {
    location: Array<T>
    queryTime: string | number,
  }
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

export interface Arrival {
  routeColor: string,
  feet: number,
  inCongestion: boolean,
  departed: boolean,
  scheduled: number,
  loadPercentage: unknown | null,
  shortSign: string,
  estimated: number,
  detoured: boolean,
  tripID: string,
  dir: number,
  blockID: number
  detour: Detour['id'][],
  route: number,
  piece: string,
  fullSign: string,
  id: string,
  dropOffOnly: boolean,
  vehicleID: string,
  showMilesAway: boolean,
  locid: number,
  newTrip: boolean,
  status: string | 'estimated',
}

interface Detour {
  route: Partial<Route>[]
  info_link_url: string | null,
  end: unknown | null,
  system_wide_flag: boolean,
  id: number,
  header_text: string,
  begin: number,
  desc: string,
}

export interface ArrivalStop extends Partial<Stop> {
  lat: number,
  lng: number,
  passengerCode: string,
  id: number,
  dir: string,
  desc: string,
}

export interface Arrivals {
  queryTime: number,
  resultSet: {
    arrival: Arrival[],
    detour: Detour[],
    location: ArrivalStop[],
  },
}
