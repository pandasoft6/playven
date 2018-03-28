/* eslint-disable */
import Promise from 'es6-promise'
import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'
import setAuthorizationToken from './api/utils/set-authorization-token'
import setupRequestSignature from './api/utils/setup-request-signature'
import { renewAuthToken } from './api/auth-api'
import jwt from 'jsonwebtoken'
import Rollbar from './utils/rollbar.umd.nojson.min.js'
import Map from 'es6-map'
import Text from './containers/Text'
import toastr from 'toastr'

// Safari, in Private Browsing Mode, looks like it supports localStorage but all calls to setItem
// throw QuotaExceededError. We're going to detect this and just silently drop any calls to setItem
// to avoid the entire page breaking, without having to do a check at each usage of Storage.
let hasLocalStorage = true
if (typeof localStorage === 'object') {
  try {
    localStorage.setItem('localStorage', 1);
    localStorage.removeItem('localStorage');
  } catch (e) {
    hasLocalStorage = false
    Storage.prototype._setItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function() {};
  }
}

// for IE9 and IE10
global.Map = Map

const rollbarConfig = {
  accessToken: "cdd69408ec3e45e7a6da10dca90470dc",
  ignoredMessages: ["TypeError: undefined is not an object (evaluating '__gCrWeb.autofill.extractForms')"],
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: __DEV__ ? 'development' : 'production',
  }
}

Rollbar.init(rollbarConfig)


global.Promise = Promise
global.Rollbar = Rollbar
// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)

// ========================================================
// API Setup
// ========================================================
const authToken = localStorage.authToken
if (authToken) {
  setAuthorizationToken(authToken)
  // every login we need to renew token for 30 more days
  // or log out, if token is expired
  // This API action will login user if token is valid
  store.dispatch(renewAuthToken(authToken))
}

setupRequestSignature()

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <AppContainer store={store} routes={routes} />,
    MOUNT_NODE
  )
}

// ========================================================
// Developer Tools Setup
// ========================================================
if (__DEV__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = error => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

// ========================================================
// Go!
// ========================================================
render()

if (!hasLocalStorage) {
  toastr.warning(Text.t('messages.errors.safari_private', '', {"positionClass": "toast-top-full-width","timeOut": "10000"}))
}
