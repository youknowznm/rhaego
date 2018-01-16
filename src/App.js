import React from 'react'
import {Reboot} from 'material-ui'
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles'
import {purple, green} from 'material-ui/colors'

import {view as Header} from './components/header'
import {view as Drawer} from './components/drawer'
import {view as Main} from './components/main'
import {view as Footer} from './components/footer'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500]
    },
    secondary: {
      main: green[400]
    }
  }
})

const App = () => (
  <div>
    {/* <MuiThemeProvider theme={theme}> */}
      <Reboot />
      <Header />
      <Drawer />
      <Main />
      <Footer />
    {/* </MuiThemeProvider> */}
  </div>
)

export default App
