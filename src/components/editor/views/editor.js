import React from 'react'
import {connect} from 'react-redux'
import {TextField} from 'material-ui'
import {actions} from '../../admin'
import Chip from 'material-ui/Chip';

import './editor.css'

class Editor extends React.Component {
  constructor() {
    super(...arguments)
  }
  render() {
    return (
      <div className="editor-wrap">
        <div className="row">
          {/* 标题 */}
          <TextField
            className="editor-title"
            label="Title"
            margin="normal"
          />
          {/* 标签 */}
          <div className="editor-tags">
            <TextField
              className=""
              label="Tags"
              margin="normal"
              fullWidth
            />
            <div className="tags-container">
              <Chip
                key="1"
                label="sb"
                // onDelete={this.handleDelete(data)}
                className="chip"
                />
              <Chip
                key="2"
                label="sb"
                // onDelete={this.handleDelete(data)}
                className="chip"
                />
            </div>
          </div>
          {/* 日期 */}
          <TextField
            className="editor-date"
            label="Created"
            type="date"
            margin="normal"
            defaultValue="2017-05-24"
          />
        </div>

        <div className="row">
          {/* 摘要 */}
          <TextField
            className="editor-summary"
            label="Summary"
            margin="normal"
            fullWidth
          />
          {/* <TextField
            className="editor-title"
            label="Title"
            margin="normal"
          />
          <TextField
            className="editor-summary"
            label="Summary"
            margin="normal"
          /> */}
        </div>

        <div className="row">

          <TextField
            className="editor-content"
            label="Content"
            multiline
            rows="40"
            // value="multiline"
            // onChange={this.handleChange('multiline')}
            placeholder="Using markdown."
            margin="normal"
          />

          <TextField
            className="editor-preview"
            disabled
            label="Preview"
            multiline
            rows="40"
            value="multiline"
            // onChange={this.handleChange('multiline')}
            // placeholder="placeholder"
            margin="normal"
          />


        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
})
const mapDispatch = (dispatch) => ({
})

export default connect(mapState, mapDispatch)(Editor)
