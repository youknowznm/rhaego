import React from 'react'
import PropTypes from 'prop-types'

import './SplitToSpans.css'

const SplitToSpans = ({words}) => {
  let arr = words.trim().split(/\s+/)
  return (
    <p>
      {
        arr.map((item, index) => {
          return <span key={index} className="splited-span">{item}</span>
        })
      }
    </p>
  );
}

SplitToSpans.propTypes = {
  words: PropTypes.string.isRequired
}

export default SplitToSpans
