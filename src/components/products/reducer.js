import {FETCH_GITHUB_START, FETCH_GITHUB_FAIL, FETCH_GITHUB_DONE} from './actionTypes'
import * as Status from './status.js';

export default (state = {status: Status.LOADING}, action) => {
  switch(action.type) {
    case FETCH_GITHUB_START: {
      return {status: Status.LOADING};
    }
    case FETCH_GITHUB_DONE: {
      let productsData = action.res.sort((p1, p2) => {
        return -(p1.stargazers_count - p2.stargazers_count)
      })
      return {...state, status: Status.SUCCESS, productsData,};
    }
    case FETCH_GITHUB_FAIL: {
      return {status: Status.FAILURE};
    }
    default: {
      return state;
    }
  }
}
