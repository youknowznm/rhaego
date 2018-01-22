import React from 'react'
import {connect} from 'react-redux'
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List'
import {Divider} from 'material-ui'
import CodeIcon from 'material-ui-icons/Code'
import InsertDriveFileIcon from 'material-ui-icons/InsertDriveFile'
import MessagesIcon from 'material-ui-icons/Message'
import InfoIcon from 'material-ui-icons/Info'
import {Link} from 'react-router'

// 判断目标字符串和当前的一级pathname是否一致，是则返回‘active’，否则返回空字符串
const matchesPathname = (target) => {
  const allPathname = window.location.pathname
  let regArr = /^\/[^\/]+/.exec(allPathname)
  let result = regArr ? regArr[0] : '/articles'
  return result === target ? 'active' : '';
}

const DrawerBody = ({classes, currentPathname}) => (
  <div>
    <List>
      <Link to="/articles">
        <ListItem button className={matchesPathname('/articles')}>
          <ListItemIcon>
            <InsertDriveFileIcon />
          </ListItemIcon>
          <ListItemText primary="Articles" />
        </ListItem>
      </Link>

      <Link to="/products">
        <ListItem button className={matchesPathname('/products')}>
          <ListItemIcon>
            <CodeIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>
      </Link>

      <Link to="/messages">
        <ListItem button className={matchesPathname('/messages')}>
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
        <ListItem button className={matchesPathname('/about-author')}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="About Author" />
        </ListItem>
      </Link>
    </List>
  </div>
)

export default DrawerBody
