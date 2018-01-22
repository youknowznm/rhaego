import React from 'react'
import {connect} from 'react-redux'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import App from './App'
import {view as Articles} from './components/articles'
import {view as Products} from './components/products'
import {view as NotFound} from './components/notFound'

import {actions as headerActions} from './components/header'

import store from './Store'

const Routes = ({routeWillUpdate}) => (
  <Router history={browserHistory} onUpdate={routeWillUpdate}>
    <Route path="/" component={App}>
      <IndexRoute component={Articles} />
      <Route path="articles" component={Articles} />
      <Route path="products" component={Products} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
)

const mapDispatch = (dispatch, ownProps) => ({
  routeWillUpdate: () => {
    dispatch(headerActions.closeDrawer())
  }
})

export default connect(null, mapDispatch)(Routes)
