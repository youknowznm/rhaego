// 参数读写
const encode = encodeURIComponent
const decode = encodeURIComponent

export const getParams = paramString => {
  const paramArr = paramString.split('&')
  const result = {}
  for (let i = 0; i < paramArr.length; i++) {
    let [key, value] = paramArr[i].split('=')
    if (key !== '' && value !== undefined) {
      result[decode(key)] = decode(value)
    }
  }
  return result
}

export const getSearchParams = (str = location.search) => {
  return getParams(str.replace(/^\?/, ''))
}

export const setSearchParams = (url, params) => {
  const prevParams = getSearchParams()
  // 覆写已有的
  for (let key in params) {
    prevParams[key] = params[key]
  }
  let fullSearchString
  for (let key in params) {
    fullSearchString += `${encode(key)}=${encode(params[key])}`
  }
  let result
  if (/\?/.test(url)) {
    result = url.replace(/\?.*$/, fullSearchString)
  } else {
    result = url += `?${fullSearchString}`
  }
  return result
}
