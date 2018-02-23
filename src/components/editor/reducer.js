import marked from 'marked'
import {formatDate, regexps} from '../../utils'
import sample from './sample'
import {
  // UPDATE_TITLE_FIELD,
  // UPDATE_SUMMARY_FIELD,
  // UPDATE_CONTENT_FIELD,
  // UPDATE_CREATED_DATE_FIELD,
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
      // value: '1',
      value: '',
      error: false,
    },
    tags: {
      // value: ['react', 'express'],
      value: [],
      error: false,
    },
    summary: {
      // value: '2',
      value: '',
      error: false,
    },
    createdDate: {
      // value: formatDate(new Date()),
      value: '',
      error: false,
    },
    content: {
      // value: sample,
      value: '',
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
      return {
        ...state,
        articleFields: newfields,
      }

    // case UPDATE_TITLE_FIELD:
    //   let fields_1 = state.articleFields
    //   fields_1.title.value = action.newValue
    //   console.log(1,action.newValue);
    //   return {
    //     ...state,
    //     articleFields: fields_1,
    //   }
    // case UPDATE_SUMMARY_FIELD:
    //   console.log(2,action.newValue);
    //   let fields_2 = state.articleFields
    //   fields_2.summary.value = action.newValue
    //   return {
    //     ...state,
    //     articleFields: fields_2,
    //   }
    // case UPDATE_CREATED_DATE_FIELD:
    //   let fields_3 = state.articleFields
    //   fields_3.createdDate.value = action.newValue
    //   return {
    //     ...state,
    //     articleFields: fields_3,
    //   }
    // case UPDATE_CONTENT_FIELD:
    //   let fields_4 = state.articleFields
    //   fields_4.content.value = action.newValue
    //   let parsedHTMLContent = marked(action.newValue)
    //   return {
    //     ...state,
    //     articleFields: fields_4,
    //     parsedHTMLContent,
    //   }

    case ADD_TAG:
      let tags_1 = state.articleFields.tags
      tags_1.value.push(action.tagContent)
      return {
        ...state,
        tags: tags_1,
      };
    case REMOVE_TAG:
      let tags_2 = state.articleFields.tags
      tags_2.value.splice(action.tagIndex, 1)
      return {
        ...state,
        tags: tags_2,
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
