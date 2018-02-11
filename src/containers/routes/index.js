import React from 'react'
import {connect}from 'react-redux'
import {Router, Route, IndexRoute, browserHistory}from 'react-router'
import {syncHistoryWithStore}from 'react-router-redux'
import store from '../../Store'

import App from '../app'
import {view as Articles}from '../../components/articles'
import {view as Products}from '../../components/products'
import {view as Admin}from '../../components/admin'
import {view as Editor}from '../../components/editor'
import {view as NotFound}from '../../components/notFound'
import {actions as headerActions}from '../../components/header'

const history = syncHistoryWithStore(browserHistory, store)

const Routes = ({handleRouteUpdate}) => (
  <Router history={history}onUpdate={handleRouteUpdate}>
    <Route path="/" component={App}>
      <IndexRoute component={Articles}/>
      <Route path="admin" component={Admin}>
        <Route path="index" component={Admin}/>
        <Route path="editor" component={Editor}/>
      </Route>
      <Route path="articles" component={Articles}/>
      <Route path="products" component={Products}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
)
const mapState = (state) => ({})
const mapDispatch = (dispatch) => ({
  handleRouteUpdate: () => {
  console.log(store.getState().routing.locationBeforeTransitions);
  dispatch(headerActions.toggleDrawer(false))
  }
})

export default connect(mapState, mapDispatch)(Routes)
