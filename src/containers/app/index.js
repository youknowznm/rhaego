import React from 'react'
import {connect} from 'react-redux'
import {Reboot} from 'material-ui'
import {view as Theme} from '../../containers/theme'
import {view as Header} from '../../_modules/header'
import {view as Drawer} from '../../_modules/drawer'
import {view as Main} from '../../_modules/main'
import {view as Footer} from '../../_modules/footer'

const App = ({children, isDarkTheme}) => (
  <Theme>
    <div id={isDarkTheme ? 'mb-dark-theme' : 'mb-light-theme'}>
      <Reboot />
      <Header />
      <Drawer />
      <Main>
        {children}
      </Main>
      <Footer />
    </div>
  </Theme>
)

const mapState = (state) => ({
  isDarkTheme: state.theme.type === 'dark',
})

export default connect(mapState)(App)
