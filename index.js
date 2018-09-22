import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import NotFound from './not_found'

render(
    <BrowserRouter>
        <Switch>
            <Route path='*' component={ NotFound } />
        </Switch>
    </BrowserRouter>
    , document.getElementById('app')
)
