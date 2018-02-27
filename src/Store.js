import {createStore, compose, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise'

import {routerReducer} from 'react-router-redux'
import {reducer as headerReducer} from './components/header'
import {reducer as productsReducer} from './components/products'
import {reducer as loginReducer} from './components/login'
import {reducer as themeReducer} from './containers/theme'
import {reducer as adminReducer} from './components/admin'
import {reducer as editorReducer} from './components/editor'
import {reducer as articleReducer} from './components/article'
import {reducer as articlesReducer} from './components/articles'
import {reducer as uploadReducer} from './components/upload'
import {reducer as resumeReducer} from './components/resume'

const reducer = combineReducers({
	routing: routerReducer,
  header: headerReducer,
  products: productsReducer,
  login: loginReducer,
  theme: themeReducer,
	admin: adminReducer,
	editor: editorReducer,
	upload: uploadReducer,
	article: articleReducer,
	articles: articlesReducer,
  resume: resumeReducer,
})

const win = window

const middlewares = [thunkMiddleware, promiseMiddleware]

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => (f)
)

export default createStore(reducer, {}, storeEnhancers)
