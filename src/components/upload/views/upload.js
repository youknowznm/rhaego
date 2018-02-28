import React from 'react'
import {connect} from 'react-redux'
import {Button, Typography, Snackbar} from 'material-ui'
import FileUpload from 'material-ui-icons/FileUpload'
import {
  uploadPicture,
  uploadPictureInit,
} from '../actions'

class Upload extends React.Component {
  componentWillUpdate(nextProps) {
    switch (nextProps.requestUploadStatus) {
      case 'failed':
        setTimeout(() => {
          this.props.thisUploadPictureInit()
        }, 3000)
        break
      case 'completed':
        setTimeout(() => {
          this.props.thisUploadPictureInit()
        }, 2000)
        break
      default:
        return
    }
  }
  render() {
    const {
      thisUploadPicture,
      requestUploadStatus,
      uploadResultMessage,
    } = this.props
    return (
      <div className="button-wrap upload-wrap">
        <input
          accept="image/*"
          id="upload-picture-input"
          type="file"
          onChange={thisUploadPicture}
        />
        <label htmlFor="upload-picture-input">
          <Button
            component="span"
            variant="raised"
            color="secondary"
            disabled={requestUploadStatus === 'loading'}
            className="upload-button"
          >
            上传图片
            <FileUpload className="icon-right" />
          </Button>
        </label>
        <Snackbar
          open={['failed', 'completed'].includes(requestUploadStatus)}
          anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
          }}
          message={uploadResultMessage}
        />
        <Typography variant="caption" className="upload-help-text">
          上传成功后以 "youknowznm.com/pictures/[PICTURE_NAME]" 的形式引用。
        </Typography>
      </div>
    )
  }
}

const mapState = (state) => ({
  requestUploadStatus: state.upload.requestUploadStatus,
  uploadResultMessage: state.upload.uploadResultMessage,
})

const mapDispatch = (dispatch) => ({
  thisUploadPicture: (evt) => {
    console.log(evt.target.files[0])
    dispatch(uploadPicture(evt.target.files[0]))
  },
  thisUploadPictureInit: () => {
    dispatch(uploadPictureInit())
  },
})

export default connect(mapState, mapDispatch)(Upload)
