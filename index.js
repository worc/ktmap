import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Nearby from './nearby'
import Arrivals from './arrivals'
import NotFound from './not_found'

render(
    <BrowserRouter>
        <Switch>
            <Redirect exact from='/' to='/arrivals' />
            <Route exact path='/arrivals' component={ Nearby }/>
            <Route exact path='/arrivals/:stopId' component={ Arrivals }/>
            <Route path='*' component={ NotFound } />
        </Switch>
    </BrowserRouter>
    , document.getElementById('app')
)