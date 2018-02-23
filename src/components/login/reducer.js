import {
  UPDATE_LOGIN_FIELD,
  TOGGLE_PASSWORD_VISIBILITY,

  CHECK_LOGIN_FIELDS,

  REQUEST_LOGIN_INIT,
  REQUEST_LOGIN_COMPLETED,
  REQUEST_LOGIN_FAILED,
} from './actionTypes'
import {regexps} from '../../utils/'

const defaultState = {
  fields: {
    email: {
      value: '',
      error: false,
    },
    password: {
      value: '',
      error: false,
      visible: false,
    },
  },
  fieldsValid: true,
  loginRequestStatus: 'initial',
  loginRequestResultMessage: '',
}

const {
  emailReg,
  passwordReg,
} = regexps.login

export default (state = defaultState, action) => {
  switch (action.type) {

    // 更新登录字段
    case UPDATE_LOGIN_FIELD:
      const {fieldName, fieldValue} = action
      const newfields = state.fields
      newfields[fieldName].value = fieldValue
      return {
        ...state,
        fields: newfields
      }

    // 切换密码的可见状态
    case TOGGLE_PASSWORD_VISIBILITY:
      const fieldsToSwitch = state.fields
      fieldsToSwitch.password.visible =
        !fieldsToSwitch.password.visible
      return {
        ...state,
        fields: fieldsToSwitch
      }

    // 检查登录字段是否全部有效
    case CHECK_LOGIN_FIELDS:
      const fieldsToCheck = state.fields
      const emailError = !emailReg.test(fieldsToCheck.email.value)
      fieldsToCheck.email.error = emailError
      const passwordError = !passwordReg.test(fieldsToCheck.password.value)
      fieldsToCheck.password.error = passwordError
      const fieldsValid = !emailError && !passwordError
      return {
        ...state,
        fields: fieldsToCheck,
        fieldsValid,
        loginRequestStatus: fieldsValid ? 'loading' : 'initial',
      }

    // 初始化登录状态
    case REQUEST_LOGIN_INIT:
      return {
        ...state,
        loginRequestStatus: 'initial',
      }

    // 登录成功
    case REQUEST_LOGIN_COMPLETED:
      const resultData = action.payload.data
      localStorage.setItem('adminLoggedIn', 'true')
      return {
        ...state,
        loginRequestStatus: 'completed',
        loginRequestResultMessage: resultData.msg,
      }

    // 登录失败
    case REQUEST_LOGIN_FAILED:
      const errorData = action.payload.response.data
      return {
        ...state,
        loginRequestStatus: 'failed',
        loginRequestResultMessage: typeof errorData === 'string' ? errorData : errorData.msg,
      }

    default:
      return state
  }
}
