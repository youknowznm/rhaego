import React from 'react'
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import {Divider} from 'material-ui'
import CodeIcon from 'material-ui-icons/Code'
import InsertDriveFileIcon from 'material-ui-icons/InsertDriveFile'
import MessagesIcon from 'material-ui-icons/Message'
import InfoIcon from 'material-ui-icons/Info'
import {Link} from 'react-router'

const DrawerBody = ({classes}) => (
  <div>
    <List>
      <Link to="/articles">
        <ListItem button>
          <ListItemIcon>
            <InsertDriveFileIcon />
          </ListItemIcon>
          <ListItemText primary="Articles" />
        </ListItem>
      </Link>

      <Link to="/products">
        <ListItem button>
          <ListItemIcon>
            <CodeIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>
      </Link>


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
