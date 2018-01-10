import {createStore, compose, combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import {reducer as headerReducer} from './components/header'

const reducer = combineReducers({
  routing: routerReducer,
  header: headerReducer,
})

const win = window

const storeEnhancers = compose(
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => (f)
)

export default createStore(reducer, {}, storeEnhancers)
