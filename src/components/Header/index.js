import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import {compConfig} from '../../config'
import {
  decorateStyle,
  debounce,
  getStyleInt,
  animateToTop
} from '../../utils'
const {classPrefix} = compConfig

const colors = [
  'silver',
  'gray',
  'yellow',
  'blue',
  'red',
  'green',
]

import style from './style.scss'

// @decorateStyle(style)
export default class RhaegoHeader extends React.Component {

  static propTypes = {
    siteName: PropTypes.string.isRequired,
    links: PropTypes.array.isRequired,
    // asyncStatus: PropTypes.string.isRequired,
    // asyncResultMessage: PropTypes.string.isRequired,
  }

  static defaultProps = {
    siteName: 'Rhaego Example Header',
    // siteName: '[ˈvæŋkwɪʃ]',
    links: [],
  }

  BANNER_HEIGHT = 192
  BANNER_TITLE_HIDDEN = false

  rippling = false

  state = {
    bannerHeight: this.BANNER_HEIGHT,
    bannerTitleHidden: this.BANNER_TITLE_HIDDEN,
    currNavLeft: 0,
    currNavWidth: -1,
    activeNavIndex: 0,
    indicatorLeft: -1,
    indicatorRight: -1,
  }
  
  componentDidMount() {
    this.handleScroll()
    this.setDefaultNavSize()
    this.listenNavIndicatorAnimationEnd()
  }

  formatToMaterialSpans = string => {
    const separated = string.split(/\s+/)
    return (
      <span className={''}>
        {separated.map(item => (<span className={`${classPrefix}-single-word`}>{item}</span>))}
      </span>
    )
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

  handleScroll = () => {
    window.addEventListener('scroll', () => {
      const {scrollTop} = document.documentElement
      this.setState({
        bannerHeight: (this.BANNER_HEIGHT - scrollTop) < 0
          ? 0
          : (this.BANNER_HEIGHT - scrollTop),
        bannerTitleHidden: scrollTop > 30
      })
    })
  }

  handleNavMouseDown = evt => {
    if (this.rippling === false) {
      // this.rippling = true
      // let $targetBtn = $(this)
      // $buttonClicked = $targetBtn.addClass('clicking')
      // $ripple
      //   .css({
      //     // 直接从鼠标系事件中取得相对于页面的坐标
      //     left: evt.pageX - 50,
      //     // top 值要减掉窗口的垂直滚动偏移
      //     top: evt.pageY - 50 - $window.scrollTop(),
      //   })
      //   .addClass('noneToCircle')
    }
  }

  navIndicatorRef = null
  setNavWrapRef = ref => {
    this.navIndicatorRef = ref
  }

  listenNavIndicatorAnimationEnd = () => {
    const ref = this.navIndicatorRef
    ref.addEventListener('animationend', () => {
      ref.classList.remove('flow-to-right', 'flow-to-left')
      ref.classList.add('hidden')
    })
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
    let indicatorLeft
    let indicatorRight
    if (targetAtCurrRight) {
      // 新目标在旧的右侧
      indicatorLeft = prevNavLeft
      indicatorRight = currNavLeft + currNavWidth
    } else {
      // 左侧
      indicatorLeft = currNavLeft
      indicatorRight = prevNavLeft + prevNavWidth
    }

    this.setState({
      activeNavIndex: index,
      currNavLeft,
      currNavWidth,
      indicatorLeft,
      indicatorRight
    })
    
    const ref = this.navIndicatorRef
    ref.classList.remove('hidden')
    ref.classList.add(targetAtCurrRight ? 'flow-to-right' : 'flow-to-left')
    
    animateToTop()
  }

  render() {
    const {
      bannerTitleHidden,
      activeNavIndex,
    } = this.state
    const indicatorStyle = {
      left: this.state.indicatorLeft,
      right: this.state.indicatorRight,
      width: this.state.indicatorRight - this.state.indicatorLeft,
    }
    const bannerStyle = {
      height: this.state.bannerHeight
    }
    const themeColorName = colors[this.state.activeNavIndex % colors.length]
    return (
      <header className={`${classPrefix}-header`} style={style} data-theme={themeColorName}>
        <div className={'header-content rhaego-responsive'}>
          <nav className={'nav-bar'}>
            <a className={c('site-title', !bannerTitleHidden && 'transparent')} href="/">
              {this.formatToMaterialSpans(this.props.siteName)}
            </a>
            <ul className="nav-buttons" ref={this.setNavListRef} >
              {
                this.props.links.map((item, index) => (
                  <li
                    className={c('nav-button', index === activeNavIndex && 'active')}
                    onClick={this.getClickNavHandler(item, index)}
                  >
                    {item.name}
                  </li>
                ))
              }
              <li className="nav-indicator" style={indicatorStyle} ref={this.setNavWrapRef} />
            </ul>
          </nav>
          <div className={c('banner')} style={bannerStyle}>
            <h1 className={c('title', bannerTitleHidden && 'transparent')}>
              {this.formatToMaterialSpans(this.props.siteName)}
            </h1>
          </div>
        </div>
        <span className={'ripple'} />
      </header>
    )
  }
}