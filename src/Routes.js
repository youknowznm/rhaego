import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import {syncHistoryWithStore} from 'react-router-redux'

import App from './pages/App'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'

import store from './Store'

const history = syncHistoryWithStore(browserHistory, store)

const Routes = () => (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="home" component={Home} />
      <Route path="about" component={About} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
)


export default Routes
