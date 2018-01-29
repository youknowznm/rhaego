import React from 'react'
import {connect} from 'react-redux'
import {Card, IconButton, Button, Typography} from 'material-ui'
import {FormControl, FormHelperText} from 'material-ui/Form';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import {Visibility, VisibilityOff} from 'material-ui-icons';
import {updateAuthField, checkAuthFields, togglePasswordVisibility} from '../actions'

import './auth.css'

class Auth extends React.Component {
  handleChange = (field) => (evt) => {
    const fieldName = field
    const fieldValue = evt.target.value
    this.props.thisUpdateAuthField(fieldName, fieldValue)
  }
  handleAction = () => {
    this.props.thisCheckAuthFields()
    // this.props.thisRequestAuth()
  }
  goBack = () => {
    window.history.go(-1)
  }
  render() {
    const {
      emailFieldError,
      passwordFieldError,
      passwordVisible,
      thisTogglePasswordVisibility,
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
              onChange={this.handleChange('emailField')}
              error={emailFieldError}
            />
            <FormHelperText className={emailFieldError ? 'error' : ''}>
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
              onChange={this.handleChange('passwordField')}
              error={passwordFieldError}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={thisTogglePasswordVisibility}
                  >
                    {passwordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText className={passwordFieldError ? 'error' : ''}>
              6 to 20 characters are required for password.
            </FormHelperText>
          </FormControl>

        </form>

        <div className="buttons">
          <Button className="action-button"
            raised
            fullWidth
            color="primary"
            onClick={this.handleAction}
          >
            login
          </Button>
          <Button className="action-button"
            raised
            fullWidth
            color="default"
            onClick={this.goBack}
          >
            cancel
          </Button>
        </div>
      </Card>
    )
  }
}

const mapState = (state) => {
  const thatAuthFields = state.auth.fields
  return {
    emailFieldError: thatAuthFields.emailField.error,
    passwordFieldError: thatAuthFields.passwordField.error,
    passwordVisible: thatAuthFields.passwordField.visible,
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
  // thisRequestAuth: () => {
  //   console.log(this);
  //   // dispatch(requestAuth())
  // }
})

export default connect(mapState, mapDispatch)(Auth)
