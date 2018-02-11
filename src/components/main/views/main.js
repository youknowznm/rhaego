import React from 'react'
import {connect} from 'react-redux'

import './main.css'

class Main extends React.Component {
  state = {
    minHeight: 0
  }
  componentDidMount() {
    this.adjustminHeight()
    window.addEventListener('resize', this.adjustminHeight)
  }
  adjustminHeight = () => {
    // 获取视口高度减掉头部和尾部后的值
    let minHeight = window.innerHeight - (64 + 12) - (160 + 72 + 144)
    this.setState({minHeight})
  }
  render() {
    const {children, mainClassName} = this.props
    return (
      <main className="mb-main">
        <div className="content" data-route={mainClassName} style={{minHeight: this.state.minHeight}}>
          {children}
        </div>
      </main>
    )
  }
}

const mapState = (state) => {
  let {pathname} = state.routing.locationBeforeTransitions
  return {
    mainClassName: pathname.replace('/', '')
  }
}

export default connect(mapState)(Main)
