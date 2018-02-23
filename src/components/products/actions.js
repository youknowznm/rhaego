import {FETCH_GITHUB} from './actionTypes'
import axios from 'axios'
import {fetchGithub as fetchGithubAPI} from '../../api'

import {createAsyncAction} from 'redux-action-tools'

export const fetchGithub = createAsyncAction(
  FETCH_GITHUB, () => {
    return axios.get(fetchGithubAPI)
  }
)
