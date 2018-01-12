import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import {Divider} from 'material-ui'
// import {Collapse} from 'material-ui/transitions'
import CodeIcon from 'material-ui-icons/Code'
import InsertDriveFileIcon from 'material-ui-icons/InsertDriveFile'
import MessagesIcon from 'material-ui-icons/Message'
import InfoIcon from 'material-ui-icons/Info'
// import ExpandLess from 'material-ui-icons/ExpandLess'
// import ExpandMore from 'material-ui-icons/ExpandMore'
// import PersonIcon from 'material-ui-icons/Person'
// import WebIcon from 'material-ui-icons/Web'

const DrawerBody = ({classes}) => (
  <div>
    <List>
      <ListItem button>
        <ListItemIcon>
          <InsertDriveFileIcon />
        </ListItemIcon>
        <ListItemText primary="Posts" />
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
        <ListItemText primary="About" />
      </ListItem>
    </List>
  </div>
)

export default DrawerBody
