import React from 'react'
import {Typography} from 'material-ui'
import {changeDocTitle} from '../../../utils'

class Messages extends React.Component {
  componentDidMount() {
    changeDocTitle('留言')
  }
  render() {
    return (
      <Typography className="mb-center" type="subheading">
        留言功能正在开发中。
      </Typography>
    )
  }
}

export default Messages
