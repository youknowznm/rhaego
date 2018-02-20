import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from 'material-ui/styles'
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import {Divider} from 'material-ui'
import CodeIcon from 'material-ui-icons/Code'
import InsertDriveFileIcon from 'material-ui-icons/InsertDriveFile'
import MessagesIcon from 'material-ui-icons/Message'
import PersonIcon from 'material-ui-icons/Person'
import InfoIcon from 'material-ui-icons/Info'
import {Link} from 'react-router'

const styles = (theme) => {
  return {
    active: {
      background: theme.palette.type === 'light'
        ? 'rgba(0, 0, 0, 0.14)'
        : 'rgba(255, 255, 255, 0.14)'
    }
  }
}

const DrawerBody = ({classes, firstPathname}) => (
  <div>
    <List>
      <Link to="/articles">
        <ListItem button className={firstPathname === '/articles' ? classes.active : ''}>
          <ListItemIcon>
            <InsertDriveFileIcon />
          </ListItemIcon>
          <ListItemText primary="文章" />
        </ListItem>
      </Link>
      <Link to="/products">
        <ListItem button className={firstPathname === '/products' ? classes.active : ''}>
          <ListItemIcon>
            <CodeIcon />
          </ListItemIcon>
          <ListItemText primary="作品" />
        </ListItem>
      </Link>
      <Link to="/messages">
        <ListItem button className={firstPathname === '/messages' ? classes.active : ''}>
          <ListItemIcon>
            <MessagesIcon />
          </ListItemIcon>
          <ListItemText primary="留言" />
        </ListItem>
      </Link>
    </List>

    <Divider />

    <List>
      <Link to="/about">
        <ListItem button className={firstPathname === '/about' ? classes.active : ''}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="关于" />
        </ListItem>
      </Link>
    </List>

    <List className="stick-bottom">
      <Link to="/admin">
        <ListItem button className={firstPathname === '/admin' ? classes.active : ''}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="管理" />
        </ListItem>
      </Link>
    </List>
  </div>
)

const mapState = (state) => ({
  firstPathname: state.routing.locationBeforeTransitions.pathname,
})

const DrawerBodyWrap = connect(mapState, null)(DrawerBody)

export default withStyles(styles)(DrawerBodyWrap)
