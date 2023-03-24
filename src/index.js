import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import styled, { createGlobalStyle } from "styled-components";
import ContextProviders from "./context/ContextProviders";
import Map from './map'
import Nearby from './pages/nearby'
import Arrivals from './pages/arrivals'
import NotFound from './not_found'
import Debug from "./debug";

const GlobalStyle = createGlobalStyle`
  html, body, #app {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    position: relative;
  }
  
  body {
    background: #ccc;
    color: #810e0e;
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
  
  .custom-popup {
    .mapboxgl-popup-content {
      border: 1px solid #810e0e;
    }
    
    &.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip {
      border-top-color: #810e0e;
    }
  }
`

const MapOverlay = styled.div`
  height: 100%;
  width: 100%;
  overflow: scroll;
  padding: 8px;
  position: fixed;
  top:0;
  left: 0;
  z-index: 0;
`

render(
  <BrowserRouter>
    <ContextProviders>
      <GlobalStyle/>
      <Map/>
      <MapOverlay>
        <Switch>
          <Redirect exact from='/' to='/map'/>
          <Route exact path='/arrivals' component={Nearby}/>
          <Route exact path='/arrivals/:stopId' component={Arrivals}/>
          <Route exact path='/map' component={null}/>
          <Route exact path='/debug' component={Debug}/>
          <Route path='*' component={NotFound}/>
        </Switch>
      </MapOverlay>
    </ContextProviders>
  </BrowserRouter>
  , document.getElementById('app')
)
