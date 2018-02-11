const addZero = (str) => {
  str = str.toString()
  return str.length === 1 ? `0${str}` : str;
}

const formatDate = (dateObj, precise) => {
  if (!(dateObj instanceof Date)) {
    dateObj = new Date(dateObj)
  }
  let y = addZero(dateObj.getFullYear())
  if (Object.is(y, NaN)) {
    throw new Error('invalid date or date string')
  }
  let m = addZero(dateObj.getMonth() + 1)
  let d = addZero(dateObj.getDate())
  let res = `${y}-${m}-${d}`
  if (precise === true) {
    let ho = addZero(dateObj.getHours())
    let mi = addZero(dateObj.getMinutes())
    let se = addZero(dateObj.getSeconds())
    res += ` ${ho}:${mi}:${se}`
  }
  return res;
}

export default formatDate
