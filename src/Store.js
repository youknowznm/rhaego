import {createStore, compose, combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

const reducer = combineReducers({
  routing: routerReducer,
})

const win = window

const storeEnhancers = compose(
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => (f)
)

const initialState = {greetings: 'fuck'}

export default createStore(reducer, initialState, storeEnhancers)
