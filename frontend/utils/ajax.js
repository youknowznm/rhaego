import {setSearchParams} from './index'
import {toast} from "~/components/Toast";

// get 和 post
// 默认请求和响应均为 json
// 只认为 200 为成功
export function ajax(
  method,
  url,
  data = {},
  isJson = true
) {
  return new Promise(function(resolve, reject) {
    const isGetMethod = method === 'GET'
    const xhr = new XMLHttpRequest()
    url = `${window.API_CONTEXT || ''}${url}`
    if (isGetMethod) {
      url = setSearchParams(url, data)
    }
    xhr.open(method, url)
    if (isJson) {
      xhr.setRequestHeader('Content-Type', 'application/json')
    }
    // for (let key in headers) {
    //   xhr.setRequestHeader(key, headers[key])
    // }
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
          let errObj = {
            message: '出错了'
          }
          try {
            errObj = JSON.parse(xhr.response)
          } catch (e) {
            toast(errObj.message, 4000)
            reject(errObj)
          }
          toast(errObj.message, 4000)
          reject(errObj)
        }
      }
    }
    xhr.onerror = err => {
      reject(err)
    }
    xhr.send(isJson ? JSON.stringify(data) : data)
  })
}

export function get(url, data) {
  return ajax('GET', url, data)
}

export function post(url, data) {
  return ajax('POST', url, data)
}

export function postForm(url, data) {
  return ajax('POST', url, data, false)
}