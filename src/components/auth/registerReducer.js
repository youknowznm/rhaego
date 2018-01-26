import {
  UPDATE_REGISTER_FIELD,
  CHECK_REGISTER_FIELDS,
  REQUEST_REGISTER_START,
  REQUEST_REGISTER_FAIL,
  REQUEST_REGISTER_DONE,
  REQUEST_REGISTER_RESET,
} from './actionTypes'
import {regexps} from '../../utils/'

const thisState = {
  fields: {
    emailField: {
      value: 'znm92@icoud.com',
      error: false,
    },
    nicknameField: {
      value: 'icloud',
      error: false,
    },
    passwordField: {
      value: '123123',
      error: false,
    },
    confirmPasswordField: {
      value: '123123',
      error: false,
      enabled: false,
    },
  },
  registerStatus: 'initial',
  registerResult: null,
  allFieldsValid: false,
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
      const allFieldsValid =
        !emailError && !nicknameError && !passwordError && !confirmPasswordError
      return {
        ...state,
        fields: fieldsToCheck,
        allFieldsValid,
      }

    case REQUEST_REGISTER_START:
      return {
        ...state,
        registerStatus: 'loading',
        registerResult: null,
      }
    case REQUEST_REGISTER_DONE:
      return {
        ...state,
        registerStatus: 'success',
        registerResult: action.r.data,
      }
    case REQUEST_REGISTER_FAIL:
      console.log('failed');
      return {
        ...state,
        registerStatus: 'failure',
        registerResult: action.e,
      }
    case REQUEST_REGISTER_RESET:
      return {
        ...state,
        registerStatus: 'initial',
        registerResult: null,
      }
    default:
      return state
  }
}
