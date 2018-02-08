import React from 'react'
import {connect} from 'react-redux'
import {Button, Typography} from 'material-ui'
import {CircularProgress} from 'material-ui/Progress'
import axios from 'axios'
import {view as Login} from '../../login'
import Logout from './logout'
import {checkLoginStatus as checkLoginStatusApi} from '../../../api'
import {checkLoginStatus} from '../actions'

class Admin extends React.Component {
  componentDidMount() {
    this.props.thisCheckLoginStatus()
  }
  render() {
    const {adminLoggedIn} = this.props
    switch (adminLoggedIn) {
      case true:
        return <Logout />
      case false:
        return <Login />
      default:
        return <CircularProgress className="mb-center" />
    }
  }
}
const mapState = (state) => ({
  adminLoggedIn: state.admin.adminLoggedIn
})
const mapDispatch = (dispatch) => ({
  thisCheckLoginStatus: () => {
    dispatch(checkLoginStatus())
  },
})
export default connect(mapState, mapDispatch)(Admin)
