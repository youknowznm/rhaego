import React from 'react'
import {connect} from 'react-redux'
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import {Divider} from 'material-ui'
import CodeIcon from 'material-ui-icons/Code'
import InsertDriveFileIcon from 'material-ui-icons/InsertDriveFile'
import MessagesIcon from 'material-ui-icons/Message'
import InfoIcon from 'material-ui-icons/Info'
import {Link} from 'react-router'

const DrawerBody = ({firstPathname}) => (
  <div>
    <List>
      <Link to="/articles">
        <ListItem button className={firstPathname === '/articles' ? 'active' : ''}>
          <ListItemIcon>
            <InsertDriveFileIcon />
          </ListItemIcon>
          <ListItemText primary="Articles" />
        </ListItem>
      </Link>

      <Link to="/products">
        <ListItem button className={firstPathname === '/products' ? 'active' : ''}>
          <ListItemIcon>
            <CodeIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>
      </Link>

      <Link to="/messages">
        <ListItem button className={firstPathname === '/messages' ? 'active' : ''}>
          <ListItemIcon>
            <MessagesIcon />
          </ListItemIcon>
          <ListItemText primary="Messages" />
        </ListItem>
      </Link>

    </List>

    <Divider />

    <List>
      <Link to="/about-author">
        <ListItem button className={firstPathname === '/about-author' ? 'active' : ''}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="About Author" />
        </ListItem>
      </Link>
    </List>
  </div>
)

const mapState = (state, ownProps) => ({
  firstPathname: state.routes.firstPathname,
})

export default connect(mapState, null)(DrawerBody)
