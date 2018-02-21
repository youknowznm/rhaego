const debounce = function(fn, delay = 1000) {
  let timerId = null
  return function() {
    clearTimeout(timerId)
    const that = this
    const args = Array.prototype.slice.call(arguments, 0)
    timerId = setTimeout(function() {
      fn.apply(that, args)
    }, delay)
  }
}

export default debounce
