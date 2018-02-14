const debounce = function(fn, delay = 1000) {
  let timerId = null
  return function() {
    const that = this
    const args = Array.prototype.slice.call(arguments, 0)
    clearTimeout(timerId)
    timerId = setTimeout(function() {
      fn.apply(that, args)
    }, delay)
  }
}


export default debounce
