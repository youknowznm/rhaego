import React from 'react'
import Header from '~/components/Header'
import {siteName} from '~config'

export default props => {
  const links = [
    {
      name: '笔记',
      path: '/articles'
    },
    {
      name: '代码',
      path: '/repos'
    },
    {
      name: '关于我',
      path: '/article?id=RESUME'
    },
    {
      name: 'login as god',
      path: '/admin'
    },
  ]

  return (
    <Header
      siteName={siteName}
      links={links}
      {...props}
    />
  )
}