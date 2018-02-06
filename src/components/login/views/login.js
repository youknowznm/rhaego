import React from 'react'
import {connect} from 'react-redux'
import {Card, IconButton, Button, Typography, Snackbar} from 'material-ui'
import {FormControl, FormHelperText} from 'material-ui/Form';
import {Slide} from 'material-ui/transitions';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import {Visibility, VisibilityOff} from 'material-ui-icons';
import {LoadingButton} from '../../../utils'
import {
  updateLoginField,
  checkLoginFields,
  togglePasswordVisibility,
  requestLogin,
  requestLoginInit,
} from '../actions'

import './login.css'


class Login extends React.Component {
  handleChange = (field) => (evt) => {
    const fieldName = field
    const fieldValue = evt.target.value
    this.props.thisUpdateLoginField(fieldName, fieldValue)
  }
  componentWillUpdate (nextProps, nState) {
    if (nextProps.fieldsValid === true
      && nextProps.loginRequestStatus === 'loading'
    ) {
      const registerFields = {
        email: this.props.emailValue,
        password: this.props.passwordValue,
      }
      this.props.thisRequestLogin({registerFields})
    }
  }
  goBack = () => {
    window.history.go(-1)
  }
  render() {
    const {
      emailValue,
      emailError,
      passwordValue,
      passwordError,
      passwordVisible,
      thisTogglePasswordVisibility,
      loginRequestStatus,
      thisCheckLoginFields,
      loginRequestErrorMessage,
    } = this.props
    return (
      <Card className="login">
        <Typography className="info" component="i" type="caption">
          Only site administrator can write articles and manage comments.
        </Typography>
        <form className="form">
          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="login-email">
              Email
            </InputLabel>
            <Input
              id="login-email"
              type="text"
              onChange={this.handleChange('email')}
              error={emailError}
            />
            <FormHelperText className={emailError ? 'error' : ''}>
              Common email format is required.
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="login-password">
              Password
            </InputLabel>
            <Input
              id="login-password"
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
            loadingStatus={loginRequestStatus}
            handleClick={thisCheckLoginFields}
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
          open={loginRequestStatus === 'failure'}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          message={loginRequestErrorMessage}
        />
      </Card>
    )
  }
}

const mapState = (state) => {
  const thatLoginFields = state.login.fields
  return {
    emailValue: thatLoginFields.email.value,
    passwordValue: thatLoginFields.password.value,
    emailError: thatLoginFields.email.error,
    passwordError: thatLoginFields.password.error,
    passwordVisible: thatLoginFields.password.visible,
    loginRequestStatus: state.login.loginRequestStatus,
    fieldsValid: state.login.fieldsValid,
    loginRequestErrorMessage: state.login.loginRequestErrorMessage,
  };
}

const mapDispatch = (dispatch) => ({
  thisUpdateLoginField: (fieldName, fieldValue) => {
    dispatch(updateLoginField(fieldName, fieldValue))
  },
  thisCheckLoginFields: () => {
    dispatch(checkLoginFields())
  },
  thisTogglePasswordVisibility: () => {
    dispatch(togglePasswordVisibility())
  },
  thisRequestLogin: (registerFields) => {
    dispatch(requestLogin(registerFields))
  },
  thisRequestLoginInit: () => {
    dispatch(requestLoginInit())
  },
})

export default connect(mapState, mapDispatch)(Login)
