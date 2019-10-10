import React from 'react'
import { render } from 'react-dom'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import { createGlobalStyle } from "styled-components";

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

render(
    <HashRouter>
        <>
            <GlobalStyle/>
            <Switch>
                <Redirect exact from='/' to='/arrivals' />
                <Route exact path='/arrivals' component={ Nearby }/>
                <Route exact path='/arrivals/:stopId' component={ Arrivals }/>
                <Route path='*' component={ NotFound } />
            </Switch>
        </>
    </HashRouter>
    , document.getElementById('app')
)
