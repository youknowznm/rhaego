import React from 'react'
import {Grow} from 'material-ui/transitions'
import PropTypes from 'prop-types'

const TransitionWrap = ({children}) => (
  <Grow in={true} style={{ transformOrigin: '50% 0 0' }}>
    {children}
  </Grow>
)

TransitionWrap.propTypes = {
  children: PropTypes.element.isRequired,
}

export default TransitionWrap
