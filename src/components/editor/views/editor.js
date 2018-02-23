import React from 'react'
import {connect} from 'react-redux'
import {TextField, Button} from 'material-ui'
import {FormControl, FormHelperText} from 'material-ui/Form'
import Input, {InputLabel} from 'material-ui/Input'
import Chip from 'material-ui/Chip'
import store from '../../../Store'
import {highlightAllPre, AsyncButton} from '../../../utils'
import {
  updateArticleField,
  addTag,
  removeTag,
  adjustTagInputIndent,
  checkArticleFields,
  requestSaveArticle,
  requestSaveArticleInit,
} from '../actions'

import {view as Upload} from '../../upload'
import './editor.css'

class Editor extends React.Component {
  componentDidMount() {
    this.props.thisAdjustTagInputIndent()
    // 初始化时进行预览
    this.props.thisUpdateArticleField('content', this.props.contentValue)
  }
  componentWillUpdate(nextProps) {
    console.log(nextProps.saveArticleRequestStatus);
    switch (nextProps.saveArticleRequestStatus) {
      case 'loading':
        if (nextProps.fieldsValid === true) {
          console.log(this.props.articleFields);
          const articleFields = {
            title: this.props.titleValue,
            summary: this.props.summaryValue,
            tags: this.props.tagsValue,
            createdDate: this.props.createdDateValue,
            content: this.props.contentValue,
          }
          this.props.thisRequestSaveArticle(articleFields)
        }
        break;
      case 'failed':
        setTimeout(() => {
          this.props.thisRequestSaveArticleInit()
        }, 2000)
        break
      case 'completed':
        setTimeout(() => {
          // this.backToReferer()
          this.props.thisRequestSaveArticleInit()
        }, 2000)
        break
      default:
        break
    }
  }
  componentDidUpdate(nextProps) {
    this.props.thisAdjustTagInputIndent()
    if (this.props.parsedHTMLContent !== nextProps.parsedHTMLContent) {
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
    this.props.thisUpdateArticleField('title', this.props.titleValue)
  }
  onTagInputKeyUp = (evt) => {
    const target = evt.target
    const trimmedTagContent = target.value.trim()
    if (evt.key === 'Enter'
      && trimmedTagContent.length >= 3
      && this.props.articleFields.tags.value.length <= 1
    ) {
      this.props.thisAddTag(trimmedTagContent)
      target.value = ''
      this.setState({})
      this.props.thisUpdateArticleField('title', this.props.titleValue)
    }
  }
  render() {
    const {
      articleFields,

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
    } = this.props
    const maximumTagsReached = (tagsValue.length === 2)
    return (
      <div className="editor-wrap">
        <div className="row">
          {/* 标题 */}
          <TextField
            className="editor-title"
            label="标题"
            margin="normal"
            helperText="输入10至20字作为标题。"
            defaultValue={titleValue}
            onChange={this.onChangeValue('title')}
            error={titleError}
            inputProps={{
              'maxLength': '20',
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
            defaultValue={summaryValue}
            helperText="输入10至50字作为摘要。"
            onChange={this.onChangeValue('summary')}
            error={summaryError}
            inputProps={{
              'maxLength': '50',
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
              defaultValue={createdDateValue}
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
            defaultValue={contentValue}
            rows="17"
            onChange={this.onChangeValue('content')}
            helperText="内容将以 Markdown 渲染。"
            margin="normal"
            error={contentError}
          />
          {/* 预览 */}
          <div className="editor-preview-wrap">
            <TextField
              className="editor-preview-placeholder"
              defaultValue=" "
              label="预览"
              fullWidth
              multiline
              rows="17"
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

        <div className="row">
          {/* 上传图片按钮 */}
          <Upload />
          {/* 保存和取消按钮 */}
          <div className="button-wrap">
            {/* <Button raised className="button-save" color="primary">
              保存
            </Button> */}

            <AsyncButton
              raised
              className="button-save"
              asyncStatus={saveArticleRequestStatus}
              asyncResultMessage={saveArticleResultMessage}
              onClick={thisCheckArticleFields}
              color="primary"
            >
              保存
            </AsyncButton>
            <Button raised className="button-cancel">
              取消
            </Button>
          </div>
        </div>

        <div className="row">
          {/* 删除文章按钮 */}
          <div className="button-wrap full-width">
            <Button raised color="secondary" fullWidth className="">
              删除文章
            </Button>
          </div>
        </div>

      </div>
    )
  }
}

const mapState = (state) => {
  const thatArticleFields = state.editor.articleFields
  // IDEA: mapState方法返回的对象的键必须是值对象，不能是对象或数组！！
  return {
    articleFields: state.editor.articleFields,
    titleValue: thatArticleFields.title.value,
    titleError: thatArticleFields.title.error,
    summaryValue: thatArticleFields.summary.value,
    summaryError: thatArticleFields.summary.error,
    tagsValue: thatArticleFields.tags.value,
    tagsError: thatArticleFields.tags.error,
    createdDateValue: thatArticleFields.createdDate.value,
    createdDateError: thatArticleFields.createdDate.error,
    contentValue: thatArticleFields.content.value,
    contentError: thatArticleFields.content.error,

    tagsWidth: state.editor.tagsWidth,
    parsedHTMLContent: state.editor.parsedHTMLContent,
    saveArticleRequestStatus: state.editor.saveArticleRequestStatus,
    saveArticleResultMessage: state.editor.saveArticleResultMessage,
  }
}

const mapDispatch = (dispatch) => ({
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
})

const EditorWrap = connect(mapState, mapDispatch)(Editor)

export default EditorWrap

// new Fingerprint2(options).get(function(result) {
//   console.log(result)
// })
