import React from 'react'
import RhaegoHeader from '~/components/Header'
import {
  bannerDefaultTitle,
  showResumeOnHeaderNav,
} from '~config'
import {RESUME_ID} from "~utils";

export const links = [
  {
    name: '笔记',
    path: '/articles',
    matches: path => {
      if (showResumeOnHeaderNav) {
        const arr = /^\/article\?id=(\S+)/.exec(path)
        return arr ? arr[1] !== RESUME_ID : false
      } else {
        return /^\/article/.test(path)
      }
    }
  },
  {
    name: '代码',
    path: '/repos',
    matches: null,
  },
  showResumeOnHeaderNav && {
    name: '关于我',
    path: '/article?id=RESUME',
    matches: null,
  },
  {
    name: '管理员登录',
    path: '/admin',
    matches: null
  },
].filter(Boolean)

class Header extends React.Component {
  render () {
    return (
      <RhaegoHeader
        bannerTitle={bannerDefaultTitle}
        links={links}
        {...this.props}
      />
    )
  }
}

export default Header