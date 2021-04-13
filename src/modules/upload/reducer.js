import {
  UPLOAD_PICTURE_INIT,
  UPLOAD_PICTURE,
  UPLOAD_PICTURE_COMPLETED,
  UPLOAD_PICTURE_FAILED,
} from './actionTypes'

const defaultState = {
  requestUploadStatus: '',
  uploadResultMessage: '',
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case UPLOAD_PICTURE_INIT:
      return {
        ...state,
        requestUploadStatus: 'initial',
        uploadResultMessage: '',
      }
    case UPLOAD_PICTURE:
      return {
        ...state,
        requestUploadStatus: 'loading',
        uploadResultMessage: '',
      }
    case UPLOAD_PICTURE_COMPLETED:
      const resultData = action.payload.data
      return {
        ...state,
        requestUploadStatus: 'completed',
        uploadResultMessage: resultData.msg,
      }
    case UPLOAD_PICTURE_FAILED:
      const errorData = action.payload.response.data
      return {
        ...state,
        requestUploadStatus: 'failed',
        uploadResultMessage: typeof errorData === 'string' ? errorData : errorData.msg,
      }
    default:
      return state
  }
}
