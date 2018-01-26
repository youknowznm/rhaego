import React from 'react'
import {connect} from 'react-redux'
import {Card, Button} from 'material-ui'
import {FormControl, FormHelperText} from 'material-ui/Form';
import Input, {InputLabel} from 'material-ui/Input';
import {updateRegisterField, checkRegisterFields} from '../registerActions'

class Register extends React.Component {
  handleChange = (field) => (evt) => {
    const fieldName = field
    const fieldValue = evt.target.value
    this.props.thisUpdateRegisterField(fieldName, fieldValue)
  }
  handleAction = () => {
    this.props.thisCheckRegisterFields()
    // this.props.thisRequestRegister()
  }
  goBack = () => {
    window.history.go(-1)
  }
  render() {
    const {
      emailFieldValue,
      nicknameFieldValue,
      passwordFieldValue,
      confirmPasswordFieldValue,
      emailFieldError,
      nicknameFieldError,
      passwordFieldError,
      confirmPasswordFieldError,
      confirmPasswordFieldEnabled,
    } = this.props
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
              defaultValue={emailFieldValue}
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
              defaultValue={nicknameFieldValue}
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
              defaultValue={passwordFieldValue}
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
              defaultValue={confirmPasswordFieldValue}
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

const mapState = (state, ownProps) => {
  const thatRegisterFields = state.register.fields
  return {
    emailFieldValue: thatRegisterFields.emailField.value,
    nicknameFieldValue: thatRegisterFields.nicknameField.value,
    passwordFieldValue: thatRegisterFields.passwordField.value,
    confirmPasswordFieldValue: thatRegisterFields.confirmPasswordField.value,
    emailFieldError: thatRegisterFields.emailField.error,
    passwordFieldError: thatRegisterFields.passwordField.error,
    nicknameFieldError: thatRegisterFields.nicknameField.error,
    confirmPasswordFieldError: thatRegisterFields.confirmPasswordField.error,
    confirmPasswordFieldEnabled: thatRegisterFields.confirmPasswordField.enabled,
  };
}

const mapDispatch = (dispatch, ownProps) => ({
  thisUpdateRegisterField: (fieldName, fieldValue) => {
    dispatch(updateRegisterField(fieldName, fieldValue))
  },
  thisCheckRegisterFields: () => {
    dispatch(checkRegisterFields())
  },
  // thisRequestRegister: () => {
  //   console.log(this);
  //   // dispatch(requestRegister())
  // }
})

export default connect(mapState, mapDispatch)(Register)
