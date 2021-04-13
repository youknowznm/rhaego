import React from 'react'
import {Avatar, Typography, Divider} from 'material-ui'
import List, {ListItem} from 'material-ui/List'
import {SplitToSpans} from '../../../utils'

const DrawerHeader = () => (
  <List className="drawer-list">
    <ListItem>
      <Avatar className="drawer-logo" src="/favicon.ico" alt="Site Logo" />
      <Typography type="subheading" className="drawer-title mono">
        {/* Rhaego */}
        <SplitToSpans>You Know znM</SplitToSpans>
      </Typography>
    </ListItem>
    <Divider className="drawer-header-hr"/>
  </List>
)

export default (DrawerHeader)
