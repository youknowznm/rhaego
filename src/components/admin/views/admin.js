import React from 'react'
import {connect} from 'react-redux'
import {Button, Typography} from 'material-ui'
import {CircularProgress} from 'material-ui/Progress'
import axios from 'axios'
import {view as Login} from '../../login'
import ControlPanel from './controlPanel'
import {checkIfLoggedIn as checkIfLoggedInApi} from '../../../api'
import {checkIfLoggedIn} from '../actions'

class Admin extends React.Component {
  componentDidMount() {
    this.props.thisCheckIfLoggedIn()
  }
  render() {
    const {adminLoggedIn} = this.props
    switch (adminLoggedIn) {
      case true:
        return <ControlPanel />
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
  thisCheckIfLoggedIn: () => {
    dispatch(checkIfLoggedIn())
  },
})
export default connect(mapState, mapDispatch)(Admin)
