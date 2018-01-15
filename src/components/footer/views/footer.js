import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'

const styles = (theme) => ({
  root: {
    width: '100%',
    background: '#fafafa',
    height: 72,
    lineHeight: 72,

  },

})

const Footer = ({classes}) => (
  <ul className="root">
    <li>fuck</li>
  </ul>
)

export withStyles(styles)(Footer)
