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

    return fetch(apiUrl)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Fail to get res with status ' + res.status)
        }

        res.json()
          .then((resJson) => {
            dispatch(fetchGithubDone(resJson))
          })
          .catch((error) => {
            dispatch(fetchGithubFail(error))
          })
      })
      .catch((error) => {
        dispatch(fetchGithubFail(error))
      })
  }
}
