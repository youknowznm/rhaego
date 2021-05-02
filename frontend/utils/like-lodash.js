export const debounce = function(fn, time = 200)  {
  let timer = null
  return function(...args) {
    const that = this
    clearTimeout(timer)
    timer = setTimeout(function() {
      fn.call(that, ...args)
    }, time)
  }
}

const deepCopy = target => {
  const res = Array.isArray(target) ? [] : {}
  let currValue
  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      currValue = target[key]
      res[key] = typeof currValue === 'object'
        ? deepCopy(currValue)
        : currValue
    }
  }
  return res
}

export const pick = (target, keys) => {
  const copied = deepCopy(target)
  const res = {}
  keys.reduce((result, currKey) => {
    if (copied[currKey]) {
      res[currKey] = copied[currKey]
    }
    return res
  }, {})
  return res
}

export const omit = (target, keys) => {
  const copied = deepCopy(target)
  for (let i = 0; i < keys.length; i++) {
    delete copied[keys[i]]
  }
  return copied
}