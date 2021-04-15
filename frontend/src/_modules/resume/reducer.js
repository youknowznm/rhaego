import marked from 'marked'
import {
  FETCH_RESUME,
  FETCH_RESUME_COMPLETED,
  FETCH_RESUME_FAILED,
} from './actionTypes'

const defaultState = {
  resumeHTML: '',
  getResumeRequestStatus: 'initial',
  getResumeStatusMessage: '',
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_RESUME:
      return {
        ...state,
        getResumeRequestStatus: 'loading',
      }
    case FETCH_RESUME_FAILED:
      return {
        ...state,
        getResumeRequestStatus: 'failed',
        getResumeStatusMessage: '获取失败。请稍后重试。',
      }
    case FETCH_RESUME_COMPLETED:
      const {resumeMarkdown} = action.payload.data
      return {
        ...state,
        resumeHTML: marked(resumeMarkdown),
        getResumeRequestStatus: 'completed',
        getResumeStatusMessage: '获取成功',
      }

    default:
      return state
  }
}
