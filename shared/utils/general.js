import React from 'react'

export function callIfCallable(fn) {
  typeof fn === 'function' && fn()
}

export function noop() {}

export function formatToMaterialSpans(string) {
  const separated = string.split(/\s+/)
  return (
    <span className={''}>
        {separated.map((item, index) => {
          return (
            <span className={'rhaego-single-word'} key={index}>
              {item}
            </span>
          )
        })}
    </span>
  )
}

export function isValidString(target) {
  return typeof target === 'string' && target !== ''
}