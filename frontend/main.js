import React from 'react'
import ReactDOM from 'react-dom'
import Routes from '~/routes'
import {checkDevice} from '~utils'

checkDevice()

// 不记录滚动位置
history.scrollRestoration = 'manual'

ReactDOM.render(
  <Routes />,
  document.getElementById('root')
)