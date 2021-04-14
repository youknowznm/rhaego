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

export {default as decorateStyle} from './decorateStyle'

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


export function formatToMaterialSpans(string) {
  const separated = string.split(/\s+/)
  return (
    <span className={''}>
        {separated.map(item => (<span className={`rhaego-single-word`}>{item}</span>))}
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
