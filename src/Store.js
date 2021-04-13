import {createStore, compose, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'

import {routerReducer} from 'react-router-redux'
import {reducer as headerReducer} from './modules/header'
import {reducer as productsReducer} from './modules/products'
import {reducer as loginReducer} from './modules/login'
import {reducer as themeReducer} from './containers/theme'
import {reducer as adminReducer} from './modules/admin'
import {reducer as editorReducer} from './modules/editor'
import {reducer as articleReducer} from './modules/article'
import {reducer as articlesReducer} from './modules/articles'
import {reducer as uploadReducer} from './modules/upload'
import {reducer as resumeReducer} from './modules/resume'

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

const middlewares = [thunkMiddleware]

const storeEnhancers = compose(
  applyMiddleware(...middlewares),
  (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => (f)
)

export default createStore(reducer, {}, storeEnhancers)
