import React from 'react'
import {TextField} from 'material-ui'

class Editor extends React.Component {
  // constructor() {
  //
  // }
  render() {
    return (
      <TextField
        id="multiline-static"
        label="Multiline"
        multiline
        rows="40"
        // value="multiline"
        // onChange={this.handleChange('multiline')}
        placeholder="placeholder"
        // className={classes.textField}
        margin="normal"
      />
    );
  }
}

export default Editor
