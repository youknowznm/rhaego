import React from 'react'
import ReactDOM from 'react-dom'
import Routes from '~/routes'
import {checkDevice} from '~utils'

checkDevice()

ReactDOM.render(
  <Routes />,
  document.getElementById('root')
)