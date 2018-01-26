import {
  UPDATE_REGISTER_FIELD,
  CHECK_REGISTER_FIELDS,
  REQUEST_REGISTER_START,
  REQUEST_REGISTER_FAIL,
  REQUEST_REGISTER_DONE,
} from './actionTypes'
import {regexps} from '../../utils/'

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

const {emailReg, passwordReg, nicknameReg} = regexps

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
