import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {view as Routes} from './containers/routes'
import store from './Store'

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
)
