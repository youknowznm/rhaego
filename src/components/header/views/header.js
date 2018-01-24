import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withStyles} from 'material-ui'
import {AppBar, Toolbar, Typography, Button, IconButton} from 'material-ui'
import MenuIcon from 'material-ui-icons/Menu'
import {SplitToSpans} from '../../../utils'
import {toggleDrawer} from '../actions'

import './header.css'

const drawerWidth = 250

const styles = (theme) => ({
  navIconButton: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  header: {
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
})

const Header = ({classes, thisToggleDrawer}) => (
  <AppBar color="primary" className={classes.header}>
    <Toolbar>
      <IconButton color="inherit" className={classes.navIconButton} onClick={thisToggleDrawer}>
        <MenuIcon />
      </IconButton>
      <Typography className="title mono" type="title" color="inherit">
        <SplitToSpans />
      </Typography>
      <Button color="inherit">login</Button>
    </Toolbar>
  </AppBar>
)

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  thisToggleDrawer: PropTypes.func.isRequired,
}

const mapDispatch = (dispatch, ownProps) => ({
  thisToggleDrawer: () => dispatch(toggleDrawer(null))
})

const HeaderWrap = connect(null, mapDispatch)(Header)

export default withStyles(styles)(HeaderWrap)
