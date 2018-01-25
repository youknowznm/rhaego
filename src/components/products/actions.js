import {FETCH_GITHUB_START, FETCH_GITHUB_DONE, FETCH_GITHUB_FAIL} from './actionTypes'
import axios from 'axios'

import {githubUsername} from '../../config'

export const fetchGithubStart = () => ({
  type: FETCH_GITHUB_START,
})

export const fetchGithubDone = (r) => ({
  type: FETCH_GITHUB_DONE,
  r,
})

export const fetchGithubFail = (e) => ({
  type: FETCH_GITHUB_FAIL,
  e,
})

export const fetchGithub = () => {
  return (dispatch) => {
    const apiUrl = `https://api.github.com/users/${githubUsername}/repos?visibility=public`

    dispatch(fetchGithubStart())

    return axios
      .get(apiUrl)
      .then((r) => {
        if (r.status !== 200) {
          throw new Error('Fail to get r with status ' + r.status)
        }
        dispatch(fetchGithubDone(r))
      })
      .catch((e) => {
        console.log('github fetch err:', e);
        dispatch(fetchGithubFail(e))
      })
  }
}

// 198.13.49.156
