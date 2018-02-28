import React from 'react'
import {connect} from 'react-redux'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import store from '../../Store'
import Cookies from 'js-cookie'

import App from '../app'
import {view as Articles} from '../../components/articles'
import {view as Products} from '../../components/products'
import {view as Login} from '../../components/login'
import {view as Admin} from '../../components/admin'
import {view as Editor} from '../../components/editor'
import {view as Article} from '../../components/article'
import {view as NotFound} from '../../components/notFound'
import {view as Resume} from '../../components/resume'
import {view as Messages} from '../../components/messages'

import {actions as headerActions} from '../../components/header'

const history = syncHistoryWithStore(browserHistory, store)

const Routes = ({onRouteUpdate, willEnterAdminRoute}) => (
  <Router history={history} onUpdate={onRouteUpdate}>
    <Route path="/" component={App}>
      <IndexRoute component={Articles} />
      <Route path="articles" component={Articles} />
      <Route path="article" component={Article} />
      <Route path="products" component={Products} />
      <Route path="messages" component={Messages} />
      <Route path="login" component={Login} />
      <Route path="admin" onEnter={willEnterAdminRoute}>
        <IndexRoute component={Admin} />
        <Route path="editor" component={Editor} />
      </Route>
      <Route path="about" component={Resume} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
)
const mapState = (state) => ({})
const mapDispatch = (dispatch) => ({
  // 普通路由更新时关闭抽屉
  onRouteUpdate: (n) => {
    dispatch(headerActions.toggleDrawer(false))
  },
  // 针对 /admin 下的路由做权限判定，否决则跳至登录页
  willEnterAdminRoute: (nextState, replace) => {
    const adminLoggedIn = Cookies.get('adminLoggedIn') === 'true'
    const {pathname, search} = nextState.location
    const targetUrl = encodeURIComponent(`${pathname}${search}`)
    if (!adminLoggedIn) {
      replace(`/login?referer=${targetUrl}`)
    }
  }
})

export default connect(mapState, mapDispatch)(Routes)
