import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import {compConfig} from '../../config'
import {decorateStyle} from '../../utils'
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
    links: [],
  }

  BANNER_HEIGHT = 192
  BANNER_TITLE_OPACITY = false

  state = {
    bannerHeight: this.BANNER_HEIGHT,
    bannerTitleHidden: this.BANNER_TITLE_OPACITY,
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
      console.log(this.state.bannerHeight)
    })
  }

  render() {
    const siteNameWords = 'rhaego blog'.split(/\s/)
    return (
      <header className={`${classPrefix}-header`}>
        <div className={'header-content rhaego-responsive-wrap'}>
          <nav className={'nav'}>
            <a className={c('site-title', !this.state.bannerTitleHidden && 'transparent')} href="/">
              {this.formatToMaterialSpans(this.props.siteName)}
            </a>
            <ul className="nav-buttons">
              <li className="nav-button active">发斯蒂芬</li>
              <li className="nav-button">阿里疯狂</li>
              <li className="nav-button">asdf</li>
              <li className="nav-indicator" />
            </ul>
          </nav>
          <div
            className={c('banner')}
            style={{height: this.state.bannerHeight}}
          >
            <h1 className={c('title', this.state.bannerTitleHidden && 'transparent')}>
              {this.formatToMaterialSpans(this.props.siteName)}
            </h1>
          </div>
        </div>
      </header>
    )
  }
}