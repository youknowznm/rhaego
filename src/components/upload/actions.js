import {
  UPLOAD_PICTURE,
  UPLOAD_PICTURE_INIT,
} from './actionTypes'
import {createAsyncAction} from 'redux-action-tools'
import {uploadPicture as uploadPictureAPI} from '../../api'
import axios from 'axios'

export const uploadPictureInit = () => ({
  type: UPLOAD_PICTURE_INIT,
})
export const uploadPicture = createAsyncAction(UPLOAD_PICTURE, (pictureFile) => {
  const form = new FormData()
  form.append('pictureFile', pictureFile)
  return axios.post(
    uploadPictureAPI,
    form,
    {
      headers: {'Content-Type': 'multipart/form-data'},
    }
  )
})
