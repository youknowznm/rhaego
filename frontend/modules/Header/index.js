import React from 'react'
import RhaegoHeader from '~/components/Header'
import {bannerDefaultTitle} from '~config'
import {RESUME_ID} from "~utils";

export const links = [
  {
    name: '笔记',
    path: '/articles',
    matches: path => {
      return /^\/article/.test(path)
      // 如果期望让简历链接展示在首页, 打开此注释
      // const arr = /^\/article\?id=(\S+)/.exec(path)
      // return arr ? arr[1] !== RESUME_ID : false
    }
  },
  {
    name: '代码',
    path: '/repos',
    matches: null,
  },
  // 如果期望让简历链接展示在首页, 打开此注释
  // {
  //   name: '关于我',
  //   path: '/article?id=RESUME',
  //   matches: null,
  // },
  {
    name: '管理员登录',
    path: '/admin',
    matches: null
  },
]

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