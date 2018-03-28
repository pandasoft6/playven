import axios from 'axios'
import { browserHistory } from 'react-router'
import apiEndpoints from '../../config/apis'
import { onCountrySelect } from '../actions/country-selection-actions'
import { clearSelectedCourts } from '../actions/booking-actions'

export const changeCountry = country => (dispatch, getState) => {
  const store = getState()
  const { user } = store.auth
  const { pathname } = store.location

  dispatch(onCountrySelect(country))
  dispatch(clearSelectedCourts())
  localStorage.setItem('country', country)

  if (user) {
    axios.patch(`${apiEndpoints.playven}/user/countries/${country}`)
  }

  if (pathname === '/search' || pathname.includes('/venues/')) {
    browserHistory.push('/')
  }
}
