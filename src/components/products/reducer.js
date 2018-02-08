import {FETCH_GITHUB} from './actionTypes'
import {createReducer} from 'redux-action-tools'

const defaultState = {
  status: 'initial',
  productsData: [],
  statusMsg: '',
}

export default createReducer()
  .when(FETCH_GITHUB, (state, action) => {
    return {
      ...state,
      status: 'loading',
    }
  })
  .done((state, action) => {
    const data = action.payload.data
    let productsData = data.sort((p1, p2) => {
      return -(p1.stargazers_count - p2.stargazers_count)
    })
    return {
      ...state,
      status: 'completed',
      statusMsg: 'Fetch completed.',
      productsData,
    }
  })
  .failed((state, action) => {
    return {
      ...state,
      status: 'failed',
      statusMsg: 'Fetch failed. Please try again later.',
      productsData: [],
    }
  })
  .build(defaultState)
