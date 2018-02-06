import React from 'react'
import {connect} from 'react-redux'
import {Button, Typography} from 'material-ui'
import {CircularProgress} from 'material-ui/Progress'
import axios from 'axios'
import {view as Login} from '../../login'
import Logout from './logout'
import {checkLoginStatus as checkLoginStatusApi} from '../../../api'

class Admin extends React.Component {
  constructor() {
    super(...arguments)
    this.state = {
      adminLoggedIn: null,
    }
  }
  componentDidMount() {
    let that = this
    axios
      .get(checkLoginStatusApi)
      .then(() => {
        that.setState({
          adminLoggedIn: true
        })
      })
      .catch((e) => {
        if (e.response) {
          that.setState({
            adminLoggedIn: false
          })
        }
        console.error(e)
      })
  }
  render() {
    const {adminLoggedIn} = this.state
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


export default Admin
