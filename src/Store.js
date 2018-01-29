import {createStore, compose, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'

import {reducer as routesReducer} from './containers/routes'
import {reducer as headerReducer} from './components/header'
import {reducer as productsReducer} from './components/products'
import {reducer as authReducer} from './components/auth'
import {reducer as themeReducer} from './containers/theme'

const reducer = combineReducers({
  routes: routesReducer,
  header: headerReducer,
  products: productsReducer,
  auth: authReducer,
  theme: themeReducer,
})

const win = window

const middlewares = [thunkMiddleware]

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => (f)
)

export default createStore(reducer, {}, storeEnhancers)
