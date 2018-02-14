import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from 'material-ui/styles'
import {TextField, Button, Typography} from 'material-ui'
import {FormControl, FormHelperText} from 'material-ui/Form'
import Input, {InputLabel} from 'material-ui/Input'
import FileUpload from 'material-ui-icons/FileUpload'
import Chip from 'material-ui/Chip'
import store from '../../../Store'
import {
  updateTitleField,
  updateSummaryField,
  updateCreatedDateField,
  updateContentField,

  addTag,
  removeTag,
  adjustTagInputIndent,
  previewContent,
} from '../actions'

import './editor.css'

const styles = (theme) => ({

});

class Editor extends React.Component {
  constructor() {
    super(...arguments)
  }
  componentDidMount() {
    this.props.thisAdjustTagInputIndent()
  }
  componentDidUpdate() {
    this.props.thisAdjustTagInputIndent()
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
      classes,
      thisRemoveTag,
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
            label="Title"
            margin="normal"
            helperText="10~20 characters are required for title."
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
              <InputLabel shrink={true}>Tags</InputLabel>
              <Input
                className="editor-tags-input"
                placeholder={maximumTagsReached ? '' : "Type and press enter."}
                inputProps={{
                  'maxLength': '12',
                }}
                disabled={maximumTagsReached}
                onKeyUp={this.handleTagInputKeyUp}
              />
              <FormHelperText>
                1~2 tags are required. 3~12 characters are required for each tag.
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
            label="Summary"
            margin="normal"
            defaultValue={articleFields.summary.value}
            helperText="10~50 characters are required for summary."
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
              Created Date
            </InputLabel>
            <Input
              type="date"
              inputProps={{
                'maxLength': '12',
              }}
              defaultValue={articleFields.createdDate.value}
            />
            <FormHelperText>
              A valid create date is required.
            </FormHelperText>
          </FormControl>
        </div>

        <div className="row">
          {/* 内容 */}
          <TextField
            className="editor-content"
            label="Content"
            multiline
            defaultValue={articleFields.content.value}
            rows="35"
            onChange={thisUpdateTargetField('content')}
            helperText="Content will be parsed as markdown."
            margin="normal"
          />
          {/* 预览 */}
          <div className="editor-preview">
            <Typography type="caption" className="preview-caption">Preview</Typography>
            <article
              className="editor-preview-viewer"
              dangerouslySetInnerHTML={{__html: parsedHTMLContent}}
            ></article>
          </div>
        </div>

        <div className="row">
          {/* 上传图片按钮 */}
          <div className="button-wrap upload-wrap">
            <Button>
              upload picture
              <FileUpload className="icon-right" />
            </Button>
            <Typography type="caption" className="upload-help-text">
              Refer to picture as "youknowznm.com/pic/[PICTURE_NAME]"
              after successful upload.
            </Typography>
          </div>
          {/* 保存和取消按钮 */}
          <div className="button-wrap">
            <Button raised className="button-save" color="primary">
              save
            </Button>
            <Button raised className="button-cancel">
              cancel
            </Button>
          </div>
        </div>

        <div className="row">
          {/* 删除文章按钮 */}
          <div className="button-wrap full-width">
            <Button raised color="secondary" fullWidth className="">
              delete article
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


  thisPreviewContent: () => {
    dispatch(previewContent())
  },
})

const EditorWrap = connect(mapState, mapDispatch)(Editor)

export default withStyles(styles)(EditorWrap)
