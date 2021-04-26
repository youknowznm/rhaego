import React from 'react'
import Header from '~/components/Header'
import {siteName} from '~config'
import {
  RESUME_ID,
} from '~/utils'

const getFalse = () => false

export default props => {
  const links = [
    {
      name: '笔记',
      path: '/articles',
      matches: path => {
        const arr = /^\/article\?id=(\S+)]/.exec(path)
        return arr ? arr[1] !== RESUME_ID : false
      }
    },
    {
      name: '代码',
      path: '/repos',
      matches: getFalse,
    },
    {
      name: '关于我',
      path: '/article?id=RESUME',
      matches: getFalse,
    },
    {
      name: 'login as god',
      path: '/admin',
      matches: getFalse
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