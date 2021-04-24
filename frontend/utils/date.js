// 转换日期对象为可读的字符串
export const formatDateToPast = (date) => {
  const sec = Math.floor((new Date().valueOf() - date.valueOf()) / 1000)
  if (sec < 10) {
    return ('刚刚')
  }
  if (sec < 60) {
    return (`${sec} 秒前`)
  }
  if (sec < 60 * 60) {
    const _min = Math.floor(sec / 60)
    return (`${_min} 分钟前`)
  }
  if (sec < 60 * 60 * 24) {
    const _hou = Math.floor(sec / (60 * 60))
    const restSeconds = Math.floor(sec % (60 * 60))
    const _min = Math.floor(restSeconds / 60)
    return (`${_hou} 小时 ${_min} 分钟前`)
  }
  if (sec < 60 * 60 * 24 * 30) {
    const _day = Math.floor(sec / (60 * 60 * 24))
    return (`${_day} 天前`)
  }
  const _mon = Math.floor(sec / (60 * 60 * 24 * 30))
  return (`${_mon} 月前`)
}

// 格式化日期: YYYY-MM-DD HH:MM:SS
export const formatDateToString = (date, toSeconds) => {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }
  const addZero = (str) => {
    return str.toString().length === 1 ? `0${str}` : str
  }
  const y = addZero(date.getFullYear())
  const m = addZero(date.getMonth() + 1)
  const d = addZero(date.getDate())
  let res = `${y}-${m}-${d}`
  if (toSeconds === true) {
    const ho = addZero(date.getHours())
    const mi = addZero(date.getMinutes())
    const se = addZero(date.getSeconds())
    res += ` ${ho}:${mi}:${se}`
  }
  return res
}