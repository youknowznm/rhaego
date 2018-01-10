import React from 'react'

import {Reboot} from 'material-ui'

import {view as Header} from './components/header'
import {view as Drawer} from './components/drawer'

const App = () => (
  <div>
    <Reboot />
    <Header />
    <Drawer />
  </div>
)

export default App
