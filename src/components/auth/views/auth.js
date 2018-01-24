import React from 'react'
import {connect} from 'react-redux'
import SwipeableViews from 'react-swipeable-views'
import {AppBar, Tabs as MuiTabs, Typography} from 'material-ui'
import {Tab as MuiTab} from 'material-ui/Tabs'
import Login from './login'
import Register from './register'
import {switchAuthTab} from '../actions'
import './auth.css'

class Auth extends React.Component {
  handleChange = (evt, value) => {
    this.props.thisSwitchAuthTab(value)
  }
  handleChangeIndex = (index) => {
    this.props.thisSwitchAuthTab(index)
  }
  render() {
    const {thisSwitchAuthTab, activeTabValue} = this.props
    return (
      <div className="auth">
        <AppBar position="static" color="default">
          <MuiTabs
            value={activeTabValue}
            onChange={this.handleChange}
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
          index={+activeTabValue}
          onChangeIndex={this.handleChangeIndex}
        >
          <Login />
          <Register />
        </SwipeableViews>
      </div>
    );
  }
}

const mapState = (state, ownProps) => ({
  activeTabValue: state.auth.activeTabValue,
})

const mapDispath = (dispatch, ownProps) => ({
  thisSwitchAuthTab: (v) => {dispatch(switchAuthTab(v))}
})

export default connect(mapState, mapDispath)(Auth)
