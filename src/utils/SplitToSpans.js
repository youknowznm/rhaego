import React from 'react'
import PropTypes from 'prop-types'
import {siteName} from '../config'

import './splitToSpans.css'

const SplitToSpans = ({className, children}) => {
  let arr = children.trim().split(/\s+/)
  return (
    <span className={className}>
      {
        arr.map((item, index) => {
          return <span key={index} className="splited-span">{item}</span>
        })
      }
    </span>
  );
}

SplitToSpans.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
}

SplitToSpans.defaultProps = {
  children: siteName,
}

export default SplitToSpans
