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


// class Login extends React.Component {
//   state = {
//     emailField: '',
//     emailFieldError: false,
//     passwordField: '',
//     passwordFieldError: false,
//     passwordVisible: false,
//   }
//   handleChange = (field) => (evt) => {
//     this.setState({
//       [field]: evt.target.value
//     })
//   }
//   toggleVisible = () => {
//     this.setState({
//       passwordVisible: !this.state.passwordVisible
//     })
//   }
//   checkLoginFields = () => {
//     let s = this.state
//     this.setState({
//       emailFieldError: false,
//       passwordFieldError: false,
//     })
//     setTimeout(() => {
//       // (zhngnmng)(@sina)(.com)(.cn)
//       const emailReg = /^([a-zA-Z0-9]+[\w-]*)(@[\w]{2,})(\.[\w]{2,4})(\.[\w]{2,4})?$/
//       this.setState({
//         emailFieldError: !emailReg.test(s.emailField)
//       })
//       // 12345678
//       const passwordReg = /^.{6,20}$/
//       this.setState({
//         passwordFieldError: !passwordReg.test(s.passwordField)
//       })
//     }, 250)
//   }
//   handleAction = () => {
//     this.checkLoginFields()
//   }
//   goBack = () => {
//     window.history.go(-1)
//   }
//   render() {
//     const {
//       emailFieldError,
//       passwordFieldError,
//       passwordVisible,
//     } = this.state
//     return (
//       <Card className="auth-content">
//         <form className="form login">
//           <FormControl fullWidth margin="normal" className="login-email">
//             <InputLabel htmlFor="login-email">
//               Email
//             </InputLabel>
//             <Input
//               id="login-email"
//               type="text"
//               error={emailFieldError}
//               onChange={this.handleChange('emailField')}
//             />
//             <FormHelperText className={emailFieldError ? 'error' : ''}>
//               Any common email format would do.
//             </FormHelperText>
//           </FormControl>
//
//           <FormControl fullWidth margin="normal">
//             <InputLabel htmlFor="login-password">
//               Password
//             </InputLabel>
//             <Input
//               id="login-password"
//               type={passwordVisible ? "text" : "password"}
//               onChange={this.handleChange('passwordField')}
//               error={passwordFieldError}
//               endAdornment={
//                 <InputAdornment position="end">
//                   <IconButton onClick={this.toggleVisible}
//                   >
//                     {passwordVisible ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               }
//             />
//             <FormHelperText className={passwordFieldError ? 'error' : ''}>
//               6 to 20 characters are required for password.
//             </FormHelperText>
//           </FormControl>
//         </form>
//
//         <div className="buttons">
//           <Button className="action-button"
//             raised
//             fullWidth
//             color="primary"
//             onClick={this.handleAction}
//           >
//             login
//           </Button>
//           <Button className="action-button"
//             raised
//             fullWidth
//             color="default"
//             onClick={this.goBack}
//           >
//             cancel
//           </Button>
//         </div>
//       </Card>
//     )
//   }
// }
//
// // const mapState = (state, ownProps) => ({
// //   // loginFields: state.loginFields,
// // })
// //
// // const mapDispatch = (dispatch, ownProps) => ({
// //   thisCheckLoginFields: () => {dispatch(checkLoginFields())},
// // })
//
// const LoginWrap = connect()(Login)
//
// export default LoginWrap
