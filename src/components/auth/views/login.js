import React from 'react'
import {connect} from 'react-redux'
import {Card, TextField, IconButton, Button} from 'material-ui'
import {FormControl, FormHelperText} from 'material-ui/Form';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import {Visibility, VisibilityOff} from 'material-ui-icons';

class Login extends React.Component {
  state = {
    emailField: '',
    emailFieldError: false,
    passwordField: '',
    passwordFieldError: false,
  }
  handleChange = (field) => (evt) => {
    this.setState({
      [field]: evt.target.value
    })
  }
  checkLoginFields = () => {
    let s = this.state
    this.setState({
      emailFieldError: false,
      passwordFieldError: false,
    })
    setTimeout(() => {
      // (zhngnmng)(@sina)(.com)(.cn)
      const emailReg = /^([a-zA-Z0-9]+[\w-]*)(@[\w]{2,})(\.[\w]{2,4})(\.[\w]{2,4})?$/
      this.setState({
        emailFieldError: !emailReg.test(s.emailField)
      })
      // 12345678
      const passwordReg = /^.{6,20}$/
      this.setState({
        passwordFieldError: !passwordReg.test(s.passwordField)
      })
    }, 250)
  }
  handleAction = () => {
    this.checkLoginFields()
  }
  render() {
    const {
      emailFieldError,
      passwordFieldError,
    } = this.state
    return (
      <Card className="auth-content">
        <form className="form login">
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="login-email">
              Email
            </InputLabel>
            <Input
              id="login-email"
              type="text"
              error={emailFieldError}
              onChange={this.handleChange('emailField')}
            />
            <FormHelperText className={emailFieldError ? 'error' : ''}>
              Any common email format would do.
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="login-password">
              Password
            </InputLabel>
            <Input
              id="login-password"
              type="password"
              onChange={this.handleChange('passwordField')}
              error={passwordFieldError}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                  >
                    <VisibilityOff />
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText className={passwordFieldError ? 'error' : ''}>
              6 to 20 characters are required for password.
            </FormHelperText>
          </FormControl>
        </form>

        <Button className="action-button"
          raised
          fullWidth
          color="default"
          onClick={this.handleAction}
        >
          login
        </Button>
      </Card>
    )
  }
}

// const mapState = (state, ownProps) => ({
//   // loginFields: state.loginFields,
// })
//
// const mapDispatch = (dispatch, ownProps) => ({
//   thisCheckLoginFields: () => {dispatch(checkLoginFields())},
// })

const LoginWrap = connect()(Login)

export default LoginWrap
