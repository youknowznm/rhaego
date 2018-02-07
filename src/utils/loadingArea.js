import React from 'react'
import PropTypes from 'prop-types'
import {Typography} from 'material-ui'
import {CircularProgress} from 'material-ui/Progress'

class LoadingArea extends React.Component {
  render() {
    let {status, children, statusMsg} = this.props
    statusMsg =
      typeof statusMsg === 'string'
      ? statusMsg
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
      case 'failure':
        return (
          <div className="mb-center">
            {statusMsg}
          </div>
        )
      case 'success':
        return children()
      default:
        throw new Error('unexpected status ' + status)
    }
  }
}

LoadingArea.propTypes = {
  status: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  statusMsg: PropTypes.string,
}

export default LoadingArea
