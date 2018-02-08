import {
  CHECK_LOGIN_STATUS,
} from './actionTypes'
import axios from 'axios'
import {checkLoginStatus as checkLoginStatusApi} from '../../api'
import {createAsyncAction} from 'redux-action-tools'
  
export const checkLoginStatus = createAsyncAction(CHECK_LOGIN_STATUS, () => {
  return axios.get(checkLoginStatusApi)
})