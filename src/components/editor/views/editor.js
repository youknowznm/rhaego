import React from 'react'
import {connect} from 'react-redux'
import {TextField} from 'material-ui'
import {actions} from '../../admin'

import './editor.css'

class Editor extends React.Component {
  constructor() {
    super(...arguments)
  }
  render() {
    return (
      <div className="editor-wrap">

        <TextField
          id="name"
          label="Name"
          margin="normal"
        />

        <div>

          <TextField
            id="multiline-static"
            label="Multiline"
            multiline
            rows="40"
            // value="multiline"
            // onChange={this.handleChange('multiline')}
            placeholder="placeholder"
            className="s"
            margin="normal"
          />

          <div className="f"></div>

        </div>
      </div>
    );
  }
}

const mapState = (state) => {
}
const mapDispatch = (dispatch) => ({
})

export default connect(mapState, mapDispatch)(Editor)
