import React from 'react'
import ReactDOM from 'react-dom'
import Routes from '~/routes'
import {checkDevice, checkUrlPrintParam} from '~utils'

checkDevice()
checkUrlPrintParam()

// 不记录滚动位置
history.scrollRestoration = 'manual'

ReactDOM.render(
  <Routes />,
  document.getElementById('root')
)

console.log(
  '%cMay the flames guide thee.',
  'font-weight: 500; color: #ea4335'
)
