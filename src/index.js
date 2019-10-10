import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import styled, { createGlobalStyle } from "styled-components";
import Map from './map'
import Nearby from './pages/nearby'
import Arrivals from './pages/arrivals'
import NotFound from './not_found'

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
    }

    #app {
        font-family: "Lato", sans-serif;
        font-size: 16px;
    }
    
    h1 {
        font-size: 40px;
    }
    
    h2 {
        font-size: 32px;
    }
`

const MapOverlay = styled.div`
    height: 100%;
    width: 100%;
    overflow: scroll;
    padding: 8px;
    position: fixed;
    z-index: 0;
`

render(
    <BrowserRouter>
        <>
            <GlobalStyle/>
            <Map/>
            <MapOverlay>
                <Switch>
                    <Redirect exact from='/' to='/arrivals' />
                    <Route exact path='/arrivals' component={ Nearby }/>
                    <Route exact path='/arrivals/:stopId' component={ Arrivals }/>
                    <Route path='*' component={ NotFound } />
                </Switch>
            </MapOverlay>
        </>
    </BrowserRouter>
    , document.getElementById('app')
)
