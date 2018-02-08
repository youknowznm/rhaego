import React from 'react'
import {connect} from 'react-redux'
import {Button, Snackbar, Divider} from 'material-ui'
import {withStyles} from 'material-ui/styles'
import axios from 'axios'
import {logout as logoutApi} from '../../../api'
import ExitToAppIcon from 'material-ui-icons/ExitToApp'
import NoteAddIcon from 'material-ui-icons/NoteAdd'
import {Link} from 'react-router'
import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
} from 'material-ui/List'
import Dialog,{
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import {requestLogout, toggleLogoutDialog} from '../actions'

import './logout.css'

class Logout extends React.Component {
  componentWillUpdate(nextProps) {
    console.log(1,nextProps.requestLogoutStatus);
    switch (nextProps.requestLogoutStatus) {
      case 'completed':
        setTimeout(() => {
          window.location.assign('/')
        }, 2000)
        break;
      case 'failed':
        setTimeout(() => {
          this.props.thisRequestLogoutInit()
        }, 2000)
        break;
      default:
        return
    }
  }
  render() {
    const {
      openLogoutDialog,
      closeLogoutDialog,
      thisRequestLogout,
      requestLogoutStatus,
      logoutResultMessage,
      dialogOpen,
    } = this.props
    return (
      <div className="ul">
        <List>
          <Link to="/products">
            <ListItem button>
              <ListItemIcon>
                <NoteAddIcon />
              </ListItemIcon>
              <ListItemText inset primary="New Article" />
            </ListItem>
          </Link>
        </List>

        <Divider />

        <List>
          <ListItem button onClick={openLogoutDialog}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText inset primary="Log Out" />
          </ListItem>
        </List>

        <Dialog
          open={dialogOpen}
          onClose={closeLogoutDialog}
        >
          <DialogTitle id="alert-dialog-title">
            Confirm logout?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Once logged out, you won't be able to create articles or manage comments.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={thisRequestLogout} color="primary">
              confirm
            </Button>
            <Button onClick={closeLogoutDialog} color="default" autoFocus>
              cancel
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={logoutResultMessage !== ''}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          message={logoutResultMessage}
        />
      </div>
    )
  }
}

const mapState = (state) => ({
  dialogOpen: state.admin.dialogOpen,
  requestLogoutStatus: state.admin.requestLogoutStatus,
  logoutResultMessage: state.admin.logoutResultMessage,
})

const mapDispatch = (dispatch) => ({
  thisRequestLogout: () => {
    dispatch(toggleLogoutDialog(false))
    dispatch(requestLogout())
  },
  openLogoutDialog: () => {
    dispatch(toggleLogoutDialog(true))
  },
  closeLogoutDialog: () => {
    dispatch(toggleLogoutDialog(false))
  },
})

export default connect(mapState, mapDispatch)(Logout)
