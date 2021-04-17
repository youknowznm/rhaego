import React from 'react'
import {connect} from 'react-redux'
import {TextField, Button} from 'material-ui'
import {FormControl, FormHelperText} from 'material-ui/Form'
import Input, {InputLabel} from 'material-ui/TextField'
import Chip from 'material-ui/Chip'
import {
  highlightAllPre,
  AsyncButton,
  getQueryObj,
  changeDocTitle,
} from '../../../utils'
import {
  updateArticleField,
  addTag,
  removeTag,
  adjustTagInputIndent,
  checkArticleFields,
  requestSaveArticle,
  requestSaveArticleInit,
  getArticleToEdit,
  requestDeleteArticle,
  requestDeleteArticleInit,
} from '../actions'
import {view as Upload} from '../../upload'
import './editor.css'

const contentRowNumber = 30

class Editor extends React.Component {
  componentWillMount() {
    // 初始化时根据 query 寻找文章。找不到时则新建文章
    this.props.thisGetArticleById()
    changeDocTitle('编辑文章')
  }
  componentDidMount() {
    this.props.thisAdjustTagInputIndent()
  }
  componentWillUpdate(nextProps) {
    switch (nextProps.saveArticleRequestStatus) {
      case 'loading':
        if (nextProps.fieldsValid === true) {
          const articleFields = {
            _id: this.props.articleId,
            title: this.props.titleValue,
            summary: this.props.summaryValue,
            tags: this.props.tagsValue,
            createdDate: this.props.createdDateValue,
            content: this.props.contentValue,
          }
          this.props.thisRequestSaveArticle(articleFields)
        }
        break
      case 'failed':
        setTimeout(() => {
          this.props.thisRequestSaveArticleInit()
        }, 2000)
        break
      case 'completed':
        const {articleId} = nextProps
        setTimeout(() => {
          this.props.thisRequestSaveArticleInit()
          setTimeout(() => {
            window.location.assign(`/article?id=${articleId}`)
          })
        }, 2000)
        break
      default:
        break
    }

    switch (nextProps.deleteArticleRequestStatus) {
      case 'failed':
        setTimeout(() => {
          this.props.thisRequestDeleteArticleInit()
        }, 2000)
        break
      case 'completed':
        setTimeout(() => {
          this.props.thisRequestDeleteArticleInit()
          setTimeout(() => {
            window.location.assign(`/articles`)
          }, 200)
        }, 2000)
        break
      default:
        break
    }
  }
  componentDidUpdate(prevProps) {
    this.props.thisAdjustTagInputIndent()
    // 预览内容
    this.props.thisUpdateArticleField('content', this.props.contentValue)
    if (this.props.parsedHTMLContent !== prevProps.parsedHTMLContent) {
      highlightAllPre('.editor-preview')
    }
  }
  onChangeValue = (field) => (evt) => {
    const fieldName = field
    const fieldValue = evt.target.value
    this.props.thisUpdateArticleField(fieldName, fieldValue)
  }
  onRemoveTag = (index) => () => {
    this.props.thisRemoveTag(index)
    this.setState({})
  }
  onTagInputKeyUp = (evt) => {
    const target = evt.target
    const trimmedTagContent = target.value.trim()
    if (evt.key === 'Enter'
      && trimmedTagContent.length >= 3
      && this.props.tagsValue.length <= 1
    ) {
      this.props.thisAddTag(trimmedTagContent)
      target.value = ''
      this.setState({})
    }
  }
  goToArticles() {
    window.location.assign('/articles')
  }
  handleRequestDeleteArticle = () => {
    const {articleId, thisRequestDeleteArticle} = this.props
    thisRequestDeleteArticle(articleId)
  }
  render() {
    const {
      titleValue,
      titleError,
      summaryValue,
      summaryError,
      tagsValue,
      tagsError,
      createdDateValue,
      createdDateError,
      contentValue,
      contentError,

      parsedHTMLContent,
      saveArticleRequestStatus,
      thisCheckArticleFields,
      saveArticleResultMessage,
      deleteArticleRequestStatus,
      deleteArticleResultMessage,
    } = this.props
    const maximumTagsReached = (tagsValue.length === 2)
    return (
      <div className="editor-wrap">
        <div className="row">
          {/* 标题 */}
          <TextField
            className="editor-title"
            autoFocus
            label="标题"
            margin="normal"
            helperText="输入10至40字作为标题。"
            value={titleValue}
            onChange={this.onChangeValue('title')}
            error={titleError}
            inputProps={{
              'maxLength': '40',
            }}
          />
          {/* 标签 */}
          <div className="editor-tags">
            <FormControl
              // className="editor-title"
              margin="normal"
              fullWidth
              error={tagsError}
            >
              <InputLabel shrink={true}>标签</InputLabel>
              <Input
                className="editor-tags-input"
                placeholder={maximumTagsReached ? '' : "输入后按回车以确认"}
                inputProps={{
                  'maxLength': '12',
                }}
                disabled={maximumTagsReached}
                onKeyUp={this.onTagInputKeyUp}
              />
              <FormHelperText>
                需1至2个标签，每个标签需3至12字。
              </FormHelperText>
            </FormControl>
            <div className="tags-container">
              {
                tagsValue.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    onDelete={this.onRemoveTag(index)}
                    className="tag"
                  />
                ))
              }
            </div>
          </div>
        </div>

        <div className="row">
          {/* 摘要 */}
          <TextField
            className="editor-summary"
            label="摘要"
            margin="normal"
            value={summaryValue}
            helperText="输入10至100字作为摘要。"
            onChange={this.onChangeValue('summary')}
            error={summaryError}
            inputProps={{
              'maxLength': '100',
            }}
          />
          {/* 日期 */}
          <FormControl
            className="editor-created-date"
            margin="normal"
            error={createdDateError}
          >
            <InputLabel shrink={true}>
              创建时间
            </InputLabel>
            <Input
              type="date"
              inputProps={{
                'maxLength': '12',
              }}
              value={createdDateValue}
              onChange={this.onChangeValue('createdDate')}
            />
            <FormHelperText>
              需提供有效的创建日期。
            </FormHelperText>
          </FormControl>
        </div>

        <div className="row">
          {/* 内容 */}
          <TextField
            className="editor-content"
            label="内容"
            multiline
            value={contentValue}
            rows={contentRowNumber}
            onChange={this.onChangeValue('content')}
            helperText="内容将以 Markdown 渲染。"
            margin="normal"
            error={contentError}
          />
          {/* 预览 */}
          <div className="editor-preview-wrap">
            <TextField
              className="editor-preview-placeholder"
              value=" "
              label="预览"
              fullWidth
              multiline
              rows={contentRowNumber}
              margin="normal"
              disabled
              helperText="以上是转换后的 HTML。"
            />
            <article
              className="editor-preview mb-article"
              dangerouslySetInnerHTML={{__html: parsedHTMLContent}}
            ></article>
          </div>
        </div>

        <div className="row button-row">
          {/* 上传图片按钮 */}
          <Upload />
        </div>

        <div className="row button-row fw">
          {/* 保存按钮 */}
          <AsyncButton
            raised
            className="button-save"
            asyncStatus={saveArticleRequestStatus}
            asyncResultMessage={saveArticleResultMessage}
            onClick={thisCheckArticleFields}
            color="primary"
            fullWidth
          >
            保存
          </AsyncButton>
        </div>

        <div className="row button-row">
          {/* 取消按钮 */}
          <Button className="button-cancel"
            raised
            fullWidth
            onClick={this.goToArticles}
          >
            取消
          </Button>
        </div>

        {
          [undefined, ''].includes(getQueryObj().articleId)
            ? ''
            : <div className="row">
              {/* 删除文章按钮 */}
              <div className="button-wrap full-width delete-wrap">
                <AsyncButton
                  raised
                  asyncStatus={deleteArticleRequestStatus}
                  asyncResultMessage={deleteArticleResultMessage}
                  onClick={this.handleRequestDeleteArticle}
                  color="secondary"
                  fullWidth
                  className="delete-button"
                >
                  删除文章
                </AsyncButton>
              </div>
            </div>
        }

      </div>
    )
  }
}

const mapState = (state) => {
  const {articleFields} = state.editor
  // IDEA: mapState方法返回的对象的键必须是值对象，不能是对象或数组！！
  return {
    titleValue: articleFields.title.value,
    titleError: articleFields.title.error,
    summaryValue: articleFields.summary.value,
    summaryError: articleFields.summary.error,
    tagsValue: articleFields.tags.value,
    tagsError: articleFields.tags.error,
    createdDateValue: articleFields.createdDate.value,
    createdDateError: articleFields.createdDate.error,
    contentValue: articleFields.content.value,
    contentError: articleFields.content.error,

    fieldsValid: state.editor.fieldsValid,
    articleId: state.editor.articleId,

    tagsWidth: state.editor.tagsWidth,
    parsedHTMLContent: state.editor.parsedHTMLContent,

    saveArticleRequestStatus: state.editor.saveArticleRequestStatus,
    saveArticleResultMessage: state.editor.saveArticleResultMessage,

    deleteArticleRequestStatus: state.editor.deleteArticleRequestStatus,
    deleteArticleResultMessage: state.editor.deleteArticleResultMessage,
  }
}

const mapDispatch = (dispatch) => ({
  thisGetArticleById: () => {
    dispatch(getArticleToEdit(getQueryObj().articleId || ''))
  },
  thisRemoveTag: (index) => {
    dispatch(removeTag(index))
  },
  thisAdjustTagInputIndent: () => {
    dispatch(adjustTagInputIndent())
  },
  thisAddTag: (tagContent) => {
    dispatch(addTag(tagContent))
  },
  thisUpdateArticleField: (fieldName, fieldValue) => {
    dispatch(updateArticleField(fieldName, fieldValue))
  },
  thisCheckArticleFields: () => {
    dispatch(checkArticleFields())
  },
  thisRequestSaveArticle: (articleFields) => {
    dispatch(requestSaveArticle(articleFields))
  },
  thisRequestSaveArticleInit: () => {
    dispatch(requestSaveArticleInit())
  },
  thisRequestDeleteArticle: (articleId) => {
    dispatch(requestDeleteArticle(articleId))
  },
  thisRequestDeleteArticleInit: () => {
    dispatch(requestDeleteArticleInit())
  },
})

const EditorWrap = connect(mapState, mapDispatch)(Editor)

export default EditorWrap
