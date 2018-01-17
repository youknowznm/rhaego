import React from 'react'
import {Reboot} from 'material-ui'

import {view as Header} from './components/header'
import {view as Drawer} from './components/drawer'
import {view as Main} from './components/main'
import {view as Footer} from './components/footer'
import {view as Articles} from './components/articles'
import {view as Products} from './components/products'

const App = ({children}) => (
  <div>
    <Reboot />
    <Header />
    <Drawer />
    <Main>
      {/* <Articles /> */}
      <Products />
    </Main>
    {/* {children} */}
    <Footer />
  </div>
)

export default App
