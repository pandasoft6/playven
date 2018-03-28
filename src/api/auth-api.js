import axios from 'axios'
import { hide, show } from 'redux-modal'
import apiEndpoints from '../../config/apis'
import setAuthorizationToken from './utils/set-authorization-token'
import jwt from 'jsonwebtoken'
import toastr from 'toastr'
import { change } from 'redux-form'
import { browserHistory } from 'react-router'
import Text from '../containers/Text'
import openPopup from './utils/popup'
import _ from 'lodash'
import errorsToFullMessage from './utils/errors-to-full-message'
import { I18n } from 'react-redux-i18n'

import {
  onLoginSuccess,
  onLoginFail,
  onRegisterFail,
  onRegisterSuccess,
  onResendconfirmationRequest,
  onResendConfirmationSuccess,
  onResendConfirmationFail,
  onLogout,
  onConfirmAccountRequest,
  onConfirmAccountSuccess,
  onConfirmAccountFail,
  onEditProfileRequest,
  onEditProfileSuccess,
  onEditProfileFail,
  togglePasswordUpdate,
  toggleForgotPassword,
  onFacebookLoginStart,
  onFacebookLoginCancel,
  onFacebookLoginFinish
} from '../actions/auth-actions'

import { toggleAuthLoading } from '../actions/booking-actions'
import { onCountrySelect } from '../actions/country-selection-actions'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// TODO: move dispatches to 'actions' and keep only ajax calls here

// Todo error handling
// Todo move update, updatePassword to profile-api

export function login(params) {
  return (dispatch, getState) => {
    const { credentials, onSuccess } = params
    const confirmationModalProps = {
      email: credentials.email
    }

    dispatch(toggleAuthLoading())
    return axios({
      method: 'POST',
      url: `${apiEndpoints.playven}/authenticate`,
      params: credentials
    }).then(res => {
      const token = res.data.auth_token

      setAuthorizationToken(token)
      const user = jwt.decode(token)

      dispatch(onLoginSuccess(user))
      dispatch(hide('login'))
      if (onSuccess && typeof onSuccess === 'string') {
        dispatch(show(onSuccess))
      } else if (onSuccess && typeof onSuccess === 'function') {
        dispatch(onSuccess())
      }

      const store = getState()
      const { chosenCountryId } = store.countrySelection

      if (user.country_id && user.country_id !== chosenCountryId) {
        localStorage.setItem('country', user.country_id)
        dispatch(onCountrySelect(user.country_id))
      }

      dispatch(toggleAuthLoading())
    })
    .catch(error => {
      dispatch(toggleAuthLoading())
      let errorMessages = ''

      if (error.response && error.response.status === 401) {
        errorMessages = error.response.data.errors.join(', ')
        toastr.error(errorMessages)
        dispatch(onLoginFail(error.response.data.errors.join(', ')))
      } else if (error.response && error.response.status === 422) {
        let errorResp = ''

        try {
          errorResp = error.response.data.error
        } catch (e) {
          // pass
        }
        if (errorResp === 'unconfirmed_account') {
          dispatch(hide('login'))
          dispatch(show('resendconfirmationemail', confirmationModalProps))
        } else {
          toastr.error(error.response.data.message)
        }
      } else {
        // Something happened in setting up the request that triggered an Error
        toastr.error(error.message)
        dispatch(onLoginFail(error.message))
      }
    })
  }
}

export function logout() {
  return dispatch => {
    setAuthorizationToken()
    dispatch(onLogout())
  }
}

export function register(params) {
  return (dispatch, getState) => {
    const { credentials, onSuccess } = params
    const confirmationModalProps = {
      email: credentials.user.email
    }

    const store = getState()
    const { chosenCountryId } = store.countrySelection

    dispatch(toggleAuthLoading())
    return axios({
      method: 'POST',
      url: `${apiEndpoints.playven}/users`,
      data: {
        user: {
          ...credentials.user,
          // eslint-disable-next-line
          default_country_id: chosenCountryId
        }
      }
    }).then(res => {
      const token = res.data.auth_token

      setAuthorizationToken(token)
      dispatch(onRegisterSuccess(jwt.decode(token)))
      dispatch(hide('register'))
      if (onSuccess && typeof onSuccess === 'string') {
        dispatch(show(onSuccess))
      } else if (onSuccess && typeof onSuccess === 'function') {
        dispatch(onSuccess())
      }
      dispatch(toggleAuthLoading())
    })
    .catch(error => {
      dispatch(toggleAuthLoading())
      let errorMessages = ''


      if (error.response && error.response.status === 422) {
        let errorResp = ''

        try {
          errorResp = error.response.data.error
        } catch (e) {
          // pass
        }
        if (errorResp === 'unconfirmed_account') {
          dispatch(hide('register'))
          dispatch(show('resendconfirmationemail', confirmationModalProps))
        } else {
          toastr.error(error.response.data.message || error.response.data.errors.join(', '))
        }
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessages = error.message
        toastr.error(errorMessages)
      }

      dispatch(onRegisterFail(errorMessages))
    })
  }
}


export const sendOAuthParamsToSignIn = (params, provider = 'facebook', onSuccess) =>
  dispatch => axios({
    method: 'POST',
        // TODO: change assets to .api as soon as we get devise controller under api namespace
    url: `${apiEndpoints.assets}/auth/${provider}/callback`,
    params
  })
  .then(res => {
    const token = res.data.auth_token

    if (onSuccess && typeof onSuccess === 'function') {
      dispatch(onSuccess())
    }
    setAuthorizationToken(token)
    dispatch(onLoginSuccess(jwt.decode(token)))
  })
      .catch(error => {
        const { response } = error

        if (response && response.status === 422) {
          toastr.error(error.response.data.message)
        } else {
          // Something happened in setting up the request that triggered an Error
          toastr.error(error.message)
          dispatch(onLoginFail(error.message))
        }
      })
      .then(() => {
        dispatch(onFacebookLoginFinish())
      })


function listenForCredentials(popup, dispatch, onSuccess) {
  if (popup.closed) {
    return dispatch(onFacebookLoginCancel())
  }
  // TODO: ????
  let href = null

  try {
    href = popup.location.search
  } catch (error) {
    // nothing wrong here, still not ready
  }

  if (!href || _.trim(href).length === 0) {
    return setTimeout(() => listenForCredentials(popup, dispatch, onSuccess), 100)
  }

  // ?code=CODEGOESHERE&state=STATEGOESHERE#_=_
  href = _.first(href.substr(1).split('#'))
  const chunks = _.map(href.split('&'), muppet => muppet.split('='))
  const object = _.reduce(chunks, (memo, current) => _.extend(memo, { [current[0]]: current[1] })
  , {})

  popup.close()

  return dispatch(sendOAuthParamsToSignIn(object, 'facebook', onSuccess))
}


export function facebookLogin(onSuccess) {
  const popup = openPopup('facebook', apiEndpoints.social_signin.facebook, 'Facebook login')

  return dispatch => {
    dispatch(onFacebookLoginStart())
    // ping that child window & ask if tokens are here. While this might be not the "best"
    // redux approach it doesn't spawn hundreds of stores, making dev life happier
    listenForCredentials(popup, dispatch, onSuccess)
  }
}


export const update = (user, userId) => (dispatch, getState) => {
  for (const propName in user) {
    if (!user[propName]) {
      delete user[propName]
    }
  }

  if (user.current_password ||
    user.password ||
    user.password_confirmation) {
    if (!user.current_password) {
      toastr.error(Text.t('messages.errors.enter_current_password'))
      return false
    }

    if (!user.password || !user.password_confirmation) {
      toastr.error(Text.t('messages.errors.fill_all_password_fields'))
      return false
    }

    if (user.password !== user.password_confirmation) {
      dispatch(change('editinformation', 'password', ''))
      dispatch(change('editinformation', 'password_confirmation', ''))
      toastr.error(Text.t('messages.errors.password_mismatch'))
      return false
    }

    if (user.password.length < 8 || user.password_confirmation.length < 8) {
      toastr.error(Text.t('messages.errors.short_password'))
      return false
    }
  }

  const requestBody = {
    user
  }

  dispatch(onEditProfileRequest())
  return axios({
    method: 'PATCH',
    url: `${apiEndpoints.playven}/users/${userId}`,
    data: requestBody
  }).then(res => {
    if (res.status === 200) {
      setAuthorizationToken(res.data.auth_token)
      dispatch(onEditProfileSuccess(res.data))
      const state = getState()

      dispatch(change('editinformation', 'current_password', ''))
      dispatch(change('editinformation', 'password', ''))
      dispatch(change('editinformation', 'password_confirmation', ''))

      toastr.success(state.auth.messages.message)
    } else {
      dispatch(onEditProfileFail(res.data.message))
      const state = getState()

      toastr.error(state.auth.messages.reason)
    }
  }).catch(error => {
    let errorMessages = ''

    try {
      if (error.response && error.response.status === 422) {
        errorMessages = error.response.data.message.join(', ')
      } else {
          // Something happened in setting up the request that triggered an Error
        errorMessages = error.message
      }
      dispatch(onEditProfileFail(errorMessages))
      toastr.error(errorMessages)
    } catch (errorData) {
      toastr.error(errorData.message)
    }
  })
}

export function forgotPassword(params) {
  const { user, onSuccess } = params

  return dispatch => {
    dispatch(toggleForgotPassword())
    return axios({
      method: 'POST',
      url: `${apiEndpoints.playven}/password`,
      data: { user }
    }).then(() => {
      dispatch(toggleForgotPassword())
      if (onSuccess && typeof onSuccess === 'function') {
        dispatch(onSuccess())
      }
      toastr.success(I18n.t('messages.reset_password.successfuly_sent'))
    })
      .catch(error => {
        dispatch(toggleForgotPassword())
        toastr.error(errorsToFullMessage(error.response.data.errors))
      })
  }
}

export function updatePassword(credentials, userId) {
  return dispatch => {
    if (!credentials.current_password) {
      toastr.error(Text.t('messages.errors.enter_current_password'))
      return false
    }

    if (!credentials.password || !credentials.password_confirm) {
      toastr.error(Text.t('messages.errors.fill_all_password_fields'))
      return false
    }

    if (credentials.password !== credentials.password_confirm) {
      dispatch(change('updatepassword', 'password', ''))
      dispatch(change('updatepassword', 'password_confirm', ''))

      dispatch(change('editinformation', 'password', ''))
      dispatch(change('editinformation', 'password_confirm', ''))

      toastr.error(Text.t('messages.errors.password_mismatch'))
      return false
    }

    if (credentials.password.length < 8 || credentials.password_confirm.length < 8) {
      toastr.error(Text.t('messages.errors.short_password'))
      return false
    }

    const reqBody = {
      user: {
        /* eslint-disable */
        current_password: credentials.current_password,
        password: credentials.password,
        password_confirmation: credentials.password_confirm
        /* eslint-enable */
      }
    }

    dispatch(togglePasswordUpdate())

    return axios({
      method: 'PUT',
      url: `${apiEndpoints.playven}/users/${userId}`,
      data: reqBody
    }).then(res => {
      dispatch(togglePasswordUpdate())
      dispatch(hide('updatepassword'))

      dispatch(change('editinformation', 'current_password', ''))
      dispatch(change('editinformation', 'password', ''))
      dispatch(change('editinformation', 'password_confirm', ''))

      toastr.success(res.data.message)
    }).catch(error => {
      dispatch(togglePasswordUpdate())
      toastr.error(error.response.data.message.join(', '))
    })
  }
}

export function resendConfirmationEmail(emailObj) {
  return (dispatch, getState) => {
    dispatch(onResendconfirmationRequest())

    return axios({
      method: 'POST',
      url: `${apiEndpoints.playven}/users/confirm_account_email`,
      data: emailObj
    }).then(res => {
      if (res.status === 201) {
        dispatch(onResendConfirmationSuccess(res.data.message))
        const state = getState()

        toastr.success(state.auth.messages.message)
      } else {
        dispatch(onResendConfirmationFail(res.data.message))
        const state = getState()

        toastr.error(state.auth.messages.reason)
      }
    })
      .catch(error => {
        let errorMessages = ''

        if (error.response && error.response.status === 422) {
          errorMessages = error.response.data.errors.join(', ')
        } else {
          // Something happened in setting up the request that triggered an Error
          errorMessages = error.message
        }

        toastr.error(errorMessages)
      })
  }
}

export function confirmAccount(credentials, location) {
  return (dispatch, getState) => {
    // credentials will be null if no password set up required
    if (credentials) {
      if (credentials.password !== credentials.password_confirm) {
        dispatch(change('confirmpassword', 'password', ''))
        dispatch(change('confirmpassword', 'password_confirm', ''))
        toastr.error('Password mismatch')
        return
      }
    }

    const params = credentials ? credentials : {}

    // eslint-disable-next-line
    params.confirmation_token = location.query.confirmation_token
    const queryString = _.reduce(params, (result, v, k) => `${result}&${k}=${v}`, '').substr(1)

    dispatch(onConfirmAccountRequest())
    axios({
      method: 'GET',
      // TODO: once we move all controllers to /api scope this can be changed
      // back to apiEndpoints.playven
      url: `${apiEndpoints.assets}/confirmation?${queryString}`
    }).then(res => {
      if (res.status === 200) {
        const token = res.data.auth_token

        setAuthorizationToken(token)
        dispatch(onConfirmAccountSuccess(res.data.message, jwt.decode(token)))
        const state = getState()

        toastr.success(state.auth.messages.message)
        browserHistory.push('/')
      } else {
        dispatch(onConfirmAccountFail(res.data.errors.join(', ')))
        const state = getState()

        toastr.error(state.auth.messages.reason)
      }
    })
      .catch(error => {
        let errorMessages = ''

        if (error.response && error.response.status === 422) {
          errorMessages = error.response.data.errors.join(', ')
        } else {
          // Something happened in setting up the request that triggered an Error
          errorMessages = error.message
        }

        dispatch(onConfirmAccountFail(errorMessages))
        toastr.error(errorMessages)
      })
  }
}

// "here's my old token, I want new one to be valid for next 30 days"
export const renewAuthToken = oldAuthToken => dispatch => {
  // premature login with old credentials (to display user info instantly)
  dispatch(onLoginSuccess(jwt.decode(oldAuthToken)))
  const url = `${apiEndpoints.playven}/auth/renew_token`

  axios.post(url).then(response => {
    const token = response.data.auth_token
    const user = jwt.decode(token) // eslint-disable-next-line

    setAuthorizationToken(token)
    dispatch(onLoginSuccess(user))
  }).catch(() => {
    // token is expired, logging user out
    setAuthorizationToken()
    dispatch(onLogout())
  })
}
