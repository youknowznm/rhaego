import React from 'react'
import {withStyles} from 'material-ui/styles'
import Card from './card.js'

const styles = (theme) => ({
  main: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },

})


const content = ({classes}) => {
  <main classes={classes.main}>

  </main>
}

export default withStyles(styles)(content)
