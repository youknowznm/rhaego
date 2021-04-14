import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import {compConfig} from '../../config'
import {
  decorateStyle,
  debounce,
  getStyleInt,
  animateToTop,
  formatToMaterialSpans,
  formatDate,
} from '../../utils'
const {classPrefix} = compConfig

import style from './card.scss'

// import {Card, Button, Avatar} from '@material-ui/core';
// import {CardHeader, CardContent, CardActions} from '@material-ui/core/Card';
// import IconButton from '@material-ui/core/IconButton'
// import { Typography } from '@material-ui/core';
// import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';


// @decorateStyle(style)
export default class RhaegoCard extends React.Component {

  static propTypes = {
    // asyncStatus: PropTypes.string.isRequired,
    // asyncResultMessage: PropTypes.string.isRequired,
  }

  static defaultProps = {
  }

  state = {

  }

  componentDidMount() {
  }

  render() {
    // const {
    // } = this.state

    const _id = '_id'
    const title = 'title'
    const summary = 'summary'
    const tags = ['tags', 'sadf']
    const createdDate = '2020-20-20'
    const commentCount = 3
    const likedCount = 123
    const link = `/article?id=${_id}`

    var s = 'No Such Thing as Offline';
    var sb = '这些调色板最初由 Material Design 于 2014 年创建，由一些旨在和谐搭配的颜色组成，您可以用它们来开发品牌调色板。要生成您专属的颜色协调的调色板，请使用调色板生成工具。'
    return (
      <div {...this.props} className={`${classPrefix}-card`} style={style} >
        <h1 className={'title'}>{formatToMaterialSpans(s)}</h1>
        <p className={'summary'}>{sb}</p>
      </div>
    )
  }
}