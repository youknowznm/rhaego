import {setSearchParams} from './index'

// get; 默认 json 类型的 post
export function ajax(
  method,
  url,
  data = {},
  headers = {}
) {
  return new Promise(function(resolve, reject) {
    const isGetMethod = method === 'GET'
    const xhr = new XMLHttpRequest()
    url = `${window.API_CONTEXT || ''}${url}`
    if (isGetMethod) {
      setSearchParams(url, data)
    }
    xhr.open(method, url)
    xhr.setRequestHeader('Content-Type', 'application/json')
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
    xhr.send(JSON.stringify(data))
  })
}

export function get(url, data, headers) {
  return ajax('GET', url, data, headers)
}

export function post(url, data, headers) {
  return ajax('POST', url, data, headers)
}
