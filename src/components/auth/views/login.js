import React from 'react'
import {connect} from 'react-redux'
import {Card, TextField, IconButton, Button} from 'material-ui'
import {FormControl, FormHelperText} from 'material-ui/Form';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import {Visibility, VisibilityOff} from 'material-ui-icons';
import purple from 'material-ui/colors/purple';

class Login extends React.Component {
  // constructor() {
  //   super(...arguments)
  //   this.state = {
  //     loginFields: {
  //       email: '',
  //       password: '',
  //     },
  //   }
  // }

  state = {
    emailField: '',
    passwordField: '',
    emailFieldError: false,
    passwordFieldError: false,
  }

  handleChange = (field) => (evt) => {
    this.setState({
      [field]: evt.target.value
    })
  }

  checkLoginFields = () => {

  }

  render() {
    const {emailFieldError, passwordFieldError} = this.state
    return (
      <Card className="auth-content">
        <form className="form login">
          <FormControl fullWidth margin="normal">
            <InputLabel
              htmlFor="login-email"
              aria-describedby="email-helper-text"
            >
              Email
            </InputLabel>
            <Input
              id="login-email"
              type="text"
              error={emailFieldError}
              onChange={this.handleChange('emailField')}
            />
            <FormHelperText id="email-helper-text">
              Type your registered email.
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel
              htmlFor="login-password"
              aria-describedby="password-helper-text"
            >
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
            <FormHelperText id="password-helper-text">
              2 to 10 characters are required for password.
            </FormHelperText>
          </FormControl>
        </form>

        <Button className="action-button"
          raised
          fullWidth
          color="default"
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
