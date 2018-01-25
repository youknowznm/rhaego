import {
  UPDATE_REGISTER_FIELD,
  CHECK_REGISTER_FIELDS,

  REQUEST_REGISTER_START,
  REQUEST_REGISTER_FAIL,
  REQUEST_REGISTER_DONE,

} from './actionTypes'

const thisState = {
  fields: {
    emailField: {
      value: '',
      error: false,
    },
    nicknameField: {
      value: '',
      error: false,
    },
    passwordField: {
      value: '',
      error: false,
    },
    confirmPasswordField: {
      value: '',
      error: false,
      enabled: false,
    },
  },
  fieldsValid: true,
}

// (zhngnmng)(@sina)(.com)(.cn)
const emailReg = /^([a-zA-Z0-9]+[\w-]*)(@[\w]{2,})(\.[\w]{2,4})(\.[\w]{2,4})?$/
// 12345678
const passwordReg = /^.{6,20}$/
// 张三abc123
const nicknameReg = /^[a-zA-Z0-9\-\u9FA5]{2,10}$/

export default (state = thisState, action) => {
  switch (action.type) {
    case UPDATE_REGISTER_FIELD:
      const {fieldName, fieldValue} = action
      const newfields = state.fields
      newfields[fieldName].value = fieldValue
      if (fieldName === 'passwordField') {
        const enabled = newfields.passwordField.value !== ''
        newfields.confirmPasswordField.enabled = enabled
      }
      return {
        ...state,
        fields: newfields
      }
    case CHECK_REGISTER_FIELDS:
      const fieldsToCheck = state.fields
      const emailError = !emailReg.test(fieldsToCheck.emailField.value)
      fieldsToCheck.emailField.error = emailError
      const nicknameError = !nicknameReg.test(fieldsToCheck.nicknameField.value)
      fieldsToCheck.nicknameField.error = nicknameError
      const passwordError = !passwordReg.test(fieldsToCheck.passwordField.value)
      fieldsToCheck.passwordField.error = passwordError
      // 只检查confirmPassword是否和password全等
      const confirmPasswordError = fieldsToCheck.passwordField.value !== fieldsToCheck.confirmPasswordField.value
      fieldsToCheck.confirmPasswordField.error = confirmPasswordError
      return {
        ...state,
        fields: fieldsToCheck
      }

    case REQUEST_REGISTER_START:
      return {
        ...state,
        status: 'loading',
        registerResult: null,
      }
    case REQUEST_REGISTER_DONE:
      return {
        ...state,
        status: 'success',
        registerResult: action.r.data,
      }
    case REQUEST_REGISTER_FAIL:
      return {
        ...state,
        status: 'failure',
        registerResult: action.e,
      }
    default:
      return state
  }
}


// import {
//   SWITCH_AUTH_TAB,
//
//   UPDATE_REGISTER_FIELD,
//   CHECK_REGISTER_FIELDS,
//
//   UPDATE_LOGIN_FIELD,
//   CHECK_LOGIN_FIELDS,
//
//   REQUEST_REGISTER_START,
//   REQUEST_REGISTER_FAIL,
//   REQUEST_REGISTER_DONE,
//
// } from './actionTypes'
//
// const thisState = {
//   activeTabValue: 1,
//
//   fields: {
//     emailField: {
//       value: '',
//       error: false,
//     },
//     nicknameField: {
//       value: '',
//       error: false,
//     },
//     passwordField: {
//       value: '',
//       error: false,
//     },
//     confirmPasswordField: {
//       value: '',
//       error: false,
//       enabled: false,
//     },
//   },
//   fieldsValid: true,
//
//   loginFields: {
//     emailField: {
//       value: '',
//       error: false,
//     },
//     passwordField: {
//       value: '',
//       error: false,
//     },
//   },
//   loginFieldsValid: true,
//
//   registerStatus: 'loading',
//   registerResult: null,
// }
//
// // (zhngnmng)(@sina)(.com)(.cn)
// const emailReg = /^([a-zA-Z0-9]+[\w-]*)(@[\w]{2,})(\.[\w]{2,4})(\.[\w]{2,4})?$/
// // 12345678
// const passwordReg = /^.{6,20}$/
// // 张三abc123
// const nicknameReg = /^[a-zA-Z0-9\-\u9FA5]{2,10}$/
//
// export default (state = thisState, action) => {
//   switch (action.type) {
//     case SWITCH_AUTH_TAB:
//       return {
//         ...state,
//         activeTabValue: action.targetTabValue
//       }
//
//     case UPDATE_REGISTER_FIELD:
//       const {fieldName, fieldValue} = action
//       const newfields = state.fields
//       newfields[fieldName].value = fieldValue
//       if (fieldName === 'passwordField') {
//         const enabled = newfields.passwordField.value !== ''
//         newfields.confirmPasswordField.enabled = enabled
//       }
//       return {
//         ...state,
//         fields: newfields
//       }
//     case CHECK_REGISTER_FIELDS:
//       const fieldsToCheck = state.fields
//       const registerEmailError = !emailReg.test(fieldsToCheck.emailField.value)
//       fieldsToCheck.emailField.error = registerEmailError
//       const registerNicknameError = !nicknameReg.test(fieldsToCheck.nicknameField.value)
//       fieldsToCheck.nicknameField.error = registerNicknameError
//       const registerPasswordError = !passwordReg.test(fieldsToCheck.passwordField.value)
//       fieldsToCheck.passwordField.error = registerPasswordError
//       // 只检查confirmPassword是否和password全等
//       const registerConfirmPasswordError = fieldsToCheck.passwordField.value !== fieldsToCheck.confirmPasswordField.value
//       fieldsToCheck.confirmPasswordField.error = registerConfirmPasswordError
//       return {
//         ...state,
//         fields: fieldsToCheck
//       }
//
//     case UPDATE_LOGIN_FIELD:
//       const {loginFieldName, loginFieldValue} = action
//       const newLoginFields = state.loginFields
//       newLoginFields[loginFieldName].value = loginFieldValue
//       if (loginFieldName === 'passwordField') {
//         const enabled = newLoginFields.passwordField.value !== ''
//         newLoginFields.confirmPasswordField.enabled = enabled
//       }
//       return {
//         ...state,
//         loginFields: newLoginFields
//       }
//     case CHECK_LOGIN_FIELDS:
//       const loginFieldsToCheck = state.loginields
//       const loginEmailError = !emailReg.test(loginFieldsToCheck.emailField.value)
//       loginFieldsToCheck.emailField.error = loginEmailError
//
//       const loginPasswordError = !passwordReg.test(loginFieldsToCheck.passwordField.value)
//       loginFieldsToCheck.passwordField.error = loginPasswordError
//       return {
//         ...state,
//         loginFields: loginFieldsToCheck
//       }
//
//     case REQUEST_REGISTER_START:
//       return {
//         ...state,
//         status: 'loading',
//         registerResult: null,
//       }
//     case REQUEST_REGISTER_DONE:
//       return {
//         ...state,
//         status: 'success',
//         registerResult: action.r.data,
//       }
//     case REQUEST_REGISTER_FAIL:
//       return {
//         ...state,
//         status: 'failure',
//         registerResult: action.e,
//       }
//     default:
//       return state
//   }
// }
