import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import ReactMapGL from 'react-map-gl'
import NearbyStopMarkers from './map/NearbyStopMarkers'
import UserMarker from './map/UserMarker'
import useViewport from './hooks/useViewport'
import useOrientation from './hooks/useOrientation'
import MapRotationMode from './context/MapRotationMode'
import NextArrivalsPopup from './map/NextArrivalsPopup'

export default () => {
  const viewport = useViewport()
  const orientation = useOrientation()
  const location = useLocation()
  const { mode, toggle } = useContext(MapRotationMode)

  const zIndex = location.pathname === '/map' ? 1 : -1

  const bearing = mode === 'map' ? orientation?.alpha ?? 0 : 0
  const pitch = mode === 'map' ? Math.min(orientation?.beta ?? 0, 60) : 0

  return (
    <MapContainer zIndex={zIndex}>
      <ReactMapGL
        id={'map'}
        initialViewState={{ ...viewport }}
        bearing={bearing}
        pitch={pitch}
        latitude={viewport.latitude}
        longitude={viewport.longitude}
        style={{
          height: '100%',
          maxHeight: '100%',
          width: '100%',
          position: 'relative'
        }}
        mapboxAccessToken={'pk.eyJ1Ijoic3R4YWxxIiwiYSI6ImNrMWs5aHoxMTBrOW4zbHFuM2pxdmk4Ym8ifQ.0PH0Ji8WXfb6UJ0U0qFD1Q'}
        mapStyle={'mapbox://styles/stxalq/ck1kf2hvn1sqj1crmwcudsqtw'}
        doubleClickZoom={false}
        dragRotate={false}
        dragPan={false}
        touchPitch={false}
        touchZoomRotate={false}
      >
        <NearbyStopMarkers/>
        <UserMarker/>
        <NextArrivalsPopup/>
      </ReactMapGL>
    </MapContainer>
  )
}

// pencil
// mapbox://styles/stxalq/ck1kf2pr56k001cnxr6idrj4i
// minimo
// mapbox://styles/stxalq/ck1kf2hvn1sqj1crmwcudsqtw
// mapbox://styles/mapbox/streets-v11
// mapbox://styles/mapbox/outdoors-v11
// mapbox://styles/mapbox/light-v10
// mapbox://styles/mapbox/dark-v10
// mapbox://styles/mapbox/satellite-v9
// mapbox://styles/mapbox/satellite-streets-v11
// mapbox://styles/mapbox/navigation-preview-day-v4
// mapbox://styles/mapbox/navigation-preview-night-v4
// mapbox://styles/mapbox/navigation-guidance-day-v4
// mapbox://styles/mapbox/navigation-guidance-night-v4

interface MapContainer {
  readonly zIndex: number,
}

const MapContainer = styled.div<MapContainer>`
    height: 100vh;
    width: 100vw;
    position: relative;
    z-index: ${props => props.zIndex};
`
