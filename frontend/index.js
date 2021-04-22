import React from 'react';
import ReactDOM from 'react-dom'
// import {Provider} from 'react-redux'
// import Routes from './containers/routes'
// import store from './Store'
import Routes from '~/routes'

import Main from '~/modules/Main'

window.IS_DEV = process.env.NODE_ENV !== 'production'
// window.API_CONTEXT = 'http://localhost:4000'
// window.API_CONTEXT = 'http://localhost:4000/api'

ReactDOM.render(
  // <Main />,
  <Routes />,
//
// <Provider store={store}>
//     {/*<Routes />*/}
//     <Header />
//   </Provider>,
  document.getElementById('root')
)
