// 转换日期对象为可读的字符串
const toReadableDateString = (dateObj) => {
  const _sec = Math.floor((new Date().valueOf() - dateObj.valueOf()) / 1000)
  if (_sec < 10) {
    return ('刚刚')
  }
  if (_sec < 60) {
    return (`${_sec} 秒前`)
  }
  if (_sec < 60 * 60) {
    const _min = Math.floor(_sec / 60)
    return (`${_min} 分钟前`)
  }
  if (_sec < 60 * 60 * 24) {
    const _hou = Math.floor(_sec / (60 * 60))
    const restSeconds = Math.floor(_sec % (60 * 60))
    const _min = Math.floor(restSeconds / 60)
    return (`${_hou} 小时 ${_min} 分钟前`)
  }
  if (_sec < 60 * 60 * 24 * 30) {
    const _day = Math.floor(_sec / (60 * 60 * 24))
    return (`${_day} 天前`)
  }
  const _mon = Math.floor(_sec / (60 * 60 * 24 * 30))
  return (`${_mon} 月前`)
}

export default toReadableDateString
