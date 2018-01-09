import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import {AppBar, Toolbar, Typography, Button, IconButton} from 'material-ui'
import MenuIcon from 'material-ui-icons/Menu'

import {view as TopMenu} from '../components/TopMenu'

const bb = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
}

const ButtonAppBar = ({classes}) => {
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="contrast" aria-label="MenFFF">
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit" className={classes.flex}>
            Title
          </Typography>
          <Button color="contrast">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

const S = withStyles(bb)(ButtonAppBar)

const App = ({children}) => {
  return (
    <div>
      <TopMenu />
      <div>{children}</div>
      <S></S>
    </div>
  );
}

fetch('/who', (s) => {
  console.log(11,s);
})

export default App
