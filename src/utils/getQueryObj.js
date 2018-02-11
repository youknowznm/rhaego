const getQueryObj = () => {
  const queryObj = {}
  const decodedString = decodeURIComponent(window.location.search.substring(1))
  const searchArr = decodedString.split('&')
  searchArr.forEach((i) => {
    var pair = i.split('=')
    queryObj[pair[0]] = pair[1]
  })
  return queryObj
}

export default getQueryObj
