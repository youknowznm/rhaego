import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withStyles} from 'material-ui'
import {AppBar, Toolbar, Typography, Button, IconButton} from 'material-ui'
import MenuIcon from 'material-ui-icons/Menu'
import {SplitToSpans} from '../../../utils'
import {toggleDrawer} from '../actions'

import './header.scss'

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

const Header = ({classes, toggleDrawer}) => (
  <AppBar color="primary" className={classes.header}>
    <Toolbar>
      <IconButton color="inherit" className={classes.navIconButton} onClick={toggleDrawer}>
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
  toggleDrawer: PropTypes.func.isRequired,
}

const mapState = (state, ownProps) => {
  return {
    drawerIsOpen: state.header.drawerIsOpen
  }
}

const mapDispatch = (dispatch, ownProps) => ({
  toggleDrawer: () => dispatch(toggleDrawer())
})

const HeaderWrap = connect(mapState, mapDispatch)(Header)

export default withStyles(styles)(HeaderWrap)
