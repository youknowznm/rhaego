import React from 'react'
import PropTypes from 'prop-types'
import {Button, Snackbar} from 'material-ui'
import {CircularProgress} from 'material-ui/Progress'

import './asyncButton.css'

const AsyncButton = ({asyncStatus, asyncResultMessage, children, ...otherProps}) => {
  const isLoading = (asyncStatus === 'async')
  return (
    <div>
      <div className="async-button-wrap">
        <Button
          disabled={asyncStatus === 'failed' || asyncStatus === 'completed'}
          {...otherProps}
        >
          {isLoading ? '' : children}
        </Button>
        {isLoading ? <CircularProgress size={24} className="async-button-progress" /> : ''}
      </div>

      <Snackbar
        open={['failed', 'completed'].includes(asyncStatus)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        message={asyncResultMessage}
      />
    </div>
  )
}

AsyncButton.propTypes = {
  asyncStatus: PropTypes.string.isRequired,
  asyncResultMessage: PropTypes.string.isRequired,
}

export default AsyncButton
