import React from 'react'
import {Card, TextField, IconButton, Button} from 'material-ui'
import {FormControl, FormHelperText} from 'material-ui/Form';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import {Visibility, VisibilityOff} from 'material-ui-icons';
import purple from 'material-ui/colors/purple';

const Register = () => {
  return (
    <Card className="auth-content">
      <form className="form register">
        <FormControl fullWidth margin="dense">
          <InputLabel
            htmlFor="register-email"
            aria-describedby="email-helper-text"
          >
            Email
          </InputLabel>
          <Input
            id="register-email"
            type="text"
          />
          <FormHelperText id="email-helper-text">
            Any normal email format would do.
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel
            htmlFor="register-nickname"
            aria-describedby="nickname-helper-text"
          >
            Nickname
          </InputLabel>
          <Input
            id="register-nickname"
            type="text"
          />
          <FormHelperText id="nickname-helper-text">
            Nickname consists of 2 to 10 characters.
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel
            htmlFor="register-password"
            aria-describedby="password-helper-text"
          >
            Password
          </InputLabel>
          <Input
            id="register-password"
            type="password"
          />
          <FormHelperText id="password-helper-text">
            2 to 10 characters are required for password.
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel
            htmlFor="register-confirm-password"
            aria-describedby="password-helper-text"
          >
            Confirm Password
          </InputLabel>
          <Input
            disabled
            id="register-confirm-password"
            type="password"
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


export default Register
