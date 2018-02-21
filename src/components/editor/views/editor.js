import React from 'react'
import {connect} from 'react-redux'
import {TextField, Button} from 'material-ui'
import {FormControl, FormHelperText} from 'material-ui/Form'
import Input, {InputLabel} from 'material-ui/Input'
import Chip from 'material-ui/Chip'
import store from '../../../Store'
import {highlightAllPre} from '../../../utils'
import {
  updateTitleField,
  updateSummaryField,
  updateCreatedDateField,
  updateContentField,

  addTag,
  removeTag,
  adjustTagInputIndent,
} from '../actions'

import {view as Upload} from '../../upload'
import './editor.css'

class Editor extends React.Component {
  componentDidMount() {
    this.props.thisAdjustTagInputIndent()
    // 初始化时进行预览
    store.dispatch(updateContentField(this.props.articleFields.content.value))
  }
  componentWillUpdate(nextProps) {

  }
  componentDidUpdate(nextProps) {
    this.props.thisAdjustTagInputIndent()
    if (this.props.parsedHTMLContent !== nextProps.parsedHTMLContent) {
      highlightAllPre('.editor-preview')
    }
  }
  handleRemoveTag = (index) => () => {
    this.props.thisRemoveTag(index)
    this.setState({})
  }
  handleTagInputKeyUp = (evt) => {
    const target = evt.target
    const trimmedTagContent = target.value.trim()
    if (evt.key === 'Enter'
      && trimmedTagContent.length >= 3
      && this.props.articleFields.tags.value.length <= 1
    ) {
      this.props.thisAddTag(trimmedTagContent)
      target.value = ''
      this.setState({})
    }
  }
  render() {
    const {
      articleFields,
      parsedHTMLContent,
      thisUpdateTargetField,
    } = this.props
    const maximumTagsReached = (articleFields.tags.value.length === 2)
    return (
      <div className="editor-wrap">
        <div className="row">
          {/* 标题 */}
          <TextField
            className="editor-title"
            label="标题"
            margin="normal"
            helperText="输入10至20字作为标题。"
            defaultValue={articleFields.title.value}
            onChange={thisUpdateTargetField('title')}
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
            >
              <InputLabel shrink={true}>标签</InputLabel>
              <Input
                className="editor-tags-input"
                placeholder={maximumTagsReached ? '' : "输入后按回车以确认"}
                inputProps={{
                  'maxLength': '12',
                }}
                disabled={maximumTagsReached}
                onKeyUp={this.handleTagInputKeyUp}
              />
              <FormHelperText>
                需1至2个标签，每个标签需3至12字。
              </FormHelperText>
            </FormControl>
            <div className="tags-container">
              {
                articleFields.tags.value.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    onDelete={this.handleRemoveTag(index)}
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
            defaultValue={articleFields.summary.value}
            helperText="输入10至50字作为摘要。"
            onChange={thisUpdateTargetField('summary')}
            inputProps={{
              'maxLength': '50',
            }}
          />
          {/* 日期 */}
          <FormControl
            className="editor-created-date"
            margin="normal"
          >
            <InputLabel shrink={true}>
              创建时间
            </InputLabel>
            <Input
              type="date"
              inputProps={{
                'maxLength': '12',
              }}
              defaultValue={articleFields.createdDate.value}
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
            defaultValue={articleFields.content.value}
            rows="35"
            onChange={thisUpdateTargetField('content')}
            helperText="内容将以 Markdown 渲染。"
            margin="normal"
          />
          {/* 预览 */}
          <div className="editor-preview-wrap">
            <TextField
              className="editor-preview-placeholder"
              defaultValue=" "
              label="预览"
              fullWidth
              multiline
              rows="35"
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
            <Button raised className="button-save" color="primary">
              保存
            </Button>
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

const mapState = (state) => ({
  articleFields: state.editor.articleFields,
  tagsWidth: state.editor.tagsWidth,
  parsedHTMLContent: state.editor.parsedHTMLContent,
})

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
  thisUpdateTargetField: (fieldName) => (evt) => {
    const fieldActionMap = {
      title: updateTitleField,
      summary: updateSummaryField,
      createdDate: updateCreatedDateField,
      content: updateContentField,
    }
    dispatch(fieldActionMap[fieldName](evt.target.value))
  },
})

const EditorWrap = connect(mapState, mapDispatch)(Editor)

export default EditorWrap
