import React from 'react'

import './main.scss'

const Main = ({classes, children}) => (
  <main className="mb-main">
    <div className="content">
      {children}
    </div>
  </main>
)

export default Main
