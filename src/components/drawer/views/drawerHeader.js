import React from 'react'
import {Avatar, Typography} from 'material-ui'
import List, {ListItem} from 'material-ui/List'

const DrawerHeader = () => (
  <List className="drawer-list">
    <ListItem divider>
      <Avatar className="drawer-logo" src="/favicon.ico" alt="Site Logo" />
      <Typography type="subheading" className="drawer-title mono">
          MATERIAL BLOG
      </Typography>
    </ListItem>
  </List>
)

export default (DrawerHeader)
