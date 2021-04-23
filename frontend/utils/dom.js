import {callIfCallable} from "./index";

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