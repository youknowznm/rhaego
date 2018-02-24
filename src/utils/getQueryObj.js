const getQueryObj = () => {
  const queryObj = {}
  const originSearch = window.location.search
  if (originSearch !== '') {
    const decodedQueryString = decodeURIComponent(originSearch.substring(1))
    const queryArr = decodedQueryString.split('&')
    queryArr.forEach((i) => {
      var pair = i.split('=')
      queryObj[pair[0]] = pair[1]
    })
  }
  return queryObj
}

export default getQueryObj
