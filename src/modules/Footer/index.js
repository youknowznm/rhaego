import React from 'react';
import c from 'classnames'
import Header from "../Header";
import Card from "../../components/Card";

import {Typography,Button} from '@material-ui/core'

import {compConfig, socialInfo} from '../../config'
const {classPrefix} = compConfig

import style from './footer.scss'

export default class Footer extends React.Component {

  constructor() {
    super()
  }

  renderMain = () => {
    function mapColor(length) {

    }
    return (
      <div
        className={c(`${classPrefix}-main`, 'rhaego-responsive')}
        style={style}
      >
        {
          this.palette.map(c => {
            return <Card data-color={c}>{c}</Card>
          })
        }
      </div>
    )
  }

  render() {

    const siteInfo = {
      siteAuthorName: 'youknowznm',
      siteAuthorHomepage: 'https://github.com/youknowznm',
      siteSource: 'https://github.com/youknowznm/jqueryMaterial.js',
    }
    const socialInfo = {
      wechatQr: './_images/footer/wechat-qr.png',
      email: 'znm92@icloud.com',
      zhihu: 'https://www.zhihu.com/people/youkonwznm',
      github: 'https://github.com/youknowznm',
    }

    return (
      <div>

        <div className="rhaego-footer placeholder" style={style}></div>

        <div className="rhaego-footer social">
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
                <a href={socialInfo.zhihu} target="blank">
                  <span className="no-screen">email</span>
                </a>
              </li>
              <li className="social-link github">
                <a href={socialInfo.github} target="blank">
                  <span className="no-screen">email</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="rhaego-footer about">
          <div className="content">
            <ul className="about">
              <li className="about-item file-id">
                <Typography className="mono" type="body2">
                  <span className="split-dense">京 ICP 备 17065562 号</span>
                </Typography>
              </li>
              <li className="about-item about-author">
                <Typography className="mono" type="caption">
                  Made with&nbsp;
                  <span className="heart-wrap">
                <svg className="heart" width="14px" height="14px" viewBox="0 0 24 24">
                  <path fill="#ff5252" d="M12 21.35l-1.45-1.32c-5.15-4.67-8.55-7.75-8.55-11.53 0-3.08 2.42-5.5 5.5-5.5 1.74 0 3.41.81 4.5 2.09 1.09-1.28 2.76-2.09 4.5-2.09 3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54l-1.45 1.31z"></path>
                </svg>
              </span>
                  &nbsp;by <a href={socialInfo.github} target="blank" className="info-link">youknowznm</a>.
                </Typography>
              </li>
              <li className="about-item view-source">
                <Button color="primary" raised target="blank" href="https://github.com/youknowznm/material-blog">
                  查看站点源码
                </Button>
              </li>
            </ul>
          </div>
        </div>

      </div>
    )
  }

}