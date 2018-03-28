import * as types from './action-types'
// login
export const LOGIN_SUCCESS = types.LOGIN_SUCCESS
export const LOGIN_FAIL = types.LOGIN_FAIL
export const ON_AUTH_INPUT_CHANGE = types.ON_AUTH_INPUT_CHANGE

// forgot password
export const TOGGLE_PASSWORD_FORGOT = types.TOGGLE_PASSWORD_FORGOT

// register
export const REGISTER_SUCCESS = types.REGISTER_SUCCESS
export const REGISTER_FAIL = types.REGISTER_FAIL
export const ON_REGISTER_INPUT_CHANGE = types.ON_REGISTER_INPUT_CHANGE
// create password
export const CONFIRM_ACCOUNT_REQUEST = types.CONFIRM_ACCOUNT_REQUEST
export const CONFIRM_ACCOUNT_SUCCESS = types.CONFIRM_ACCOUNT_SUCCESS
export const CONFIRM_ACCOUNT_FAIL = types.CONFIRM_ACCOUNT_FAIL

// resend confirmation
export const RESEND_CONFIRMATION_REQUEST = types.RESEND_CONFIRMATION_REQUEST
export const RESEND_CONFIRMATION_SUCCESS = types.RESEND_CONFIRMATION_SUCCESS
export const RESEND_CONFIRMATION_FAIL = types.RESEND_CONFIRMATION_FAIL

// edit
export const ON_EDIT_INPUT_CHANGE = types.ON_EDIT_INPUT_CHANGE

// edit profile
export const EDIT_PROFILE_REQUEST = types.EDIT_PROFILE_REQUEST
export const EDIT_PROFILE_SUCCESS = types.EDIT_PROFILE_SUCCESS
export const EDIT_PROFILE_FAIL = types.EDIT_PROFILE_FAIL

// logout
export const LOG_OUT = 'LOG_OUT'
// update password
export const TOGGLE_PASSWORD_UPDATE = types.TOGGLE_PASSWORD_UPDATE
export const TOGGLE_RESET_PASSWORD = types.TOGGLE_RESET_PASSWORD

export const ON_FACEBOOK_LOGIN_START = types.ON_FACEBOOK_LOGIN_START
export const ON_FACEBOOK_LOGIN_CANCEL = types.ON_FACEBOOK_LOGIN_CANCEL
export const ON_FACEBOOK_LOGIN_FINISH = types.ON_FACEBOOK_LOGIN_FINISH

export function onLoginSuccess(user) {
  return {
    user,
    type: types.LOGIN_SUCCESS
  }
}

export function onLoginFail(reason) {
  return {
    reason,
    type: types.LOGIN_FAIL
  }
}

export function onRegisterFail(reason) {
  return {
    reason,
    type: types.REGISTER_FAIL
  }
}

export function onRegisterSuccess(user) {
  return {
    user,
    type: types.REGISTER_SUCCESS
  }
}

export function onChange(e, type = types.ON_AUTH_INPUT_CHANGE) {
  return {
    input: {
      name: e.target.name,
      value: e.target.value
    },
    type
  }
}

export function onConfirmAccountRequest() {
  return {
    type: types.CONFIRM_ACCOUNT_REQUEST
  }
}

export function onConfirmAccountSuccess(successMessage, user) {
  return {
    type: types.CONFIRM_ACCOUNT_SUCCESS,
    message: successMessage,
    user
  }
}

export function onConfirmAccountFail(errorMessage) {
  return {
    type: types.CONFIRM_ACCOUNT_FAIL,
    reason: errorMessage
  }
}

export function onLogout() {
  return {
    type: types.LOG_OUT
  }
}

export function onEditProfileRequest() {
  return {
    type: types.EDIT_PROFILE_REQUEST
  }
}

export function onEditProfileSuccess({ message, user }) {
  return {
    type: types.EDIT_PROFILE_SUCCESS,
    message,
    user
  }
}

export function onEditProfileFail(errorMessage) {
  return {
    type: types.EDIT_PROFILE_FAIL,
    reason: errorMessage
  }
}


export function togglePasswordUpdate() {
  return {
    type: TOGGLE_PASSWORD_UPDATE
  }
}

export function toggleForgotPassword() {
  return {
    type: TOGGLE_PASSWORD_FORGOT
  }
}

export function onResendconfirmationRequest() {
  return {
    type: types.RESEND_CONFIRMATION_REQUEST
  }
}

export function onResendConfirmationSuccess(successMessage) {
  return {
    type: types.RESEND_CONFIRMATION_SUCCESS,
    message: successMessage
  }
}

export function onResendConfirmationFail(errorMessage) {
  return {
    type: types.RESEND_CONFIRMATION_FAIL,
    reason: errorMessage
  }
}

export const toggleResetPassword = () => ({
  type: TOGGLE_RESET_PASSWORD
})

export const onFacebookLoginStart = () => ({
  type: types.ON_FACEBOOK_LOGIN_START
})

export const onFacebookLoginCancel = () => ({
  type: types.ON_FACEBOOK_LOGIN_CANCEL
})

export const onFacebookLoginFinish = () => ({
  type: types.ON_FACEBOOK_LOGIN_FINISH
})

/** **************************************
*     Export api functions.             *
* Kept separate to have code integrity  *
****************************************/

export {
  login,
  logout,
  register,
  update,
  forgotPassword,
  updatePassword,
  confirmAccount,
  resendConfirmationEmail,
  facebookLogin
 } from '../api/auth-api'
