import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import {
  // throttle,
  formatToMaterialSpans,
  getStyleInt,
  throttle,
  animateToScrollHeight, removeClass, addClass
} from '~utils'

import style from './header.scss'

export default class RhaegoHeader extends React.Component {

  static propTypes = {
    siteName: PropTypes.string.isRequired,
    links: PropTypes.array.isRequired,
    // activeNavIndex:
  }

  static defaultProps = {
    siteName: 'Rhaego Example Header',
    links: [],
  }

  COLORS = [
    'silver',
    'grey',
    'yellow',
    'blue',
    'red',
    'green',
  ]

  BANNER_HEIGHT = 192
  TITLE_HIDDEN_FROM = 30
  RIPPLE_RADIUS = 50

  state = {
    bannerHeight: this.BANNER_HEIGHT,
    bannerTitleHidden: false,
    currNavLeft: 0,
    currNavWidth: -1,
    activeNavIndex: 0,
    navBorderLeft: -1,
    navBorderRight: -1,
    rippleLeft: 0,
    rippleTop: 0
  }

  componentDidMount() {
    this.addListeners()
    this.setDefaultNavSize()
  }

  navListDOM
  setNavListRef = ref => {
    this.navListDOM = ref
  }

  setDefaultNavSize = () => {
    const defaultActiveDOM = this.navListDOM.children[this.state.activeNavIndex]
    const currNavLeft = getStyleInt(defaultActiveDOM, 'left')
    const currNavWidth = getStyleInt(defaultActiveDOM, 'width')
    this.setState({
      currNavLeft,
      currNavWidth,
    })
  }

  docScrollTop = 0

  addListeners = () => {
    // 全局 mouseup
    document.body.addEventListener('mouseup', this.onNavMouseUp)

    // 全局滚动
    window.addEventListener('scroll', throttle(() => {
      const {scrollTop} = document.documentElement
      this.setState({
        bannerHeight: (this.BANNER_HEIGHT - scrollTop) < 0
          ? 0
          : (this.BANNER_HEIGHT - scrollTop),
        bannerTitleHidden: scrollTop > this.TITLE_HIDDEN_FROM
      })
      this.docScrollTop = scrollTop
    }), 200)

    // 下划线和波纹的动画结束
    const {
      navBorderRef,
      rippleRef
    } = this
    navBorderRef.addEventListener('animationend', () => {
      removeClass(navBorderRef, 'flow-to-right', 'flow-to-left')
      addClass(navBorderRef, 'hidden')
    })
    rippleRef.addEventListener('animationend', () => {
      removeClass(rippleRef, 'fade')
    })
  }

  rippleRef = null
  setRippleRef = ref => {
    this.rippleRef = ref
  }

  rippling = false
  onNavMouseDown = evt => {
    const nativeEvt = evt.nativeEvent
    const rippleLeft = nativeEvt.pageX - this.RIPPLE_RADIUS
    const rippleTop = nativeEvt.pageY - this.RIPPLE_RADIUS - this.docScrollTop
    this.setState({
      rippleLeft,
      rippleTop,
    })
    addClass(this.rippleRef, 'appear')
    this.rippling = true
  }

  // 对波纹已设置了 pointer-events: none
  // 这样 mouseup 时, 仍可触发期望的 nav click 事件
  onNavMouseUp = evt => {
    if (this.rippling) {
      removeClass(this.rippleRef, 'appear')
      addClass(this.rippleRef, 'fade')
      this.rippling = false
    }
  }

  navBorderRef = null
  setNavBorderRef = ref => {
    this.navBorderRef = ref
  }

  getClickNavHandler = (item, index) => (evt) => {
    const {
      currNavLeft: prevNavLeft,
      currNavWidth: prevNavWidth,
      activeNavIndex: prevActiveNavIndex
    } = this.state

    if (prevActiveNavIndex === index) {
      return
    }

    const target = evt.nativeEvent.target
    const currNavLeft = target.offsetLeft
    const currNavWidth = getStyleInt(target, 'width')

    let targetAtCurrRight = currNavLeft > prevNavLeft
    let navBorderLeft
    let navBorderRight
    if (targetAtCurrRight) {
      // 新目标在旧的右侧
      navBorderLeft = prevNavLeft
      navBorderRight = currNavLeft + currNavWidth
    } else {
      // 左侧
      navBorderLeft = currNavLeft
      navBorderRight = prevNavLeft + prevNavWidth
    }

    this.setState({
      activeNavIndex: index,
      currNavLeft,
      currNavWidth,
      navBorderLeft,
      navBorderRight
    })

    const ref = this.navBorderRef
    removeClass(ref,'hidden')
    addClass(ref, targetAtCurrRight ? 'flow-to-right' : 'flow-to-left')

    animateToScrollHeight(0)
  }

  render() {
    const {COLORS} = this
    const {
      bannerTitleHidden,
      activeNavIndex,
    } = this.state
    const navBorderStyle = {
      left: this.state.navBorderLeft,
      right: this.state.navBorderRight,
      width: this.state.navBorderRight - this.state.navBorderLeft,
    }
    const rippleStyle = {
      left: this.state.rippleLeft,
      top: this.state.rippleTop,
    }
    const bannerStyle = {
      height: this.state.bannerHeight
    }
    const themeColorName = COLORS[activeNavIndex % COLORS.length]
    return (
      <header className={'rhaego-header'} data-header-theme={themeColorName}>
        <div className={'header-content rhaego-responsive'}>
          <nav className={'nav-bar'}>
            <a className={c('site-title', !bannerTitleHidden && 'transparent')} href="/">
              {formatToMaterialSpans(this.props.siteName)}
            </a>
            <ul className="nav-buttons" ref={this.setNavListRef} >
              {
                this.props.links.map((item, index) => (
                  <li
                    key={index}
                    className={c('nav-button', index === activeNavIndex && 'active')}
                    onClick={this.getClickNavHandler(item, index)}
                    onMouseDown={this.onNavMouseDown}
                  >
                    {item.name}
                  </li>
                ))
              }
              <li className="nav-border" key={-1} style={navBorderStyle} ref={this.setNavBorderRef} />
            </ul>
          </nav>
          <div className={c('banner')} style={bannerStyle}>
            <h1 className={c('title', bannerTitleHidden && 'transparent')}>
              {formatToMaterialSpans(this.props.siteName)}
            </h1>
          </div>
        </div>
        <span
          className={'ripple'}
          style={rippleStyle}
          ref={this.setRippleRef}
        />
      </header>
    )
  }
}