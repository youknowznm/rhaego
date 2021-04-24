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

export function getPalette() {
  return [
    'red',
    'pink',
    'purple',
    'indigo',
    'blue',
    'cyan',
    'teal',
    'green',
    'lime',
    'yellow',
    'amber',
    'orange',
    'brown',
    'grey',
    'bluegrey',
  ].sort(() => Math.random() - .5);
}

export function getFontTheme(theme) {
  return [
    'cyan',
    'green',
    'lime',
    'yellow',
    'amber',
    'orange',
    'grey',
  ].includes(theme) ? 'dark' : 'light'
}