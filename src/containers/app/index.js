import React from 'react'
import {connect} from 'react-redux'
import {Reboot} from 'material-ui'
import {view as Theme} from '../../containers/theme'
import {view as Header} from '../../components/header'
import {view as Drawer} from '../../components/drawer'
import {view as Main} from '../../components/main'
import {view as Footer} from '../../components/footer'

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
