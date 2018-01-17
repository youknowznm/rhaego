import {createStore, compose, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'

// import {routerReducer} from 'react-router-redux'

import {reducer as headerReducer} from './components/header'
import {reducer as productsReducer} from './components/products'

const reducer = combineReducers({
  // routing: routerReducer,
  header: headerReducer,
  products: productsReducer,
})

const win = window

const middlewares = [thunkMiddleware]

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => (f)
)

export default createStore(reducer, {}, storeEnhancers)
