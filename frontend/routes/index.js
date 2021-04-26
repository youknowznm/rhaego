import React, {useEffect} from "react"
import c from 'classnames'
import {
  BrowserRouter,
  Switch,
  withRouter,
  useLocation,
  Route,
} from "react-router-dom"
import Main from "~/modules/Main"
import Header from "~/modules/Header"
import Footer from "~/modules/Footer"
import Editor from "~/modules/Editor"
import Articles from "~/modules/Articles"
import Article from "~/modules/Article"
import Repos from "~/modules/Repos"
import Admin from "~/modules/Admin"

const ScrollToTop = () => {
  const {pathname}  = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function Routes() {
  return (
      <BrowserRouter>
        <ScrollToTop />
        <Header/>
        <Main>
          <Switch>
            <Route exact path="/">
              <Articles />
            </Route>
            <Route exact path="/articles">
              <Articles />
            </Route>
            <Route exact path="/article">
              <Article />
            </Route>
            <Route exact path="/editor">
              <Editor />
            </Route>
            <Route exact path="/repos">
              <Repos />
            </Route>
            <Route exact path="/admin">
              <Admin />
            </Route>
            <Route path="/">
              <p>404</p>
            </Route>
          </Switch>
        </Main>
        <Footer />
      </BrowserRouter>
  )
}

// import React from 'react'
// import {connect} from 'react-redux'
// import {Router, Route, IndexRoute, browserHistory} from 'react-routes'
//
// import App from '../app'
// import {view as Articles} from '../../../_modules/articles'
// import {view as Products} from '../../../_modules/products'
// import {view as Admin} from '../../../_modules/Admin'
// import {view as Admin} from '../../../_modules/admin'
// import {view as Editor} from '../../../_modules/editor'
// import {view as Article} from '../../../_modules/article'
// import {view as NotFound} from '../../../_modules/notFound'
// import {view as Resume} from '../../../_modules/resume'
// import {view as Messages} from '../../../_modules/messages'
//
// import {actions as headerActions} from '../../../_modules/header'
//
// const history = syncHistoryWithStore(browserHistory, store)
//
// const Routes = ({onRouteUpdate, willEnterAdminRoute}) => (
//   <Router history={history} onUpdate={onRouteUpdate}>
//     <Route path="/" component={App}>
//       <IndexRoute component={Articles} />
//       <Route path="articles" component={Articles} />
//       <Route path="article" component={Article} />
//       <Route path="products" component={Products} />
//       <Route path="messages" component={Messages} />
//       <Route path="Admin" component={Admin} />
//       <Route path="admin" onEnter={willEnterAdminRoute}>
//         <IndexRoute component={Admin} />
//         <Route path="editor" component={Editor} />
//       </Route>
//       <Route path="about" component={Resume} />
//       <Route path="*" component={NotFound} />
//     </Route>
//   </Router>
// )
// const mapState = (state) => ({})
// const mapDispatch = (dispatch) => ({
//   // 普通路由更新时关闭抽屉，滚动页面至顶部
//   onRouteUpdate: (n) => {
//     dispatch(headerActions.toggleDrawer(false))
//     document.scrollingElement.scrollTop = 0
//   },
//   // 针对 /admin 下的路由做权限判定，否决则跳至登录页
//   willEnterAdminRoute: (nextState, replace) => {
//     const adminLoggedIn = Cookies.get('adminLoggedIn') === 'true'
//     const {pathname, search} = nextState.location
//     const targetUrl = encodeURIComponent(`${pathname}${search}`)
//     if (!adminLoggedIn) {
//       replace(`/Admin?referer=${targetUrl}`)
//     }
//   }
// })
//
// export default connect(mapState, mapDispatch)(Routes)
