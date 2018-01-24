import {SWITCH_AUTH_TAB} from './actionTypes'

const thisState = {
  activeTabValue: 0,
  loginFields: {
    email: '',
    password: '',
  },
  registerFields: {
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  },
}

export default (state = thisState, action) => {
  switch (action.type) {
    case SWITCH_AUTH_TAB:
      return {...state, activeTabValue: action.targetTabValue};
    default:
      return state;
  }
}
