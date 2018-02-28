import React from 'react'
import {Typography} from 'material-ui'
import {changeDocTitle} from '../../../utils'

class NotFound extends React.Component {
  componentDidMount() {
    changeDocTitle('404 Not Found')
  }
  render() {
    return (
      <Typography className="mb-center" variant="subheading">
        未找到请求的 URL。
      </Typography>
    )
  }
}

export default NotFound
