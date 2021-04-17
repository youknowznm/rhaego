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

export function animateToTop(onDone) {
  const doc = document.documentElement
  function step() {
    const {scrollTop} = doc
    const id = window.requestAnimationFrame(step)
    if (scrollTop === 0) {
      cancelAnimationFrame(id)
      callIfCallable(onDone)
    } else {
      doc.scrollTop = scrollTop - Math.max(scrollTop / 5, 1)
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
            <span className={`rhaego-single-word`} key={index}>
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
