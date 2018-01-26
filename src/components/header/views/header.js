import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {withStyles} from 'material-ui'
import {AppBar, Toolbar, Typography, Button, IconButton, Switch} from 'material-ui'
import { FormControlLabel, FormGroup } from 'material-ui/Form'
import {green} from 'material-ui/colors'
import MenuIcon from 'material-ui-icons/Menu'
import {SplitToSpans} from '../../../utils'
import {toggleDrawer} from '../actions'
import {actions as themeActions} from '../../../containers/theme'

import './header.css'

const drawerWidth = 250

const styles = (theme) => ({
  'nav-icon-button': {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  header: {
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  bar: {},
  checked: {
    color: green[500],
    '& + $bar': {
      backgroundColor: green[500],
    },
  },
})

const Header = ({classes, thisToggleDrawer, isDarkTheme, thisToggleThemeType}) => (
  <AppBar color="primary" className={classes.header}>
    <Toolbar>
      <IconButton color="inherit" className={classes['nav-icon-button']} onClick={thisToggleDrawer}>
        <MenuIcon />
      </IconButton>
      <Typography className="title mono" color="inherit" type="title">
        <SplitToSpans />
      </Typography>

      <FormControlLabel
        control={
          <Switch
            checked={isDarkTheme}
            onChange={thisToggleThemeType}
            classes={{
              checked: classes.checked,
              bar: classes.bar,
            }}
          />
        }
        color="inherit"
        label="Dark Theme"
      />

      <Link to="/auth">
        <Button color="inherit">login</Button>
      </Link>
    </Toolbar>
  </AppBar>
)

const mapState = (state, ownProps) => ({
  isDarkTheme: state.theme.type === 'dark'
})

const mapDispatch = (dispatch, ownProps) => ({
  thisToggleDrawer: () => dispatch(toggleDrawer(null)),
  thisToggleThemeType: () => dispatch(themeActions.toggleThemeType()),
})

const HeaderWrap = connect(mapState, mapDispatch)(Header)

export default withStyles(styles)(HeaderWrap)
