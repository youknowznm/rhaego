import React from 'react'
import PropTypes from 'prop-types'
import {Typography} from 'material-ui'
import {CircularProgress} from 'material-ui/Progress'

class Loading extends React.Component {
  constructor() {
    super(...arguments)
  }
  render() {
    const {status, children} = this.props
    switch (status) {
      case 'loading':
        return (
          <CircularProgress className="mb-loading-placeholder" />
        )
      case 'failure':
        return (
          <div className="mb-loading-placeholder">
            <Typography type="subheading">
              An error occurred.
            </Typography>
            <Typography type="subheading">
              Please try again later.
            </Typography>
          </div>
        )
      case 'success':
        return children()
      default:
        throw new Error('unexpected status ' + status)
    }
  }
}

Loading.propTypes = {
  status: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
}

export default Loading
