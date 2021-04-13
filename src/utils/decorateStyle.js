import React from 'react'

export default (styleInstance = {}) => componentClass => class SUH extends componentClass {

  // static displayName=

  componentWillMount(...args) {
    styleInstance.use && styleInstance.use();
    if (super.componentWillMount) {
      super.componentWillMount.apply(this, args)
    }
  }

  componentWillUnmount(...args) {
    if (!module.hot || !window.IS_DEV) {
      styleInstance.unuse && styleInstance.unuse();
    }
    if (super.componentWillUnmount) {
      super.componentWillUnmount.apply(this, args)
    }
  }
}