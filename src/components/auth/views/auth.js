import React from 'react'
import SwipeableViews from 'react-swipeable-views'
import {AppBar, Tabs as MuiTabs, Typography} from 'material-ui'
import {Tab as MuiTab} from 'material-ui/Tabs'
import Login from './login'
// import Register from './register'
import './auth.css'

// const TabContainer = ({children}) => (
//   <Typography>
//     {children}
//   </Typography>
// )

class Tabs extends React.Component {

  render() {
    return (
      <div className="auth">
        <AppBar position="static" color="default">
          <MuiTabs
            value={0}
            // onChange=""
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <MuiTab label="login" />
            <MuiTab label="register" />
          </MuiTabs>
        </AppBar>

        <SwipeableViews
          axis="x"
          index={0}
          // onChangeIndex={this.handleChangeIndx}
        >
          <TabContainer>login</TabContainer>
          <TabContainer>register</TabContainer>
        </SwipeableViews>
      </div>
    )
  }

}

export default Tabs
