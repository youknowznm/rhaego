import React from 'react'
import {Button, Snackbar} from 'material-ui'
import axios from 'axios'
import {logout as logoutApi} from '../../../api'
import Dialog,{
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'

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
          logoutResultMessage: 'Logout successful. Redirecting to index.',
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
    } = this.state
    return (
      <div>
        <Button onClick={this.openConfirmDialog} raised>log out</Button>
        <Dialog
          open={dialogOpen}
          onClose={this.closeConfirmDialog}
        >
          <DialogTitle id="alert-dialog-title">
            Confirm logout?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Once logged out, you won't be able to manage articles, comment or messages.
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
