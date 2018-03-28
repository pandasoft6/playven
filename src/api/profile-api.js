import axios from 'axios'
import toastr from 'toastr'
import { toggleResetPassword, onLoginSuccess } from '../actions/auth-actions'
import Text from '../containers/Text'
import { change } from 'redux-form'
import { browserHistory } from 'react-router'
import jwt from 'jsonwebtoken'
import setAuthorizationToken from './utils/set-authorization-token'
import apiEndpoints from '../../config/apis'
import {
  getUserReservationsSuccess,
  getUserReservationsRequest
} from '../routes/Profile/modules/profile.js'
import { toggleMenu } from '../actions/language-selection-actions'
import { setLocale, I18n } from 'react-redux-i18n'
import { setLocaleHeader } from './utils/set-locale-header'
import errorsToFullMessage from './utils/errors-to-full-message'
import moment from 'moment'
import 'moment/locale/fi'

export const getUserReservations = data => dispatch => {
  const url = `${apiEndpoints.playven}/reservations.json`

  dispatch(getUserReservationsRequest(data))
  return axios.get(url)
    .then(res => {
      dispatch(getUserReservationsSuccess(res.data))
    })
    .catch(error => toastr.error(error))
}

export const changeLocale = (locale, shouldToggleMenu) => dispatch => {
  setLocaleHeader(locale)
  dispatch(setLocale(locale))
  moment.locale(locale)
  localStorage.setItem('locale', locale)
  if (shouldToggleMenu) {
    dispatch(toggleMenu())
  }
}

export const resetPassword = credentials => (dispatch, getState) => {
  if (credentials.password !== credentials.password_confirm) {
    dispatch(change('resetpassword', 'password', ''))
    dispatch(change('resetpassword', 'password_confirm', ''))
    toastr.error(Text.t('messages.errors.password_mismatch'))
    return false
  }

  const store = getState()
  const token = store.location.query.reset_password_token

  if (!token) {
    toastr.error(Text.t('messages.errors.no_token'))
    return false
  }

  const requestBody = {
    /*eslint-disable */
    user: {
      password: credentials.password,
      password_confirmation: credentials.password_confirm,
      reset_password_token: token
    }
    /*eslint-enable */
  }

  dispatch(toggleResetPassword())
  return axios({
    method: 'PUT',
    url: `${apiEndpoints.playven}/password`,
    data: requestBody
  }).then(res => {
    dispatch(toggleResetPassword())
    const authToken = res.data.auth_token

    setAuthorizationToken(authToken)
    dispatch(onLoginSuccess(jwt.decode(authToken)))
    toastr.success(I18n.t('messages.reset_password.success'))
    browserHistory.push('/')
  }).catch(error => {
    dispatch(toggleResetPassword())
    toastr.error(errorsToFullMessage(error.response.data.errors))
  })
}
