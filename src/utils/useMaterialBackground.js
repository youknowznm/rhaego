/**
生成 material design 风格的背景样式
http://thezinx.com/wallpapers/25-material-design-wallpapers/
@param selector {String} 选择字符串
*/

import './useMaterialBackground.css'

const useMaterialBackground = (selector) => {

  const elemArr = document.querySelectorAll(selector)

  // 使用从 material design 的调色板内选取的颜色对数组
  // https://material.io/guidelines/style/color.html#color-color-palette
  const colorPalette = [
    ['#F44336', '#D32F2F'], // red
    ['#E91E63', '#C2185B'], // pink
    ['#673AB7', '#512DA8'], // purple
    ['#3F51B5', '#303F9F'], // indigo

    // ['#2196F3', '#1976D2'], // blue
    ['#0097A7', '#006064'], // cyan
    ['#009688', '#00796B'], // teal
    ['#43A047', '#2E7D32'], // green

    ['#AFB42B', '#827717'], // lime
    ['#FF5722', '#E64A19'], // orange
    ['#795548', '#5D4037'], // brown
    ['#757575', '#424242'], // gray

    ['#607D8B', '#455A64'], // blue gray
  ]

  // 打乱数组顺序
  colorPalette.sort(() => 0.5 - Math.random())

  let paletteLength = colorPalette.length

  // 获取一个随机的索引偏移量
  let randomOffset = Math.floor(Math.random() * 5)

  let $targetBackgroundContainers = this

  Array.prototype.forEach.call(elemArr, (elem, index) => {
    let paletteIndex = index
    let wrapRotateAngle = Math.floor(Math.random() * 2) * 180
    let wrapElem = document.createElement('div')
    wrapElem.setAttribute('class',  'mb-bg-wrap')
    wrapElem.setAttribute('style', `transform: rotate(${wrapRotateAngle}deg);
                                    background-color: ${colorPalette[paletteIndex][0]};`)

    // let blocksCount = Math.floor(Math.random() * 2 + 1)
    let blocksCount = 1
    for (let i = 0; i < blocksCount; i++) {
      let shadowStrength = (Math.random() < .5) ? 'light' : 'strong'
      let height = Math.floor(Math.random() * 80 + 120)
      let rotateAngle = Math.floor(Math.random() * 180 + 1)
      let topOffset = Math.floor(Math.random() * 50 + 100)
      let blockElem = document.createElement('div')
      blockElem.setAttribute('class', `mb-bg-block mb-shadow-${shadowStrength}`)
      blockElem.setAttribute('style', `height: ${height}px;
                                       transform: rotate(${rotateAngle}deg);
                                       left: -${topOffset}px;
                                       background-color: ${colorPalette[paletteIndex][1]};`)
      wrapElem.appendChild(blockElem)
    }
    // elem.insertBefore(wrapElem, elem.querySelector('div'));
    elem.append(wrapElem);
  })

}

export default useMaterialBackground
