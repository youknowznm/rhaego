import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from 'material-ui'
import {Drawer as MuiDrawer, Hidden} from 'material-ui'
import {toggleDrawer} from '../../header/actions'
import DrawerHeader from './drawerHeader'
import DrawerBody from './drawerBody'

import './drawer.css'

const styles = (theme) => ({
  'drawer-content': {
    width: 250,
  },
})

const Drawer = ({classes, drawerIsOpen, thisToggleDrawer}) => {
  const drawer = (
    <div>
      <DrawerHeader />
      <DrawerBody />
    </div>
  )
  return (
    <div>
      <Hidden lgUp>
        <MuiDrawer
          type="temporary"
          open={drawerIsOpen}
          onClose={thisToggleDrawer}
          classes={{
            paper: classes['drawer-content'],
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </MuiDrawer>
      </Hidden>
      <Hidden mdDown>
        <MuiDrawer
          type="permanent"
          open
          classes={{
            paper: classes['drawer-content'],
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
  thisToggleDrawer: () => dispatch(toggleDrawer())
})

const DrawerWrap = connect(mapState, mapDispatch)(Drawer)

export default withStyles(styles)(DrawerWrap)
