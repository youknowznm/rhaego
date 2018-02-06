import React from 'react'
import {connect} from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import {blue, yellow} from 'material-ui/colors'

const Theme = ({type, children}) => {
  const materialBlogTheme = createMuiTheme({
    palette: {
      primary: {main: blue[500]},
      secondary: { main: yellow['A200']},
      type,
    },
  })
  return (
    <MuiThemeProvider theme={materialBlogTheme}>
      {children}
    </MuiThemeProvider>
  )
}

const mapState = (state) => ({
  type: state.theme.type,
})

export default connect(mapState, null)(Theme)
