import React from 'react'
import PropTypes from 'prop-types'
import {Typography} from 'material-ui'
import {CircularProgress} from 'material-ui/Progress'

class LoadingArea extends React.Component {
  render() {
    let {status, children, failedMsg} = this.props
    failedMsg =
      typeof failedMsg === 'string'
      ? failedMsg
      : <Typography type="subheading">
          Please try again later.
        </Typography>
    switch (status) {
      case 'initial':
        return <div></div>
      case 'loading':
        return (
          <CircularProgress className="mb-center" />
        )
      case 'failed':
        return (
          <div className="mb-center">
            {failedMsg}
          </div>
        )
      case 'completed':
        return children()
      default:
        throw new Error('unexpected status ' + status)
    }
  }
}

LoadingArea.propTypes = {
  status: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  failedMsg: PropTypes.string,
}

export default LoadingArea
