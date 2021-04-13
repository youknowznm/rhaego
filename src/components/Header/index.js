import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import {compConfig} from '../../config'
import {
  decorateStyle,
  debounce,
  animateToTop
} from '../../utils'
const {classPrefix} = compConfig

const colors = [
  'gray',
  'silver',
  'blue',
  'yellow',
  'red',
  'green',
]

import style from './style.scss'

@decorateStyle(style)
export default class extends React.Component {

  static propTypes = {
    siteName: PropTypes.string.isRequired,
    links: PropTypes.array.isRequired,
    // asyncStatus: PropTypes.string.isRequired,
    // asyncResultMessage: PropTypes.string.isRequired,
  }

  static defaultProps = {
    siteName: 'Example Header',
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
    currNavRight: 0,
    currNavWidth: 0,
    activeNavIndex: -1
  }
  
  componentDidMount() {
    this.handleScroll()

  }

  formatToMaterialSpans = string => {
    const separated = string.split(/\s+/)
    return (
      <span className={''}>
        {separated.map(item => (<span className={`${classPrefix}-single-word`}>{item}</span>))}
      </span>
    )
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

  navWrapRef = null
  setNavWrapRef = ref => {
    this.navWrapRef = ref
  }

  getClickNavHandler = (item, index) => (evt) => {
    const target = {evt}
    const wrapWidth = this.navWrapRef.getBoundingClientRect().width
    const {
      width: currNavWidth,
      left: currNavLeft,
      right: currNavRight,
    } = evt.nativeEvent.target.getBoundingClientRect()
    console.log(1, wrapWidth)
    console.log(2, currNavWidth, currNavLeft, currNavRight)
    animateToTop(() => {
      this.setState({
        activeIndex: index,
      })
    })
  }

  compodidm

  render() {
    const {
      bannerTitleHidden,
      activeIndex,
    } = this.state
    const indicatorStyle = {
      left: this.state.currNavLeft,
      right: this.state.currNavRight,
    }
    const bannerStyle = {
      height: this.state.bannerHeight
    }
    return (
      <header className={`${classPrefix}-header`}>
        <div className={'header-content rhaego-responsive'}>
          <nav className={'nav'}>
            <a className={c('site-title', !bannerTitleHidden && 'transparent')} href="/">
              {this.formatToMaterialSpans(this.props.siteName)}
            </a>
            <ul className="nav-buttons" ref={this.setNavWrapRef}>
              {
                this.props.links.map((item, index) => (
                  <li
                    className={c('nav-button', index === activeIndex && 'active')}
                    onClick={this.getClickNavHandler(item, index)}
                  >
                    {item.name}
                  </li>
                ))
              }
              {/*<li className="nav-button active" onClick={() => {animateToTop()}}>发斯蒂芬</li>*/}
              {/*<li className="nav-button">阿里疯狂</li>*/}
              {/*<li className="nav-button">asdf</li>*/}
              <li className="nav-indicator" style={indicatorStyle} />
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