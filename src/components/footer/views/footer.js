import React from 'react'
import {Typography, Button} from 'material-ui'
import {SplitToSpans} from '../../../utils'
import {socialInfo} from '../../../config'

import './footer.css'

const Footer = ({classes}) => (
  <div>

    <div className="mb-footer _placeholder"></div>

    <div className="mb-footer _social">
      <div className="content">
        <ul className="social">
          <li className="social-link wechat" fill='red'>
            <img className="hover-content" src={socialInfo.wechatQr} alt="wechatQrCode" fill='red'/>
          </li>
          <li className="social-link email">
            <a href={`mailto:${socialInfo.email}`}>
              <span className="no-screen">email</span>
            </a>
            <div className="hover-content mono">Email me!</div>
          </li>
          <li className="social-link zhihu">
            <a href={socialInfo.zhihu} target="_blank">
              <span className="no-screen">email</span>
            </a>
          </li>
          <li className="social-link github">
            <a href={socialInfo.github} target="_blank">
              <span className="no-screen">email</span>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div className="mb-footer _about">
      <div className="content">
        <ul className="about">
          <li className="about-item project-name">
            <Typography type="title">
              <SplitToSpans className="mono"></SplitToSpans>
            </Typography>
          </li>
          <li className="about-item about-loginor">
            <Typography className="mono" type="caption">
              Made with&nbsp;
              <span className="heart-wrap">
                <svg className="heart" width="14px" height="14px" viewBox="0 0 24 24">
                  <path fill="#ff5252" d="M12 21.35l-1.45-1.32c-5.15-4.67-8.55-7.75-8.55-11.53 0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.09 1.09-1.28 2.76-2.09 4.5-2.09 3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54l-1.45 1.31z"></path>
                </svg>
              </span>
              &nbsp;by <a href={socialInfo.github} target="_blank" className="info-link">youknowznm</a>.
            </Typography>
          </li>
          <li className="about-item view-source">
            <Button target="_blank" href="https://github.com/youknowznm/material-blog">
              查看源码
            </Button>
          </li>
        </ul>
      </div>
    </div>

  </div>
)

export default Footer
