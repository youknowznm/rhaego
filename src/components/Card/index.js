import React from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import {compConfig} from '../../config'
import {
  decorateStyle,
  debounce,
  getStyleInt,
  animateToTop, formatDate
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

    return (
      <div {...this.props} className={`${classPrefix}-card`} style={style} >

      </div>
    )
  }
}