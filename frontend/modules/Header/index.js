import React from 'react'
import Header from '~/components/Header'
import {siteName} from '~config'

export default props => {
  const links = [
    {
      name: '笔记',
      path: '/articles',
      // matches: [/^\/article\?id=[^(RESUME)]/]
    },
    {
      name: '代码',
      path: '/repos',
      // matches: []
    },
    {
      name: '关于我',
      path: '/article?id=RESUME',
      // matches: []
    },
    {
      name: 'login as god',
      path: '/admin',
      // matches: []
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