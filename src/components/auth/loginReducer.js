import {
  UPDATE_LOGIN_FIELD,
  CHECK_LOGIN_FIELDS,
  SWITCH_LOGIN_PASSWORD_VISIBILITY,
} from './actionTypes'

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

// (zhngnmng)(@sina)(.com)(.cn)
const emailReg = /^([a-zA-Z0-9]+[\w-]*)(@[\w]{2,})(\.[\w]{2,4})(\.[\w]{2,4})?$/
// 12345678
const passwordReg = /^.{6,20}$/

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
    case SWITCH_LOGIN_PASSWORD_VISIBILITY:
      // TODO
      return {
        ...state,
        fields: newfields
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
