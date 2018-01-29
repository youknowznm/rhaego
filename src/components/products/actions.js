import {FETCH_GITHUB_START, FETCH_GITHUB_DONE, FETCH_GITHUB_FAIL} from './actionTypes'
import axios from 'axios'
import {fetchGithub as fetchGithubApi} from '../../api'

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
    dispatch(fetchGithubStart())
    return axios
      .get(fetchGithubApi)
      .then((r) => {
        if (r.status !== 200) {
          throw new Error('Fail to get response with status ' + r.status)
        }
        dispatch(fetchGithubDone(r))
      })
      .catch((e) => {
        console.log('github fetch err:', e);
        dispatch(fetchGithubFail(e))
      })
  }
}
