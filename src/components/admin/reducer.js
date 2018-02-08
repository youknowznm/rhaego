import {
  CHECK_LOGIN_STATUS,
} from './actionTypes'
import {createReducer} from 'redux-action-tools'

const defaultState = {
  status: 'initial',
  adminLoggedIn: false,
}

export default createReducer()
  .when(CHECK_LOGIN_STATUS, (state, action) => {
    return {
      ...state,
      status: 'loading'
    }
  })
  .done((state, action) => {
    return {
      ...state,
      status: 'completed',
      adminLoggedIn: true,
    }
  })
  .failed((state, action) => {
    return {
      ...state,
      status: 'failed',
      adminLoggedIn: false,
    }
  })