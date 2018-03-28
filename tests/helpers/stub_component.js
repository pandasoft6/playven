import React from 'react'
import sinon from 'sinon'

const lifecycleMethods = [
  'componentWillMount',
  'componentDidMount',
  'componentWillReceiveProps',
  'shouldComponentUpdate',
  'componentWillUpdate',
  'componentDidUpdate',
  'componentWillUnmount'
]

const stubComponent = componentClass => {
  beforeEach(() => {
    sinon.stub(componentClass.prototype, 'render').returns(
      <div className={componentClass.constructor.name} />
    )

    lifecycleMethods.forEach(method => {
      if (typeof componentClass.prototype[method] !== 'undefined') {
        sinon.stub(componentClass.prototype, method).returns(null)
      }
    })
  })

  afterEach(() => {
    componentClass.prototype.render.restore()

    lifecycleMethods.forEach(method => {
      if (typeof componentClass.prototype[method] !== 'undefined') {
        componentClass.prototype[method].restore()
      }
    })
  })
}

export { stubComponent }
