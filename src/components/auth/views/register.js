import React from 'react'
import {Card, TextField, IconButton, Button} from 'material-ui'
import {FormControl, FormHelperText} from 'material-ui/Form';
import Input, {InputLabel} from 'material-ui/Input';

class Register extends React.Component {
  state = {
    emailField: '',
    emailFieldError: false,
    nicknameField: '',
    nicknameFieldError: false,
    passwordField: '',
    passwordFieldError: false,
    confirmPasswordField: '',
    confirmPasswordFieldError: false,
    confirmPasswordFieldEnabled: false,
  }
  handleChange = (field) => (evt) => {
    this.setState({
      [field]: evt.target.value
    })
    if (field === 'passwordField') {
      setTimeout(() => {
        this.setState({
          confirmPasswordFieldEnabled: this.state.passwordField !== ''
        })
      }, 5)
    }
  }
  checkLoginFields = () => {
    let s = this.state
    this.setState({
      emailFieldError: false,
      nicknameFieldError: false,
      passwordFieldError: false,
      confirmPasswordFieldError: false,
    })
    setTimeout(() => {
      // (zhngnmng)(@sina)(.com)(.cn)
      const emailReg = /^([a-zA-Z0-9]+[\w-]*)(@[\w]{2,})(\.[\w]{2,4})(\.[\w]{2,4})?$/
      this.setState({
        emailFieldError: !emailReg.test(s.emailField)
      })
      // 张三abc123
      const nicknameReg = /^[a-zA-Z0-9\u4E00-\u9FA5]{2,10}$/
      this.setState({
        nicknameFieldError: !nicknameReg.test(s.nicknameField)
      })
      // 12345678
      const passwordReg = /^.{6,20}$/
      this.setState({
        passwordFieldError: !passwordReg.test(s.passwordField)
      })
      // 只检查confirmPassword是否和password全等
      this.setState({
        confirmPasswordFieldError: s.passwordField !== s.confirmPasswordField
      })
    }, 250)
  }
  handleAction = () => {
    this.checkLoginFields()
  }
  goBack = () => {
    window.history.go(-1)
  }
  render() {
    const {
      emailFieldError,
      nicknameFieldError,
      passwordFieldError,
      confirmPasswordFieldError,
      confirmPasswordFieldEnabled,
    } = this.state
    return (
      <Card className="auth-content">
        <form className="form register">
          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="register-email">
              Email
            </InputLabel>
            <Input
              id="register-email"
              type="text"
              onChange={this.handleChange('emailField')}
              error={emailFieldError}
            />
            <FormHelperText className={emailFieldError ? 'error' : ''}>
              Any common email format would do.
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="register-nickname">
              Nickname
            </InputLabel>
            <Input
              id="register-nickname"
              type="text"
              onChange={this.handleChange('nicknameField')}
              error={nicknameFieldError}
            />
            <FormHelperText className={nicknameFieldError ? 'error' : ''}>
              Nickname consists of 2 to 10 characters.
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="register-password">
              Password
            </InputLabel>
            <Input
              id="register-password"
              type="password"
              onChange={this.handleChange('passwordField')}
              error={passwordFieldError}
            />
            <FormHelperText className={passwordFieldError ? 'error' : ''}>
              6 to 20 characters are required for password.
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth margin="dense">
            <InputLabel htmlFor="register-confirm-password">
              Confirm Password
            </InputLabel>
            <Input
              id="register-confirm-password"
              type="password"
              disabled={!confirmPasswordFieldEnabled}
              onChange={this.handleChange('confirmPasswordField')}
              error={confirmPasswordFieldError}
            />
            <FormHelperText className={confirmPasswordFieldError ? 'error' : ''}>
              Type your password again.
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
            register
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

export default Register
