import React from 'react'
import {Avatar, Typography} from 'material-ui'
import List, {ListItem} from 'material-ui/List'

const DrawerHeader = ({classes}) => (
  <List className="list">
    <ListItem divider>
      <Avatar className="logo" src="/favicon.ico" alt="Site Logo" />
      <Typography type="subheading" className="title mono" color="inherit">
          MATERIAL BLOG
      </Typography>
    </ListItem>
  </List>
)

export default (DrawerHeader)
