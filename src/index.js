import React from 'react';
import ReactDOM from 'react-dom'
// import {Provider} from 'react-redux'
// import Routes from './containers/routes'
// import store from './Store'

import Header from './components/Header'

window.IS_DEV = process.env.NODE_ENV !== 'production'

const links = [
  {name: '文章'},
  {name: '作品'},
  {name: '留言'},
  {name: '关于'},
]

ReactDOM.render(
  <Header
    links={links}
    siteName={'you know znm'}
  />,
//
// <Provider store={store}>
//     {/*<Routes />*/}
//     <Header />
//   </Provider>,
  document.getElementById('root')
)
