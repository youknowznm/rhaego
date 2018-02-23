import marked from 'marked'
import {formatDate, regexps} from '../../utils'
import sample from './sample'
import {
  UPDATE_ARTICLE_FIELD,

  ADD_TAG,
  REMOVE_TAG,
  ADJUST_TAG_INPUT_INDENT,

  CHECK_ARTICLE_FIELDS,
  REQUEST_SAVE_ARTICLE,
  REQUEST_SAVE_ARTICLE_COMPLETED,
  REQUEST_SAVE_ARTICLE_FAILED,
} from './actionTypes'

const defaultState = {
  articleId: '',
  articleFields: {
    title: {
      value: '标题 标题 fuck 标题',
      // value: '',
      error: false,
    },
    tags: {
      value: ['react', 'express'],
      // value: [],
      error: false,
    },
    summary: {
      value: '摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要',
      // value: '',
      error: false,
    },
    createdDate: {
      value: formatDate(new Date()),
      // value: '',
      error: false,
    },
    content: {
      value: sample,
      // value: '',
      error: false,
    },
  },
  fieldsValid: true,

  tagsWidth: 0,
  parsedHTMLContent: '',

  saveArticleRequestStatus: '',
  saveArticleResultMessage: '',
}

export default (state = defaultState, action) => {
  switch (action.type) {

    case UPDATE_ARTICLE_FIELD:
      const {fieldName, fieldValue} = action
      const newfields = state.articleFields
      newfields[fieldName].value = fieldValue
      if (fieldName === 'content') {
        state.parsedHTMLContent = marked(fieldValue)
      }
      return {
        ...state,
        articleFields: newfields,
      }
    case ADD_TAG:
      let tagsToAdd = state.articleFields.tags
      tagsToAdd.value.push(action.tagContent)
      return {
        ...state,
        tags: tagsToAdd,
      };
    case REMOVE_TAG:
      let tagsToRemove = state.articleFields.tags
      tagsToRemove.value.splice(action.tagIndex, 1)
      return {
        ...state,
        tags: tagsToRemove,
      };
    case ADJUST_TAG_INPUT_INDENT:
      let tagsWidth = getComputedStyle(document.querySelector('.tags-container')).width
      document.querySelector('.editor-tags-input > input').style['text-indent'] = tagsWidth
      return {
        ...state,
        tagsWidth,
      }

    // 检查登录字段是否全部有效
    case CHECK_ARTICLE_FIELDS:
      const {
        titleReg,
        summaryReg,
        createdDateReg,
        contentReg,
      } = regexps.editor

      const fieldsToCheck = state.articleFields

      const titleError = !titleReg.test(fieldsToCheck.title.value)
      fieldsToCheck.title.error = titleError
      const summaryError = !summaryReg.test(fieldsToCheck.summary.value)
      fieldsToCheck.summary.error = summaryError
      const createdDateError = !createdDateReg.test(fieldsToCheck.createdDate.value)
      fieldsToCheck.createdDate.error = createdDateError
      const contentError = !contentReg.test(fieldsToCheck.content.value)
      fieldsToCheck.content.error = contentError
      const tagsError = (fieldsToCheck.tags.value.length > 2 || fieldsToCheck.tags.value.length === 0)
      fieldsToCheck.tags.error = tagsError

      const fieldsValid = !titleError
        && !summaryError
        && !createdDateError
        && !tagsError
        && !contentError

      console.log(11,fieldsToCheck);

      return {
        ...state,
        articleFields: fieldsToCheck,
        fieldsValid,
        saveArticleRequestStatus: fieldsValid ? 'loading' : 'initial',
      }

    default:
      return state;
  }
}
