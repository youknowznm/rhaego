import React from 'react'
import PropTypes from 'prop-types'
import {Typography, Button} from 'material-ui'
import {withStyles} from 'material-ui/styles'
import {CircularProgress} from 'material-ui/Progress'

const styles = (theme) => {
  return {
    'loading-button-wrap': {
      position: 'relative',
    },
    'loading-button-progress': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
      color: theme.palette.type === 'light' ? '#9c27b0' : '#69f0ae',
    }
  }
}

const LoadingButton = ({loadingStatus, handleClick, buttonClassName, children, classes}) => {
  const isLoading = loadingStatus === 'loading'
  return (
    <div className={classes['loading-button-wrap']}>
      <Button className={buttonClassName}
        raised
        fullWidth
        color="primary"
        disabled={isLoading === 'loading'}
        onClick={handleClick}
      >
        {isLoading ? '' : children}
      </Button>
      {isLoading ? <CircularProgress size={24} className={classes['loading-button-progress']} /> : ''}
    </div>
  )
}

LoadingButton.propTypes = {
  loadingStatus: PropTypes.string.isRequired,
  buttonClassName: PropTypes.string,
  handleClick: PropTypes.func,
  children: PropTypes.string.isRequired,
}

export default withStyles(styles)(LoadingButton)
