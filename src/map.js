import React, {useState, useEffect, useContext} from 'react'
import styled from 'styled-components'
import ReactMapGL from 'react-map-gl'
import PORTLANDIA from './portlandia'
import UserLocation from "./context/UserLocation";

function getWindowSize () {
    return {
        height: window.innerHeight,
        width: window.innerWidth,
    }
}

export default () => {
    const userLocation = useContext(UserLocation)
    const [viewport, setViewport] = useState({
        ...getWindowSize(),
        ...PORTLANDIA,
        zoom: 16,
    })

    useEffect(() => {
        setViewport({
            ...viewport,
            ...userLocation,
        })
    }, [userLocation])

    useEffect(() => {
        function handleResize () {
            setViewport({
                ...viewport,
                ...getWindowSize(),
            })
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <MapContainer>
            <ReactMapGL
                id={'map'}
                { ...viewport }
                onViewportChange={ viewport => setViewport(viewport)}
                mapboxApiAccessToken={'pk.eyJ1Ijoic3R4YWxxIiwiYSI6ImNrMWs5aHoxMTBrOW4zbHFuM2pxdmk4Ym8ifQ.0PH0Ji8WXfb6UJ0U0qFD1Q'}
                mapStyle={'mapbox://styles/stxalq/ck1kf2hvn1sqj1crmwcudsqtw'}
            />
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

const MapContainer = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: -1;
`