import React, {useEffect, useContext} from 'react'
import {
  BrowserRouter,
  Switch,
  useLocation,
  Route, Redirect,
} from 'react-router-dom'
import loadable from '@loadable/component'
import {
  MainContext,
  MainProvider,
} from '~/modules/Context'

import {links} from '~/modules/Header'
const Container = loadable(() => import('~/modules/Container'))
const Header = loadable(() => import('~/modules/Header'))
const Footer = loadable(() => import('~/modules/Footer'))
const Editor = loadable(() => import('~/modules/Editor'))
const Articles = loadable(() => import('~/modules/Articles'))
const Article = loadable(() => import('~/modules/Article'))
const Repos = loadable(() => import('~/modules/Repos'))
const Admin = loadable(() => import('~/modules/Admin'))

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
            <Route exact path='/'>
              <Redirect to='/articles'/>
            </Route>
            <Route exact path='/articles'>
              <Articles/>
            </Route>
            <Route exact path='/article'>
              <Article/>
            </Route>
            <Route exact path='/about'>
              <Redirect to='/article?id=RESUME'/>
            </Route>
            <Route exact path='/editor'>
              <Editor/>
            </Route>
            <Route exact path='/repos'>
              <Repos/>
            </Route>
            <Route exact path='/admin'>
              <Admin/>
            </Route>
            <Route path='/'>
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