import {FETCH_GITHUB} from './actionTypes'
import axios from 'axios'
import {fetchGithub as fetchGithubApi} from '../../api'

import {createAsyncAction} from 'redux-action-tools'

export const fetchGithub = createAsyncAction(FETCH_GITHUB, (g, dispatch, getState) => {
  // return axios.get('https://api.github.com/users/youknowznm/reposs')
  return axios.get(fetchGithubApi)
})
