import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ReactMapGL from 'react-map-gl'
import useUserLocation from './useUserLocation'
import PORTLANDIA from './portlandia'

function getWindowSize () {
    return {
        height: window.innerHeight,
        width: window.innerWidth,
    }
}

export default () => {
    const userLocation = useUserLocation()
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
            />
        </MapContainer>
    )
}

const MapContainer = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: -1;
`