import {
  FETCH_RESUME_INIT,
  FETCH_RESUME,
} from './actionTypes'
import {createAsyncAction} from 'redux-action-tools'
import {resume as resumeAPI} from '../../api'
import axios from 'axios'

export const fetchResumeInit = () => ({
  type: FETCH_RESUME_INIT,
})
export const fetchResume = createAsyncAction(
  FETCH_RESUME,
  () => {
    return axios.get(resumeAPI)
  }
)
