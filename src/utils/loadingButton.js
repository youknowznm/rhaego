import React from 'react'
import PropTypes from 'prop-types'
import {Typography, Button} from 'material-ui'
import {CircularProgress} from 'material-ui/Progress'

import './loadingButton.css'

const LoadingButton = ({loading, handleClick, buttonClassName, children}) => (
  <div className="loading-button-wrap">
    <Button className={buttonClassName}
      raised
      fullWidth
      color="primary"
      disabled={loading ? true : false}
      onClick={handleClick}
    >
      {loading ? '' : children}
    </Button>
    {loading ? <CircularProgress size={24} className="loading-button-progress" /> : ''}
  </div>
)

LoadingButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  buttonClassName: PropTypes.string,
  handleClick: PropTypes.func,
  children: PropTypes.string.isRequired,
}

export default LoadingButton
