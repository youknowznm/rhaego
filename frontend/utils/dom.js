import {callIfCallable} from './index'
import {toast} from '~/components/Toast';

export function animateToScrollHeight(height = 0, onDone) {
  const doc = document.documentElement
  function step() {
    const {
      scrollTop,
      clientHeight,
      scrollHeight,
    } = doc
    const id = window.requestAnimationFrame(step)
    // 已经滚动至底端, 仍要滚动? 婷婷
    const reachedBottom = scrollTop + clientHeight === scrollHeight
    if (scrollTop === height) {
      cancelAnimationFrame(id)
      callIfCallable(onDone)
    } else if (scrollTop > height) {
      doc.scrollTop = scrollTop - Math.max((scrollTop - height) / 4, 1)
    } else {
      if (reachedBottom) {
        cancelAnimationFrame(id)
        callIfCallable(onDone)
      }
      doc.scrollTop = scrollTop + Math.max((height - scrollTop) / 4, 1)
    }
  }
  step()
}

export function hasClass(DOMNode, targetClassName) {
  return Array.from(DOMNode.classList).includes(targetClassName)
}

export function addClass(DOMNode, ...classNames) {
  DOMNode.classList.add(...classNames)
}

export function removeClass(DOMNode, ...classNames) {
  DOMNode.classList.remove(...classNames)
}

export function getStyle(target, key) {
  return document.defaultView.getComputedStyle(target)[key]
}

export function getStyleInt(target, key) {
  return parseInt(getStyle(target, key), 10)
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

export const getNodeOffsetTopToPage = node => {
  let res = 0
  let curr = node
  while (true) {
    if (curr.offsetParent !== null) {
      res += curr.offsetTop
      curr = curr.offsetParent
    } else {
      break
    }
  }
  return res
}

export const checkDevice = () => {
  let deviceType = 'pc'
  if (/Android|iPhone/i.test(navigator.userAgent)) {
    deviceType = 'mobile'
    setTimeout(() => {
      toast('建议使用桌面浏览器以获得更好体验。', 4000)
    }, 1000)
  }
  addClass(document.body, `device-${deviceType}`)
}