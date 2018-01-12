import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withStyles} from 'material-ui'
import {Drawer as MuiDrawer, Divider, List, Hidden, Typography} from 'material-ui'
import {toggleDrawer} from '../../header/actions.js'
import DrawerHeader from './drawerHeader.js'
import DrawerBody from './drawerBody.js'

const styles = (theme) => ({
  drawerHeader: theme.mixins.toolbar,
  drawerContent: {
    width: 250,
  },
})

const Drawer = ({classes, drawerIsOpen, toggleDrawer}) => {
  const drawer = (
    <div>
      <DrawerHeader />
      <DrawerBody />
    </div>
  )
  return (
    <div>
      <Hidden mdUp>
        <MuiDrawer
          type="temporary"
          open={drawerIsOpen}
          onClose={toggleDrawer}
          classes={{
            paper: classes.drawerContent
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </MuiDrawer>
      </Hidden>
      <Hidden smDown>
        <MuiDrawer
          type="permanent"
          open
          classes={{
            paper: classes.drawerContent
          }}
        >
          {drawer}
        </MuiDrawer>
      </Hidden>
    </div>
  );
}

const mapState = (state, ownProps) => {
  return {
    drawerIsOpen: state.header.drawerIsOpen
  }
}

const mapDispatch = (dispatch, ownProps) => ({
  toggleDrawer: () => dispatch(toggleDrawer())
})

Drawer.propTypes = {
  drawerIsOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
}

const DrawerWrap = connect(mapState, mapDispatch)(Drawer)

export default withStyles(styles)(DrawerWrap)
