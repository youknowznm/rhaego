import React from 'react';
import ReactDOM from 'react-dom'
// import {Provider} from 'react-redux'
// import Routes from './containers/routes'
// import store from './Store'

import Header from './components/Header'

window.IS_DEV = process.env.NODE_ENV !== 'production'

const links = [
  {name: 'about'},
  {name: 'articles'},
  {name: 'works'},
]

ReactDOM.render(
  <Header links={links} />,
//
// <Provider store={store}>
//     {/*<Routes />*/}
//     <Header />
//   </Provider>,
  document.getElementById('root')
)
