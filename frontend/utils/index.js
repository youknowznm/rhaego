import React from 'react'

// import SplitToSpans from './splitToSpans'
// import LoadingArea from './loadingArea'
// import AsyncButton from './asyncButton'
// import TransitionWrap from './transitionWrap'
// import formatDate from './formatDate'
// import toReadableDateString from './toReadableDateString'
// import debounce from './debounce'
// import getQueryObj from './getQueryObj'
// import highlightAllPre from './highlightAllPre'
// import useMaterialBackground from './useMaterialBackground'
// import getOffsetToPage from './getOffsetToPage'
// import getFingerprint from './getFingerprint'
// import showAdminOnlyElements from './showAdminOnlyElements'
// import changeDocTitle from './changeDocTitle'
// import regexps from './regexps'
// export {default as decorateStyle} from './decorateStyle'

export * from './ajax'
export * from './url'
export * from './dom'

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

// export const debounce = function(fn, time = 400)  {
//   var timerId = null
//   return function(args) {
//     if (timerId) {
//       timerId = setTimeout(fn, time)
//     } else {
//       clearTimeout(timerId)
//       // fn.apply(fn, ...args)
//     }
//   }
// }

export {
  debounce,
  throttle,
  pick,
  omit,
} from 'lodash'

// 转换日期对象为可读的字符串
export const toReadableDateString = (dateObj) => {
  const _sec = Math.floor((new Date().valueOf() - dateObj.valueOf()) / 1000)
  if (_sec < 10) {
    return ('刚刚')
  }
  if (_sec < 60) {
    return (`${_sec} 秒前`)
  }
  if (_sec < 60 * 60) {
    const _min = Math.floor(_sec / 60)
    return (`${_min} 分钟前`)
  }
  if (_sec < 60 * 60 * 24) {
    const _hou = Math.floor(_sec / (60 * 60))
    const restSeconds = Math.floor(_sec % (60 * 60))
    const _min = Math.floor(restSeconds / 60)
    return (`${_hou} 小时 ${_min} 分钟前`)
  }
  if (_sec < 60 * 60 * 24 * 30) {
    const _day = Math.floor(_sec / (60 * 60 * 24))
    return (`${_day} 天前`)
  }
  const _mon = Math.floor(_sec / (60 * 60 * 24 * 30))
  return (`${_mon} 月前`)
}

export const isValidString = target => {
  return typeof target === 'string' && target !== ''
}