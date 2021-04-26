import React from 'react'
import marked from 'marked'
import hljs from "highlight.js"

export function callIfCallable(fn) {
  typeof fn === 'function' && fn()
}

export function noop() {}

export function formatToMaterialSpans(string) {
  const separated = string.split(/\s+/).filter(item => item !== '')
  return (
    <span className={''}>
        {separated.map((item, index) => {
          return (
            <span className={'rhaego-single-word'} key={index}>
              {item}
            </span>
          )
        })}
    </span>
  )
}

export function isValidString(target) {
  return typeof target === 'string' && target !== ''
}

export function getPalette() {
  return [
    'red',
    'pink',
    'purple',
    'indigo',
    'blue',
    'cyan',
    'teal',
    'green',
    'lime',
    'yellow',
    'amber',
    'orange',
    'brown',
    'grey',
    'bluegrey',
  ].sort(() => Math.random() - .5);
}

export function getFontTheme(theme) {
  return [
    'cyan',
    'green',
    'lime',
    'yellow',
    'amber',
    'orange',
    'grey',
  ].includes(theme) ? 'dark' : 'light'
}

// 解析#分隔的标签字符串为标签数组
export function getTagsFromText(tagsText) {
  return tagsText.split(/\s*#/).filter(item => item !== '')
}

const renderer = new marked.Renderer()
renderer.link = (href, title, text) => {
  return `<a target="_blank" href="${href}" title="${title}">${text}</a>`
}
marked.setOptions({
  renderer,
  breaks: true,
  highlight: code => {
    return hljs.highlightAuto(code).value
  }
})

export const parseMarkdown = raw => marked(raw)

export const RESUME_ID = 'RESUME'
