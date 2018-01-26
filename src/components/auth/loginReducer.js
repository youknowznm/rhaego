import {
  UPDATE_LOGIN_FIELD,
  CHECK_LOGIN_FIELDS,
  TOGGLE_LOGIN_PASSWORD_VISIBILITY,
} from './actionTypes'
import {regexps} from '../../utils/'

const thisState = {
  fields: {
    emailField: {
      value: '',
      error: false,
    },
    passwordField: {
      value: '',
      error: false,
      visible: false,
    },
  },
  fieldsValid: true,
}

const {emailReg, passwordReg} = regexps

export default (state = thisState, action) => {
  switch (action.type) {
    case UPDATE_LOGIN_FIELD:
      const {fieldName, fieldValue} = action
      const newfields = state.fields
      newfields[fieldName].value = fieldValue
      return {
        ...state,
        fields: newfields
      }
    case TOGGLE_LOGIN_PASSWORD_VISIBILITY:
      const fieldsToSwitch = state.fields
      fieldsToSwitch.passwordField.visible = !fieldsToSwitch.passwordField.visible
      return {
        ...state,
        fields: fieldsToSwitch
      }
    case CHECK_LOGIN_FIELDS:
      const fieldsToCheck = state.fields
      const EmailError = !emailReg.test(fieldsToCheck.emailField.value)
      fieldsToCheck.emailField.error = EmailError

      const PasswordError = !passwordReg.test(fieldsToCheck.passwordField.value)
      fieldsToCheck.passwordField.error = PasswordError
      return {
        ...state,
        fields: fieldsToCheck
      }
    default:
      return state
  }
}
