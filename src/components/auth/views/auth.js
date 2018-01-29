import React from 'react'
import {connect} from 'react-redux'
import {Card, IconButton, Button, Typography, Snackbar} from 'material-ui'
import {FormControl, FormHelperText} from 'material-ui/Form';
import {Slide} from 'material-ui/transitions';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import {Visibility, VisibilityOff} from 'material-ui-icons';
import {LoadingButton} from '../../../utils'
import {
  updateAuthField,
  checkAuthFields,
  togglePasswordVisibility,
  requestAuth,
  requestAuthInit,
} from '../actions'

import './auth.css'


class Auth extends React.Component {
  handleChange = (field) => (evt) => {
    const fieldName = field
    const fieldValue = evt.target.value
    this.props.thisUpdateAuthField(fieldName, fieldValue)
  }
  componentWillUpdate (nextProps, nState) {
    if (nextProps.fieldsValid === true
      && nextProps.authRequestStatus === 'loading'
    ) {
      this.props.thisRequestAuth()
    }
  }
  goBack = () => {
    window.history.go(-1)
  }
  render() {
    const {
      emailError,
      passwordError,
      passwordVisible,
      thisTogglePasswordVisibility,
      authRequestStatus,
      thisCheckAuthFields,
      thisRequestAuthInit,
      authRequestErrorMessage,
    } = this.props
    return (
      <Card className="auth">
        <Typography className="info" component="i" type="caption">
          Only site administrator can write articles and manage comments.
        </Typography>
        <form className="form login">
          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="auth-email">
              Email
            </InputLabel>
            <Input
              id="auth-email"
              type="text"
              onChange={this.handleChange('email')}
              error={emailError}
            />
            <FormHelperText className={emailError ? 'error' : ''}>
              Common email format is required.
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="auth-password">
              Password
            </InputLabel>
            <Input
              id="auth-password"
              type={passwordVisible ? "text" : "password"}
              onChange={this.handleChange('password')}
              error={passwordError}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={thisTogglePasswordVisibility}
                  >
                    {passwordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText className={passwordError ? 'error' : ''}>
              6 to 20 characters are required for password.
            </FormHelperText>
          </FormControl>

        </form>

        <div className="buttons">
          <LoadingButton
            buttonClassName="action-button"
            loadingStatus={authRequestStatus}
            handleClick={thisCheckAuthFields}
          >
            login
          </LoadingButton>
          {/* <Button className="action-button"
            raised
            fullWidth
            color="primary"
            onClick={this.handleAction}
          >
            login
          </Button> */}
          <Button className="action-button"
            raised
            fullWidth
            color="default"
            onClick={this.goBack}
          >
            cancel
          </Button>
        </div>

        <Snackbar
          open={authRequestStatus === 'failure'}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          // onClose={thisRequestAuthInit}
          // transition={<Slide direction="up" />}
          message={authRequestErrorMessage}
        />
      </Card>
    )
  }
}

const mapState = (state) => {
  const thatAuthFields = state.auth.fields
  return {
    emailValue: thatAuthFields.email.value,
    passwordValue: thatAuthFields.password.value,
    emailError: thatAuthFields.email.error,
    passwordError: thatAuthFields.password.error,
    passwordVisible: thatAuthFields.password.visible,
    authRequestStatus: state.auth.authRequestStatus,
    fieldsValid: state.auth.fieldsValid,
    authRequestErrorMessage: state.auth.authRequestErrorMessage,
  };
}

const mapDispatch = (dispatch) => ({
  thisUpdateAuthField: (fieldName, fieldValue) => {
    dispatch(updateAuthField(fieldName, fieldValue))
  },
  thisCheckAuthFields: () => {
    dispatch(checkAuthFields())
  },
  thisTogglePasswordVisibility: () => {
    dispatch(togglePasswordVisibility())
  },
  thisRequestAuth: () => {
    dispatch(requestAuth())
  },
  thisRequestAuthInit: () => {
    dispatch(requestAuthInit())
  },
})

export default connect(mapState, mapDispatch)(Auth)
