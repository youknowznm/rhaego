import React from 'react'
import {Fade} from 'material-ui/transitions'
import PropTypes from 'prop-types'

const TransitionWrap = ({children}) => (
  <Fade in={true}>
    {children}
  </Fade>
)

TransitionWrap.propTypes = {
  children: PropTypes.element.isRequired,
}

export default TransitionWrap
