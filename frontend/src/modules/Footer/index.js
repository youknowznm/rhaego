import React from 'react';
import c from 'classnames'

import siteData from '~/config'

import style from './footer.scss'

export default class Footer extends React.Component {

  renderMain = () => {
  }

  render() {

    const heartSvg = <svg className="heart" width="14px" height="14px" viewBox="0 0 24 24">
      <path
        fill="#ff5252"
        d="M12 21.35l-1.45-1.32c-5.15-4.67-8.55-7.75-8.55-11.53 0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.09 1.09-1.28 2.76-2.09 4.5-2.09 3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54l-1.45 1.31z" />
    </svg>

    return (
      <div className={'rhaego-footer'} style={style}>
        <div className={'social-wrap'}>
          <div className="social rhaego-responsive">
            <ul className="links">
              <li className="link wechat">
                <div className="hover-content" />
              </li>
              <li className="link email">
                <a className={'anchor'} href={`mailto:${siteData.email}`} />
              </li>
              <li className="link zhihu">
                <a className={'anchor'} href={siteData.zhihu} target="blank" />
              </li>
              <li className="link github">
                <a className={'anchor'} href={siteData.github} target="blank" />
              </li>
            </ul>
          </div>
        </div>
        <div className={'info-wrap'}>
          <div className="info rhaego-responsive">
            <p className={'site'}>
              <span>Presented by </span>
              <span>
                <a className={'link'} target={'_blank'} href={siteData.repoSource}>Rhaego</a>
              </span>
            </p>
              <p className={'site'}>
              <span>. </span>
              <span>Made with</span>
              {heartSvg}
              <span>by znm.</span>
            </p>
          </div>
        </div>
      </div>
    )
  }
}