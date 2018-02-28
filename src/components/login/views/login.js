import React from 'react'
import {connect} from 'react-redux'
import {Card, IconButton, Button, Typography} from 'material-ui'
import {FormControl, FormHelperText} from 'material-ui/Form'
import Input, {InputLabel, InputAdornment} from 'material-ui/Input'
import {Visibility, VisibilityOff} from 'material-ui-icons'
import {
  getQueryObj,
  AsyncButton,
  changeDocTitle,
} from '../../../utils'
import {
  updateLoginField,
  checkLoginFields,
  togglePasswordVisibility,
  requestLogin,
  requestLoginInit,
} from '../actions'

import './login.css'

class Login extends React.Component {
  componentDidMount() {
    changeDocTitle('管理员登录')
  }
  onChangeValue = (field) => (evt) => {
    const fieldName = field
    const fieldValue = evt.target.value
    this.props.thisUpdateLoginField(fieldName, fieldValue)
  }
  componentWillUpdate (nextProps) {
    switch (nextProps.loginRequestStatus) {
      case 'loading':
        if (nextProps.fieldsValid === true) {
          const loginFields = {
            email: this.props.emailValue,
            password: this.props.passwordValue,
          }
          this.props.thisRequestLogin(loginFields)
        }
        break
      case 'failed':
        setTimeout(() => {
          this.props.thisRequestLoginInit()
        }, 2000)
        break
      case 'completed':
        setTimeout(() => {
          this.backToReferer()
        }, 2000)
        break
      default:
        break
    }
  }
  backToReferer = () => {
    const referer = getQueryObj().referer
    if (referer !== undefined) {
      window.location.assign(referer)
    } else {
      window.history.go(-1)
    }
  }
  render() {
    const {
      emailError,
      passwordError,
      passwordVisible,
      thisTogglePasswordVisibility,
      loginRequestStatus,
      thisCheckLoginFields,
      loginRequestResultMessage,
    } = this.props
    return (
      <div className="login-wrap">
        <Card className="login">
          <Typography className="info" component="i" type="caption">
            以管理员身份登录，管理文章和评论。
          </Typography>
          <form className="form">
            <FormControl fullWidth margin="dense">
              <InputLabel htmlFor="login-email">
                邮箱地址
              </InputLabel>
              <Input
                id="login-email"
                type="text"
                onChange={this.onChangeValue('email')}
                error={emailError}
                inputProps={{
                  'maxLength': '30',
                }}
              />
              <FormHelperText className={emailError ? 'error' : ''}>
                输入常见的邮箱格式。
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth margin="dense">
              <InputLabel htmlFor="login-password">
                密码
              </InputLabel>
              <Input
                id="login-password"
                type={passwordVisible ? "text" : "password"}
                onChange={this.onChangeValue('password')}
                error={passwordError}
                inputProps={{
                  'maxLength': '20',
                }}
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
                密码由6至20个字符组成。
              </FormHelperText>
            </FormControl>

          </form>

          <div className="buttons">
            <AsyncButton
              asyncStatus={loginRequestStatus}
              className="action-button"
              onClick={thisCheckLoginFields}
              asyncResultMessage={loginRequestResultMessage}
              color="primary"
              fullWidth
              raised
            >
              登录
            </AsyncButton>
            <Button className="action-button"
              raised
              fullWidth
              color="default"
              onClick={this.backToReferer}
            >
              取消
            </Button>
          </div>

        </Card>
      </div>
    )
  }
}

const mapState = (state) => {
  const thatLoginFields = state.login.loginFields
  return {
    emailValue: thatLoginFields.email.value,
    emailError: thatLoginFields.email.error,
    passwordValue: thatLoginFields.password.value,
    passwordError: thatLoginFields.password.error,
    passwordVisible: thatLoginFields.password.visible,
    loginRequestStatus: state.login.loginRequestStatus,
    fieldsValid: state.login.fieldsValid,
    loginRequestResultMessage: state.login.loginRequestResultMessage,
  }
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
  thisRequestLogin: (loginFields) => {
    dispatch(requestLogin(loginFields))
  },
  thisRequestLoginInit: () => {
    dispatch(requestLoginInit())
  },
})

export default connect(mapState, mapDispatch)(Login)
