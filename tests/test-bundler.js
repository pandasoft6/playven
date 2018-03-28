// ---------------------------------------
// Test Environment Setup
// ---------------------------------------
import jQuery from 'jquery'
import sinon from 'sinon'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import chaiAsPromised from 'chai-as-promised'
import chaiEnzyme from 'chai-enzyme'
import Promise from 'es6-promise'
import Map from 'es6-map'
import { shallow, render, mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import 'phantomjs-polyfill-includes'
import 'phantomjs-polyfill-find'

/* global __COVERAGE__ */


global.$ = jQuery
global.jQuery = jQuery
global.chai = chai
global.sinon = sinon
global.expect = chai.expect
global.should = chai.should()
global.Promise = Promise
global.Map = Map
global.StripeCheckout = {
  // eslint-disable-next-line
  configure: () => {}
}
global.shallow = shallow
global.render = render
global.mount = mount
global.configureStore = configureStore

chai.use(sinonChai)
chai.use(chaiAsPromised)
chai.use(chaiEnzyme())


// ---------------------------------------
// Require Tests
// ---------------------------------------
// for use with karma-webpack-with-fast-source-maps
const __karmaWebpackManifest__ = []; // eslint-disable-line
const inManifest = path => ~__karmaWebpackManifest__.indexOf(path) // eslint-disable-line

// require all `tests/**/*.spec.js`
const testsContext = require.context('./', true, /\.spec\.js$/)

// only run tests that have changed after the first pass.
const testsToRun = testsContext.keys().filter(inManifest)

;(testsToRun.length ? testsToRun : testsContext.keys()).forEach(testsContext)

// require all `src/**/*.js` except for `main.js` (for isparta coverage reporting)
if (__COVERAGE__) {
  const componentsContext = require.context('../src/', true, /^((?!main|reducers).)*\.js$/)

  componentsContext.keys().forEach(componentsContext)
}
