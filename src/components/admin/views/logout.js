import React from 'react'
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

import './logout.css'

class Logout extends React.Component {
  constructor() {
    super(...arguments)
    this.state = {
      dialogOpen: false,
      logoutResultMessage: '',
    }
  }
  openConfirmDialog = () => {
    this.setState({
      dialogOpen: true
    })
  }
  closeConfirmDialog = () => {
    this.setState({
      dialogOpen: false
    })
  }
  logout = () => {
    let that = this
    that.setState({
      dialogOpen: false
    })
    axios
      .post(logoutApi)
      .then(() => {
        that.setState({
          logoutResultMessage: 'Logout successful. Redirecting to homepage.',
        })
        setTimeout(() => {
          window.location.assign('/')
        }, 2000)
      })
      .catch(() => {
        that.setState({
          logoutResultMessage: 'An error occurred. Please try again later.',
        })
        setTimeout(() => {
          that.setState({
            logoutResultMessage: '',
          })
        }, 2000)
      })
  }
  render() {
    const {
      dialogOpen,
      logoutResultMessage,
      minHeight,
    } = this.state
    const {
      classes,
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
          <ListItem button onClick={this.openConfirmDialog}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText inset primary="Log Out" />
          </ListItem>
        </List>

        <Dialog
          open={dialogOpen}
          onClose={this.closeConfirmDialog}
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
            <Button onClick={this.logout} color="primary">
              confirm
            </Button>
            <Button onClick={this.closeConfirmDialog} color="default" autoFocus>
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

export default Logout
