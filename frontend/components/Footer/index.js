import React from 'react';
import c from 'classnames'
import {SvgHeart} from '~/assets/svg'

import siteData from '~config'

import style from './footer.scss'

export default class RhaegoFooter extends React.Component {
  render() {
    return (
      <div className={'rhaego-footer'}>
        <div className={'social-wrap'}>
          <div className="social rhaego-responsive">
            <ul className="links">
              <li className="link wechat">
                <div className="hover-content" />
              </li>
              <li className="link email">
                <a className={'anchor'} href={siteData.email} />
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
              <span>Presented by</span>
              <span>
                <a className={'link'} target={'_blank'} href={siteData.repoSource}>
                  Rhaego
                </a>
              </span>
              <span>. Made with</span>
              <SvgHeart className={'heart'} width={14} height={14} fill={'#ff5252'} />
              <span>by znm.</span>
            </p>
          </div>
        </div>
      </div>
    )
  }
}