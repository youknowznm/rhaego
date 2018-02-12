import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from 'material-ui/styles'
import {TextField, Button, Typography} from 'material-ui'
import FileUpload from 'material-ui-icons/FileUpload'
import Chip from 'material-ui/Chip'
import {removeTag} from '../actions'

import './editor.css'

const styles = (theme) => ({

});

class Editor extends React.Component {
  constructor() {
    super(...arguments)
  }
  handleDelete = (index) => () => {
    this.props.thisRemoveTag(index)
    this.setState({})
  }
  componentWillMount() {
    setTimeout(() => {
      console.log(getComputedStyle(document.querySelector('.tags-container')).width);
    }, 20)
  }
  componentWillUpdate() {
    console.log(getComputedStyle(document.querySelector('.tags-container')).width);
  }
  render() {
    const {
      classes,
      thisRemoveTag,
      articleDetail
    } = this.props
    return (
      <div className="editor-wrap">
        <div className="row">
          {/* 标题 */}
          <TextField
            className="editor-title"
            label="Title"
            margin="normal"
            helperText="10~20 characters are required for title."
          />
          {/* 标签 */}
          <div className="editor-tags">
            <TextField
              className="fff"
              label="Tags"
              margin="normal"
              helperText="3~12 characters are required for each tag. 1~2 tags are required."
              fullWidth
            />
            <div className="tags-container">
              {
                articleDetail.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    onDelete={this.handleDelete(index)}
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
            margin="dense"
            helperText="10~50 characters are required for summary."
          />
          {/* 日期 */}
          <TextField
            className="editor-created-date"
            label="Created"
            type="date"
            margin="dense"
            defaultValue="2018-01-01"
            helperText="A valid create date is required."
          />
        </div>

        <div className="row">
          <TextField
            className="editor-content"
            label="Content"
            multiline
            rows="35"
            // value="multiline"
            // onChange={this.handleChange('multiline')}
            helperText="Content will be parsed as markdown."
            margin="dense"
          />

          <TextField
            className="editor-preview"
            disabled
            label="Preview"
            multiline
            rows="35"
            // value="multiline"
            helperText="Markdown preview is displayed above."

            // onChange={this.handleChange('multiline')}
            // helperText="helperText"
            margin="dense"
          />
        </div>

        <div className="row">
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
          <div className="button-wrap full-width">
            <Button raised fullWidth color="secondary" className="">
              delete article
            </Button>
          </div>
        </div>

      </div>
    )
  }
}

const mapState = (state) => ({
  articleDetail: state.editor.articleDetail,
})

const mapDispatch = (dispatch) => ({
  thisRemoveTag: (index) => {
    dispatch(removeTag(index))
  }
})

const EditorWrap = connect(mapState, mapDispatch)(Editor)

export default withStyles(styles)(EditorWrap)
