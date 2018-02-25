import React from 'react'
import {connect} from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

const Theme = ({type, children}) => {
  const materialBlogTheme = createMuiTheme({
    palette: {
      primary: {main: '#607D8B'}, //3c5a64
      secondary: { main: '#FFC107'},
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
