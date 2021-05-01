import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import {
  // throttle,
  formatToMaterialSpans,
  getStyleInt,
  throttle,
  animateToScrollHeight, removeClass, addClass, goToPath, isValidString, callIfCallable
} from '~utils'
import {withRouter} from 'react-router-dom'
import style from './header.scss'
import {MainContext} from "~/modules/Context";

class RhaegoHeader extends React.Component {

  static propTypes = {
    siteName: PropTypes.string.isRequired,
    links: PropTypes.array.isRequired,
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
    // activeNavIndex: 0,
    navBorderLeft: -1,
    navBorderRight: -1,
    rippleLeft: 0,
    rippleTop: 0
  }

  constructor(props) {
    super(props)
    this.handleHistoryChange()
  }

  handleHistoryChange = (historyState = window.location) => {
    const currPath = `${historyState.pathname}${historyState.search}`
    // 根据路由匹配到应高亮的 nav
    let activeNavIndex = this.props.links.findIndex(item => {
      return item.path === currPath || callIfCallable(item.matches, currPath)
    })
    if (!this.state.activeNavIndex) {
      this.state.activeNavIndex = activeNavIndex
    } else {
      this.setState({
        activeNavIndex
      })
    }
  }

  get bannerTitle() {
    // 常规文章页, 不获取 siteName, 避免文章标题的闪烁
    if (
      location.pathname === ('/article')
      && !/RESUME/.test(location.search)
    ) {
      return this.context.bannerTitle
    }
    return this.props.siteName
  }

  componentDidMount() {
    this.addListeners()
    this.setDefaultNavSize()
    this.props.history.listen(this.handleHistoryChange)
  }

  navListDOM = null
  setNavListRef = ref => {
    this.navListDOM = ref
  }

  setDefaultNavSize = () => {
    const defaultActiveDOM = this.navListDOM.children[this.state.activeNavIndex]
    if (defaultActiveDOM) {
      const currNavLeft = getStyleInt(defaultActiveDOM, 'left')
      const currNavWidth = getStyleInt(defaultActiveDOM, 'width')
      this.setState({
        currNavLeft,
        currNavWidth,
      })
    }
  }

  docScrollTop = 0

  setBannerHeight = (() => {
    const {scrollTop} = document.documentElement
    this.setState({
      bannerHeight: (this.BANNER_HEIGHT - scrollTop) < 0
        ? 0
        : (this.BANNER_HEIGHT - scrollTop),
      bannerTitleHidden: scrollTop > this.TITLE_HIDDEN_FROM
    })
    this.docScrollTop = scrollTop
  })

  addListeners = () => {
    // 全局 mouseup
    document.body.addEventListener('mouseup', this.onNavMouseUp)
    // 全局滚动
    window.addEventListener('scroll', this.setBannerHeight)
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

    // 点击当前 nav 时, 只切换路由, 不搞其它花里胡哨
    if (prevActiveNavIndex === index) {
      this.props.history.push(item.path)
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
    this.props.history.push(item.path)
  }

  componentWillUnmount() {
  }

  render() {
    const {
      COLORS,
      bannerTitle
    } = this
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
    const className = c(
      'rhaego-header',
      bannerTitleHidden && 'banner-title-hidden',
      this.props.className,
    )
    return (
      <header
        className={className}
        data-header-theme={themeColorName}
      >
        <div className={'nav-full-width-wrapper'}>
          {/* nav-bar 也设置背景色, 以遮挡快速滚动时的 banner */}
          <nav className={'nav-bar rhaego-responsive'}>
            <span
              className={'page-title'}
              title={bannerTitle}
            >
              {formatToMaterialSpans(bannerTitle)}
            </span>
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
        </div>
        <div className={'header-full-width-wrapper'}>
          <div className={'banner rhaego-responsive'} style={bannerStyle}>
            <h1
              className={'page-title'}
              title={bannerTitle}
            >
              {formatToMaterialSpans(bannerTitle)}
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

RhaegoHeader.contextType = MainContext

export default withRouter(RhaegoHeader)