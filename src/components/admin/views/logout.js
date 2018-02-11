import React from 'react'
import {connect} from 'react-redux'
import {Button, Snackbar, Divider} from 'material-ui'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import {requestLogout, toggleLogoutDialog} from '../actions'

class Logout extends React.Component {
  componentWillUpdate(nextProps) {
    switch (nextProps.requestLogoutStatus) {
      case 'completed':
        setTimeout(() => {
          window.location.assign('/')
        }, 1500)
        break;
      case 'failed':
        setTimeout(() => {
          this.props.thisRequestLogoutInit()
        }, 1500)
        break;
      default:
        return
    }
  }
  render() {
    const {
      closeLogoutDialog,
      thisRequestLogout,
      requestLogoutStatus,
      logoutResultMessage,
      dialogOpen,
    } = this.props
    return (
      <div>
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
  closeLogoutDialog: () => {
    dispatch(toggleLogoutDialog(false))
  },
})

export default connect(mapState, mapDispatch)(Logout)
