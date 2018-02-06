import {
  CHECK_LOGIN_STATUS,
  CHECK_LOGIN_STATUS_INIT,
  CHECK_LOGIN_STATUS_START,
  CHECK_LOGIN_STATUS_DONE,
  CHECK_LOGIN_STATUS_FAIL,
} from './actionTypes'

const defaultState = {
  status: 'initial',
  adminLoggedIn: false,
}

export default (state = defaultState, action) => {
  switch (action.type) {

    case CHECK_LOGIN_STATUS_INIT: {
      return {
        ...state,
        status: 'initial',
        adminLoggedIn: false,
      };
    }

    case CHECK_LOGIN_STATUS_START: {
      return {
        ...state,
        status: 'loading',
        adminLoggedIn: false,
      };
    }

    case FETCH_GITHUB_DONE: {
      return {
        ...state,
        status: 'success',
        adminLoggedIn: true,
      };
    }

    case FETCH_GITHUB_FAIL: {
      return {
        status: 'failure',
        adminLoggedIn: false,
      };
    }

    default: {
      return state;
    }
  }
}
