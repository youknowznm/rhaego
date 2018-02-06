import React from 'react'
import {connect} from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

const Theme = ({type, children}) => {
  const materialBlogTheme = createMuiTheme({
    palette: {
      primary: {main: '#2196f3'},
      secondary: { main: '#FFFF00'},
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
