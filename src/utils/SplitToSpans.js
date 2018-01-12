import React from 'react'
import PropTypes from 'prop-types'
import {siteName} from '../config'

import './SplitToSpans.css'

const SplitToSpans = ({words}) => {
  let arr = words.trim().split(/\s+/)
  return (
    <span>
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
}

SplitToSpans.defaultProps = {
  words: siteName,
}

export default SplitToSpans
