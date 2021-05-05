import React from 'react'
import c from 'classnames'
import {SvgHeart} from '~/assets/svg'
import siteData from '~config'
import {addCommaToInt, get, getTagsFromText, noop} from '~utils'
import api from '~api'
import style from './footer.scss'

const REPO_SOURCE = 'https://github.com/youknowznm/rhaego'

export default class Footer extends React.Component {

  state = {
    visitCount: ''
  }

  componentDidMount() {
    get(api.VISIT_COUNT)
      .then(res => {
        this.setState({
          visitCount: res.visitCount
        })
      })
      .catch(noop)
  }

  render() {
    return (
      <div className={'rhaego-footer'}>
        <div className={'social-wrap'}>
          <div className='social rhaego-responsive'>
            <ul className='links'>
              <li className='link wechat'>
                <div className='hover-content' />
              </li>
              <li className='link email'>
                <a 
                  href={`mailto:${siteData.email}`} />
              </li>
              <li className='link zhihu'>
                <a 
                  href={siteData.zhihu}
                  target='blank'
                />
              </li>
              <li className='link github'>
                <a 
                  href={siteData.github}
                  target='blank'
                />
              </li>
            </ul>
          </div>
        </div>
        <div className={'info-wrap'}>
          <div className='info rhaego-responsive'>
            <p className={'left'}>
              <span>Presented by</span>
              <span>
                <a
                  className={'link'}
                  target={'_blank'}
                  href={REPO_SOURCE}
                >
                  Rhaego
                </a>
              </span>
              <span>.</span>
            </p>
            <p className={'center'}>
              <span>Made with</span>
              <SvgHeart
                className={'heart'}
                width={12}
                height={12}
                fill={'#ff5252'}
              />
              <span>by</span>
              <span>
                <a
                  className={'link'}
                  target={'_blank'}
                  href={'https://github.com/youknowznm'}
                >
                  znm
                </a>
              <span>.</span>
              </span>
            </p>
            <p className={'right'}>
              <span>访问次数: </span>
              <span className={'visit-count'}>
                {addCommaToInt(this.state.visitCount)}
              </span>
            </p>
          </div>
        </div>
      </div>
    )
  }
}