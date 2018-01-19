import React from 'react'
import PropTypes from 'prop-types'
import {siteName} from '../config'

import './splitToSpans.scss'

const SplitToSpans = ({words, className}) => {
  let arr = words.trim().split(/\s+/)
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
  words: PropTypes.string.isRequired,
  className: PropTypes.string,
}

SplitToSpans.defaultProps = {
  words: siteName,
}

export default SplitToSpans
