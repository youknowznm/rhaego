export function ajax(
  method,
  url,
  data = {},
  headers = {}
) {
  return new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest()
    xhr.open(method, `${window.API_CONTEXT || ''}${url}`)
    // xhr.withCredentials = true
    xhr.setRequestHeader('Content-Type', 'application-json')
    // xhr.setRequestHeader('Content-Type', 'text/plain')
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
