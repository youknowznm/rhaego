const getOffsetToPage = (elem) => {
  let top = elem.offsetTop;
  let left = elem.offsetLeft;
  let posParent = elem.offsetParent;
  while (posParent !== null) {
      top += posParent.offsetTop;
      left += posParent.offsetLeft;
      posParent = posParent.offsetParent;
  }
  return {top, left};
}

export default getOffsetToPage
