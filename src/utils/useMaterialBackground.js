/**
生成 material design 风格的背景样式
@author youknowznm
@param selector {String} 选择字符串
*/

import {
  red, pink, purple,
  deepPurple, indigo,
  cyan, teal, green,
  lightGreen, lime, orange,
  deepOrange, brown, grey,
} from 'material-ui/colors'

import './useMaterialBackground.css'

// 根据最小值和偏移量获取一个随机整数
const random = (min, topOffset = 0) => {
  return Math.floor(Math.random() * min + topOffset)
}

const useMaterialBackground = (selector) => {
  const elemArr = document.querySelectorAll(selector)

  const colorPalette = [
    [red[400], red[600]],
    [pink[400], pink[600]],
    [purple[400], purple[600]],
    [deepPurple[400], deepPurple[600]],
    [indigo[400], indigo[600]],
    // [blue[500], blue[700]],
    // [lightBlue[600], lightBlue[800]],
    [cyan[700], cyan[900]],
    [teal[500], teal[700]],
    [green[600], green[800]],
    [lightGreen[700], lightGreen[900]],
    [lime[700], lime[900]],
    [orange[700], orange[900]],
    [deepOrange[400], deepOrange[600]],
    [brown[400], brown[600]],
    [grey[600], grey[800]],
  ]

  // 打乱数组顺序
  colorPalette.sort(() => 0.5 - Math.random())

  let paletteLength = colorPalette.length

  Array.prototype.forEach.call(elemArr, (elem, index) => {
    let paletteIndex = index % paletteLength
    let wrapRotateAngle = random(2) * 180
    let wrapElem = document.createElement('div')
    wrapElem.setAttribute('class',  'mb-bg-wrap')
    wrapElem.setAttribute('style', `transform: rotate(${wrapRotateAngle}deg);
                                    background-color: ${colorPalette[paletteIndex][0]};`)

    let blocksCount = random(2, 1)
    // let blocksCount = 1
    for (let i = 0; i < blocksCount; i++) {
      let shadowStrength = (Math.random() < .5) ? 'light' : 'strong'
      let height = random(80, 120)
      let rotateAngle = random(180)
      let topOffset = random(50, 100)
      let blockElem = document.createElement('div')
      blockElem.setAttribute('class', `mb-bg-block mb-shadow-${shadowStrength}`)
      blockElem.setAttribute('style', `height: ${height}px;
                                       transform: rotate(${rotateAngle}deg);
                                       left: -${topOffset}px;
                                       background-color: ${colorPalette[paletteIndex][1]};`)
      wrapElem.appendChild(blockElem)
    }
    // elem.insertBefore(wrapElem, elem.querySelector('div'))
    elem.append(wrapElem)
  })

}

export default useMaterialBackground
