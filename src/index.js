import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import axios from 'axios'

import App from './App'

import Routes from './Routes'

import store from './Store'

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
)
