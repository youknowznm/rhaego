import React from 'react'
import {connect} from 'react-redux'
import {Card, IconButton, Button} from 'material-ui'
import {FormControl, FormHelperText} from 'material-ui/Form';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import {Visibility, VisibilityOff} from 'material-ui-icons';
import {updateLoginField, checkLoginFields, toggleVisible} from '../loginActions'

class Login extends React.Component {
  handleChange = (field) => (evt) => {
    const fieldName = field
    const fieldValue = evt.target.value
    this.props.thisUpdateLoginField(fieldName, fieldValue)
  }
  handleAction = () => {
    this.props.thisCheckLoginFields()
    // this.props.thisRequestLogin()
  }
  goBack = () => {
    window.history.go(-1)
  }
  render() {
    const {
      emailFieldError,
      passwordFieldError,
      passwordVisible,
      thisToggleVisible,
    } = this.props
    return (
      <Card className="auth-content">
        <form className="form login">
          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="login-email">
              Email
            </InputLabel>
            <Input
              id="login-email"
              type="text"
              onChange={this.handleChange('emailField')}
              error={emailFieldError}
            />
            <FormHelperText className={emailFieldError ? 'error' : ''}>
              Any common email format would do.
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="login-password">
              Password
            </InputLabel>
            <Input
              id="login-password"
              type={passwordVisible ? "text" : "password"}
              onChange={this.handleChange('passwordField')}
              error={passwordFieldError}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={thisToggleVisible}
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

const mapState = (state, ownProps) => {
  const thatLoginFields = state.login.fields
  return {
    emailFieldError: thatLoginFields.emailField.error,
    passwordFieldError: thatLoginFields.passwordField.error,
    passwordVisible: thatLoginFields.passwordField.visible,
  };
}

const mapDispatch = (dispatch, ownProps) => ({
  thisUpdateLoginField: (fieldName, fieldValue) => {
    dispatch(updateLoginField(fieldName, fieldValue))
  },
  thisCheckLoginFields: () => {
    dispatch(checkLoginFields())
  },
  thisToggleVisible: () => {
    console.log('sb');
    dispatch(toggleVisible())
  },
  // thisRequestLogin: () => {
  //   console.log(this);
  //   // dispatch(requestLogin())
  // }
})

export default connect(mapState, mapDispatch)(Login)
