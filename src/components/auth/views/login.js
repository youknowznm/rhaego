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

const Login = ({classes}) => {
  return (
    <Card className="auth-content" >

      <FormControl fullWidth margin="normal">
        <InputLabel
          htmlFor="login-email"
          FormControlClasses={{
            focused: classes.inputLabelFocused
          }}
          aria-describedby="email-helper-text"
        >
          Email
        </InputLabel>
        <Input
          id="login-email"
          type="text"
          classes={{
            inkbar: classes.inputInkbar
          }}
        />
        <FormHelperText id="email-helper-text">
          Any normal email format would do.
        </FormHelperText>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel
          htmlFor="login-password"
          FormControlClasses={{
            focused: classes.inputLabelFocused
          }}
          aria-describedby="password-helper-text"
        >
          Password
        </InputLabel>
        <Input
          id="login-password"
          type="password"
          classes={{
            inkbar: classes.inputInkbar
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
              >
                <VisibilityOff />
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText id="password-helper-text">
          2 to 10 characters are required for password.
        </FormHelperText>
      </FormControl>

      <Button className="action-button"
        disabled
        raised
        fullWidth
        color="default"
      >
        login
      </Button>

    </Card>
  );
}


export default withStyles(styles)(Login)
