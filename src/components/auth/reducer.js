import {
  UPDATE_AUTH_FIELD,
  CHECK_AUTH_FIELDS,
  TOGGLE_PASSWORD_VISIBILITY,
  REQUEST_AUTH_INIT,
  REQUEST_AUTH_START,
  REQUEST_AUTH_DONE,
  REQUEST_AUTH_FAIL,
} from './actionTypes'
import {regexps} from '../../utils/'

const thisState = {
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
  authRequestStatus: 'initial',
  authRequestErrorMessage: '',
  authRequestResult: null,
}

const {emailReg, passwordReg} = regexps

export default (state = thisState, action) => {
  console.log(state.authRequestStatus);
  switch (action.type) {

    case UPDATE_AUTH_FIELD:
      const {fieldName, fieldValue} = action
      const newfields = state.fields
      newfields[fieldName].value = fieldValue
      return {
        ...state,
        fields: newfields
      }

    case TOGGLE_PASSWORD_VISIBILITY:
      const fieldsToSwitch = state.fields
      fieldsToSwitch.password.visible =
        !fieldsToSwitch.password.visible
      return {
        ...state,
        fields: fieldsToSwitch
      }

    case CHECK_AUTH_FIELDS:
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
        authRequestStatus: fieldsValid ? 'loading' : 'initial',
      }

    case REQUEST_AUTH_INIT:
      return {
        ...state,
        authRequestStatus: 'initial',
        authRequestResult: null,
      };

    case REQUEST_AUTH_START:
      return {
        ...state,
        authRequestStatus: 'loading',
        authRequestResult: null,
      };

    case REQUEST_AUTH_DONE:
      return {
        ...state,
        authRequestStatus: 'success',
        authRequestResult: action.r.data,
      };

    case REQUEST_AUTH_FAIL:
      return {
        ...state,
        authRequestStatus: 'failure',
        authRequestResult: null,
        authRequestErrorMessage: action.e.toString(),
      };

    default:
      return state
  }
}
