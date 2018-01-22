import {FETCH_GITHUB_START, FETCH_GITHUB_DONE, FETCH_GITHUB_FAIL} from './actionTypes'
import axios from 'axios'

import {githubUsername} from '../../config'

export const fetchGithubStart = () => ({
  type: FETCH_GITHUB_START,
})

export const fetchGithubDone = (res) => ({
  type: FETCH_GITHUB_DONE,
  res,
})

export const fetchGithubFail = (err) => ({
  type: FETCH_GITHUB_FAIL,
  err,
})

export const fetchGithub = () => {
  return (dispatch) => {
    const apiUrl = `https://api.github.com/users/${githubUsername}/repos?visibility=public`

    dispatch(fetchGithubStart())

    return axios.get(apiUrl)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Fail to get res with status ' + res.status)
        }
        dispatch(fetchGithubDone(res))
      })
      .catch((error) => {
        console.log('github fetch err:', error);
        dispatch(fetchGithubFail(error))
      })
  }
}

// 198.13.49.156
