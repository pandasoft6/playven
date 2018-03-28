import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import { loadTranslations, syncTranslationWithStore } from 'react-redux-i18n'
import { changeLocale } from '../api/profile-api'
import { onCountrySelect } from '../actions/country-selection-actions'
import Text from './Text'
import axios from 'axios'

const fi = require('../static/locales/fi.yaml')
const en = require('../static/locales/en.yaml')
// const locales = require('../static/locales/locales.yaml')

class AppContainer extends Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    const { routes, store } = this.props


    // Detect IE11
    let ieWarning

    if (Boolean(window.MSInputMethodContext) && Boolean(document.documentMode)) {
      ieWarning = <div style={{ background: 'grey' }}>
        <h2
          className="color-dark-grey text-uc em-high mbt"
          style={{ margin: 'auto', width: '80%', textAlign: 'center' }}>
          <Text text="messages.errors.ie_11" />
        </h2>
      </div>
    }

    const countryFromStorage = localStorage.getItem('country')

    // eslint-disable-next-line
    if (countryFromStorage !== null) {
      store.dispatch(onCountrySelect(countryFromStorage))
    } else {
      axios.get('https://ipinfo.io')
      .then(response => {
        if (response.data.country === 'US') {
          store.dispatch(onCountrySelect(2))
        }
      })
    }

    /*
     i18n configuration
     */

    syncTranslationWithStore(store)
    store.dispatch(loadTranslations({ fi, en }))
    // store.dispatch(loadTranslations(locales));
    const localeFromStorage = localStorage.getItem('locale')
    const localeFromBrowser = navigator.language || navigator.userLanguage
    let locale = 'fi'

    if (['en', 'fi'].indexOf(localeFromStorage) > -1) {
      locale = localeFromStorage
    } else if (localeFromBrowser.indexOf('en') !== -1) {
      locale = 'en'
    }


    store.dispatch(changeLocale(locale))
    window.Intercom('boot', {
      // eslint-disable-next-line
      app_id: 'axbre2kh'
    })

    return (
      <Provider store={store}>
        <div className="flex-col flex">
          {ieWarning}
          <Router
            children={routes}
            history={browserHistory}
            onUpdate={() => window.scrollTo(0, 0)} />

        </div>
      </Provider>
    )
  }
}


AppContainer.propTypes = {
  routes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}

export default AppContainer
