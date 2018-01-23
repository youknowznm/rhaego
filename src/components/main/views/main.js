import React from 'react'

import './main.css'

class Main extends React.Component {
  constructor() {
    super(...arguments)
    this.adjustminHeight = this.adjustminHeight.bind(this)
    this.state = {minHeight: 0}
  }
  componentDidMount() {
    this.adjustminHeight()
    window.addEventListener('resize', this.adjustminHeight)
  }
  adjustminHeight() {
    // 获取视口高度减掉头部和尾部后的值
    let minHeight = window.innerHeight - (64 + 12) - (72 + 72 + 144)
    this.setState({minHeight})
  }
  render() {
    const {children} = this.props
    return (
      <main className="mb-main">
        <div className="content" style={{minHeight: this.state.minHeight}}>
          {children}
        </div>
      </main>
    )
  }
}

export default Main
