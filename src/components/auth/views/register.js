import React from 'react'
import { withStyles } from 'material-ui/styles';
import {Card, TextField, IconButton, Button} from 'material-ui'
import {FormControl, FormHelperText} from 'material-ui/Form';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import {Visibility, VisibilityOff} from 'material-ui-icons';
import purple from 'material-ui/colors/purple';

const styles = theme => ({
  inputLabelFocused: {
    color: purple[500],
  },
  inputInkbar: {
    '&:after': {
      backgroundColor: purple[500],
    },
  },
})

const Register = ({classes}) => {
  return (
    <Card className="auth-content" >

      <form className="form register">
        <FormControl fullWidth margin="dense">
          <InputLabel
            htmlFor="register-email"
            FormControlClasses={{
              focused: classes.inputLabelFocused
            }}
            aria-describedby="email-helper-text"
          >
            Email
          </InputLabel>
          <Input
            id="register-email"
            type="text"
            classes={{
              inkbar: classes.inputInkbar
            }}
          />
          <FormHelperText id="email-helper-text">
            Any normal email format would do.
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel
            htmlFor="register-nickname"
            FormControlClasses={{
              focused: classes.inputLabelFocused
            }}
            aria-describedby="nickname-helper-text"
          >
            Nickname
          </InputLabel>
          <Input
            id="register-nickname"
            type="text"
            classes={{
              inkbar: classes.inputInkbar
            }}
          />
          <FormHelperText id="nickname-helper-text">
            Nickname consists of 2 to 10 characters.
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel
            htmlFor="register-password"
            FormControlClasses={{
              focused: classes.inputLabelFocused
            }}
            aria-describedby="password-helper-text"
          >
            Password
          </InputLabel>
          <Input
            id="register-password"
            type="password"
            classes={{
              inkbar: classes.inputInkbar
            }}
          />
          <FormHelperText id="password-helper-text">
            2 to 10 characters are required for password.
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel
            htmlFor="register-confirm-password"
            FormControlClasses={{
              focused: classes.inputLabelFocused
            }}
            aria-describedby="password-helper-text"
          >
            Confirm Password
          </InputLabel>
          <Input
            id="register-confirm-password"
            type="password"
            classes={{
              inkbar: classes.inputInkbar
            }}
          />
          <FormHelperText id="password-helper-text">
            Type your password again.
          </FormHelperText>
        </FormControl>
      </form>

      <Button className="action-button"
        disabled
        raised
        fullWidth
        color="default"
      >
        Register
      </Button>
    </Card>
  );
}


export default withStyles(styles)(Register)
