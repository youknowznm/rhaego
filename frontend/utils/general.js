import React from 'react'
import marked from 'marked'
import hljs from 'highlight.js/lib/core'
import {markdownCodeLanguages} from '~config'

export function callIfCallable(fn, ...params) {
  return typeof fn === 'function' && fn(...params)
}

export function noop() {}

export function formatToMaterialSpans(string) {
  const separated = string.split(/\s+/).filter(item => item !== '')
  return (
    <>
        {separated.map((item, index) => {
          return (
            <span className={'rhaego-single-word'} key={index}>
              {item}
            </span>
          )
        })}
    </>
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
  ].sort(() => Math.random() - .5)
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

export function mockTimeout(func, timeout = 2000) {
  setTimeout(function() {
    callIfCallable(func)
  }, timeout)
}

// 解析#分隔的标签字符串为标签数组
export function getTagsFromText(tagsText) {
  return tagsText.split(/\s*#/).filter(item => item !== '')
}

class MarkdownParser {

  constructor() {
    this.marked = marked
    const renderer = new marked.Renderer()
    renderer.link = (href, title, text) => {
      return `<a target='_blank' href='${href}' title='${title}'>${text}</a>`
    }
    markdownCodeLanguages.forEach((langName) => {
      const langModule = require(`highlight.js/lib/languages/${langName}`);
      hljs.registerLanguage(langName, langModule);
    })
    marked.setOptions({
      renderer,
      breaks: true,
      highlight: code => {
        return hljs.highlightAuto(code).value
      }
    })
  }

  parse = rawMarkdown => this.marked(rawMarkdown)

}

export const markdownParser = new MarkdownParser()

export const RESUME_ID = 'RESUME'

export const LOGIN_STATUS = 'rhaego-logged-in'

// 12345 => 12,345
export const addCommaToInt = string => {
  string = '' + string
  let result = ''
  let counter = 0
  for (let i = string.length - 1; i >= 0; i--) {
    counter++
    result = string.charAt(i) + result
    if (!(counter % 3) && i !== 0) {
      result = `,${result}`
    }
  }
  return result
}