import React from 'react';
import ReactDOM from 'react-dom'
// import {Provider} from 'react-redux'
// import Routes from './containers/routes'
// import store from './Store'

import Main from './modules/Main'

window.IS_DEV = process.env.NODE_ENV !== 'production'

ReactDOM.render(
  <Main />,
//
// <Provider store={store}>
//     {/*<Routes />*/}
//     <Header />
//   </Provider>,
  document.getElementById('root')
)
