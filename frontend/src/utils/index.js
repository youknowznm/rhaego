import React from 'react'

// import SplitToSpans from './splitToSpans'
// import LoadingArea from './loadingArea'
// import AsyncButton from './asyncButton'
// import TransitionWrap from './transitionWrap'
//
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
//
// import regexps from './regexps'

// export {default as decorateStyle} from './decorateStyle'

export function callIfCallable(fn) {
  typeof fn === 'function' && fn()
}

export function animateToScrollHeight(height = 0, onDone) {
  const doc = document.documentElement
  function step() {
    const {scrollTop} = doc
    const id = window.requestAnimationFrame(step)
    const reachedBottom = scrollTop + doc.clientHeight === doc.scrollHeight
    if (scrollTop === height) {
      cancelAnimationFrame(id)
      callIfCallable(onDone)
    } else if (scrollTop > height) {
      doc.scrollTop = scrollTop - Math.max((scrollTop - height) / 5, 1)
    } else {
      if (reachedBottom) {
        cancelAnimationFrame(id)
        callIfCallable(onDone)
      }
      doc.scrollTop = scrollTop + Math.max((height - scrollTop) / 5, 1)
    }
  }
  step()
}

export function getStyle(target, key) {
  return document.defaultView.getComputedStyle(target)[key]
}

export function getStyleInt(target, key) {
  return parseInt(getStyle(target, key), 10)
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

export const debounce = function(fn, time = 400)  {
  var timerId = null
  return function(args) {
    if (timerId) {
      timerId = setTimeout(fn, time)
    } else {
      clearTimeout(timerId)
      // fn.apply(fn, ...args)
    }
  }
}

export const getScrollBarWidth = () => {
  const node = document.createElement('div')
  node.style.overflow = 'scroll'
  node.style.width = '100px'
  node.style.height = '100px'
  node.style.position = 'absolute'
  node.style.left = '-1000px'
  node.style.top = '-1000px'
  document.body.appendChild(node)
  const result = node.offsetWidth - node.clientWidth
  document.body.removeChild(node)
  return result
}

export function ajax(
  method,
  url,
  data = {},
  headers = {}
) {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    // xhr.setRequestHeader('Content-Type', 'application-json')
    for (let key in headers) {
      xhr.setRequestHeader(key, headers[key])
    }
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let res
          try {
            res = JSON.parse(xhr.response)
          } catch (e) {
            resolve(xhr.response)
          }
          resolve(res)
        } else {
          reject(xhr)
        }
      }
    }
    xhr.onerror = err => {
      console.log({err})
      reject(err)
    }
    xhr.send(data)
  })
}

export function get(url, data, headers) {
  return ajax('GET', url, data, headers)
}

export function post(url, data, headers) {
  return ajax('POST', url, data, headers)
}

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

// export {
//   SplitToSpans,
//   LoadingArea,
//   AsyncButton,
//   TransitionWrap,
//
//   formatDate,
//   toReadableDateString,
//   debounce,
//   getQueryObj,
//   highlightAllPre,
//   useMaterialBackground,
//   getOffsetToPage,
//   getFingerprint,
//   showAdminOnlyElements,
//   changeDocTitle,
//
//   regexps,
// }
