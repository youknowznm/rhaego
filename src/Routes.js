import React from 'react'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import App from './App'
import {view as Articles} from './components/articles'
import {view as Products} from './components/products'

import store from './Store'

const Routes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Articles} />
      <Route path="articles" component={Articles} />
      <Route path="products" component={Products} />
      {/* <Route path="*" component={NotFound} /> */}
    </Route>
  </Router>
)


export default Routes
