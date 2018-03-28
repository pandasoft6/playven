import { combineReducers } from 'redux'
import { i18nReducer as i18n } from 'react-redux-i18n'
import location from './location'
import venues from './reducers/venue-reducer'
import auth from './reducers/auth-reducer'
import booking from './reducers/booking-reducer'
import languageSelection from './reducers/language-selection'
import countrySelection from './reducers/country-selection'
import searchgrid from './reducers/search-grid-reducer'
import allCourts from './reducers/courts-reducer'
import menu from './reducers/menu'
import cities from './reducers/cities-reducer'
import { reducer as modal } from 'redux-modal'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as form } from 'redux-form'

export const makeRootReducer = asyncReducers => combineReducers({
  location,
  venues,
  auth,
  i18n,
  routing,
  booking,
  form,
  searchgrid,
  languageSelection,
  modal,
  menu,
  allCourts,
  cities,
  countrySelection,
  ...asyncReducers
})

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
