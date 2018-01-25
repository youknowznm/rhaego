import {
  SWITCH_AUTH_TAB,

  UPDATE_REGISTER_FIELD,
  CHECK_REGISTER_FIELDS,

  REQUEST_REGISTER_START,
  REQUEST_REGISTER_FAIL,
  REQUEST_REGISTER_DONE,

} from './actionTypes'

const thisState = {
  activeTabValue: 1,

  registerFields: {
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
    },
  },
  registerFieldsValid: true,

  registerStatus: 'loading',
  registerResult: null,
}

export default (state = thisState, action) => {
  switch (action.type) {
    case SWITCH_AUTH_TAB:
      return {
        ...state,
        activeTabValue: action.targetTabValue
      }

    case UPDATE_REGISTER_FIELD:
      const newRegisterFields = state.registerFields
      newRegisterFields[action.fieldName].value = action.fieldValue
      return {
        ...state,
        registerFields: newRegisterFields
      }
    case CHECK_REGISTER_FIELDS:
      const registerFieldsToCheck = state.registerFields
      // (zhngnmng)(@sina)(.com)(.cn)
      const emailReg = /^([a-zA-Z0-9]+[\w-]*)(@[\w]{2,})(\.[\w]{2,4})(\.[\w]{2,4})?$/
      registerFieldsToCheck.emailField.error = !emailReg.test(registerFieldsToCheck.emailField.value)
      // 张三abc123
      const nicknameReg = /^[a-zA-Z0-9\u4E00-\u9FA5]{2,10}$/
      registerFieldsToCheck.nicknameField.error = !nicknameReg.test(registerFieldsToCheck.nicknameField.value)
      // 12345678
      const passwordReg = /^.{6,20}$/
      registerFieldsToCheck.passwordField.error = !passwordReg.test(registerFieldsToCheck.passwordField.value)
      // 只检查confirmPassword是否和password全等
      registerFieldsToCheck.confirmPasswordField.error = registerFieldsToCheck.passwordField.value !== registerFieldsToCheck.confirmPasswordField.value
      return {
        ...state,
        registerFields: registerFieldsToCheck
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
