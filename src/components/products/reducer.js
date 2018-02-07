import {FETCH_GITHUB} from './actionTypes'
import {createReducer} from 'redux-action-tools'
import {fetchGithub} from './actions'

const defaultState = {
  status: 'initial',
  productsData: [],
  statusMsg: '',
}

export default createReducer()
  .when(FETCH_GITHUB, (oldState, action) => oldState)
  .done((state, action) => {
    const data = action.payload.data
    let productsData = data.sort((p1, p2) => {
      return -(p1.stargazers_count - p2.stargazers_count)
    })
    return {
      ...state,
      status: 'success',
      statusMsg: 'Fetch completed.',
      productsData,
    }
  })
  .failed((state, action) => {
    return {
      ...state,
      status: 'failure',
      statusMsg: 'Fetch failed. Please try again later.',
      productsData: [],
    }
  })
  .build(defaultState)
