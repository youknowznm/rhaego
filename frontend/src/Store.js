import {createStore, compose, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'

import {routerReducer} from 'react-router-redux'
import {reducer as headerReducer} from '../_modules/header'
import {reducer as productsReducer} from '../_modules/products'
import {reducer as loginReducer} from '../_modules/login'
import {reducer as themeReducer} from './containers/theme'
import {reducer as adminReducer} from '../_modules/admin'
import {reducer as editorReducer} from '../_modules/editor'
import {reducer as articleReducer} from '../_modules/article'
import {reducer as articlesReducer} from '../_modules/articles'
import {reducer as uploadReducer} from '../_modules/upload'
import {reducer as resumeReducer} from '../_modules/resume'

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
