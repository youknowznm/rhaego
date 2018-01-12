import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import {Avatar, Typography} from 'material-ui'
import List, {ListItem, ListItemIcon, ListItemAvatar, ListItemText} from 'material-ui/List'
import FolderIcon from 'material-ui-icons/Folder';
import {SplitToSpans} from '../../../utils'

const styles = () => ({
  root: {
    padding: 0,
  },
  img: {
    borderRadius: 0,
  },
  hasLeftMargin: {
    marginLeft: 20,
  }
})

const DrawerHeader = ({classes}) => (
  <List className={classes.root}>
    <ListItem divider>
      <Avatar className={classes.img} src="/favicon.ico" alt="Site Logo" />
      <Typography type="subheading" className={classes.hasLeftMargin}>
        <SplitToSpans />
      </Typography>
    </ListItem>
  </List>
)

export default withStyles(styles)(DrawerHeader)
