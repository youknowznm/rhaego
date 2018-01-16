import React from 'react'
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import {Divider} from 'material-ui'
import CodeIcon from 'material-ui-icons/Code'
import InsertDriveFileIcon from 'material-ui-icons/InsertDriveFile'
import MessagesIcon from 'material-ui-icons/Message'
import InfoIcon from 'material-ui-icons/Info'

const DrawerBody = ({classes}) => (
  <div>
    <List>
      <ListItem button>
        <ListItemIcon>
          <InsertDriveFileIcon />
        </ListItemIcon>
        <ListItemText primary="Articles" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <CodeIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <MessagesIcon />
        </ListItemIcon>
        <ListItemText primary="Messages" />
      </ListItem>
    </List>

    <Divider />

    <List>
      <ListItem button>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="About Author" />
      </ListItem>
    </List>
  </div>
)

export default DrawerBody
