export const debounce = function(fn, time = 200)  {
  let timerId = null
  return function(args) {
    if (timerId) {
      timerId = setTimeout(fn, time)
    } else {
      clearTimeout(timerId)
      fn.apply(fn, ...args)
    }
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
  keys.reduce((result, currKey) => {
    if (copied[currKey]) {
      delete copied[currKey]
    }
    return copied
  }, copied)
  return copied
}