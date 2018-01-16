import React from 'react'
import {withStyles} from 'material-ui/styles'
import {Avatar, Typography} from 'material-ui'
import List, {ListItem} from 'material-ui/List'

const styles = (theme) => ({
  root: {
    padding: 0,
  },
  img: {
    borderRadius: 0,
  },
  title: {
    marginLeft: 20,
    fontFamily: 'Roboto Mono',
  }
})

const DrawerHeader = ({classes}) => (
  <List className={classes.root}>
    <ListItem divider>
      <Avatar className={classes.img} src="/favicon.ico" alt="Site Logo" />
      <Typography type="subheading" className={classes.title} color="inherit">
          MATERIAL BLOG
      </Typography>
    </ListItem>
  </List>
)

export default withStyles(styles)(DrawerHeader)
