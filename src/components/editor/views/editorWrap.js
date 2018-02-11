import React from 'react'
import {connect} from 'react-redux'
import {TextField} from 'material-ui'
import {actions} from '../../admin'
import {LoadingArea} from '../../../utils'
import Editor from './editor'

import './editor.css'

class EditorWrap extends React.Component {
  constructor() {
    super(...arguments)
    this.props.thisCheckIfLoggedIn()
  }
  componentDidUpdate() {
    if (this.props.loginStatusString === 'failed') {
      setTimeout(() => {
        window.history.go(-1)
      }, 1500)
    }
  }
  render() {
    const {loginStatusString} = this.props
    return (
      <LoadingArea
        status={loginStatusString}
        failedMsg="This route is for admin only. Going back to previous page."
      >
        {
          () => (<Editor />)
        }
      </LoadingArea>
    )
  }
}
const mapState = (state) => {
  let loginStatusString = ''
  switch (state.admin.adminLoggedIn) {
    case null:
      loginStatusString = 'loading'
      break;
    case true:
      loginStatusString = 'completed'
      break;
    case false:
      loginStatusString = 'failed'
      break;
  }
  return {
    loginStatusString,
  }
}
const mapDispatch = (dispatch) => ({
  thisCheckIfLoggedIn: () => {
    dispatch(actions.checkIfLoggedIn())
  },
})

export default connect(mapState, mapDispatch)(EditorWrap)
