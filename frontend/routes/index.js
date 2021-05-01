import React, {useEffect, useContext} from "react"
import c from 'classnames'
import {
  BrowserRouter,
  Switch,
  withRouter,
  useLocation,
  Route, Redirect,
} from "react-router-dom"
import {
  MainContext,
  MainProvider,
  MainConsumer,
} from "~/modules/Context"
import Container from "~/modules/Container"
import Header, {links} from "~/modules/Header"
import Footer from "~/modules/Footer"
import Editor from "~/modules/Editor"
import Articles from "~/modules/Articles"
import Article from "~/modules/Article"
import Repos from "~/modules/Repos"
import Admin from "~/modules/Admin"

const ScrollToTop = () => {
  const {
    pathname,
    search,
  }  = useLocation()
  const ctx = useContext(MainContext)
  useEffect(
    () => {
      const currLinkItem = links.find(item => item.path === `${pathname}${search}`)
      currLinkItem && ctx.setDocTitle(currLinkItem.name)
      window.scrollTo(0, 0)
    },
    [pathname, search]
  )
  return null
}

export default function Routes() {
  return (
    <MainProvider>
      <BrowserRouter>
        <ScrollToTop/>
        <Header/>
        <Container>
          <Switch>
            <Route exact path="/">
              <Redirect to="/articles"/>
            </Route>
            <Route exact path="/articles">
              <Articles/>
            </Route>
            <Route exact path="/article">
              <Article/>
            </Route>
            <Route exact path="/editor">
              <Editor/>
            </Route>
            <Route exact path="/repos">
              <Repos/>
            </Route>
            <Route exact path="/admin">
              <Admin/>
            </Route>
            <Route exact path="/about">
              <Redirect to="/article?id=RESUME"/>
            </Route>
            <Route path="/">
              <p className={'page-not-found'}>
                Not Found.
              </p>
            </Route>
          </Switch>
        </Container>
        <Footer/>
      </BrowserRouter>
    </MainProvider>
  )
}