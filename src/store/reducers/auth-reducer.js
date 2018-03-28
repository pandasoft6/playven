import {
  ON_AUTH_INPUT_CHANGE,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  ON_REGISTER_INPUT_CHANGE,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOG_OUT,
  RESEND_CONFIRMATION_REQUEST,
  RESEND_CONFIRMATION_SUCCESS,
  RESEND_CONFIRMATION_FAIL,
  CONFIRM_ACCOUNT_REQUEST,
  CONFIRM_ACCOUNT_SUCCESS,
  CONFIRM_ACCOUNT_FAIL,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
  TOGGLE_PASSWORD_UPDATE,
  TOGGLE_RESET_PASSWORD,
  ON_FACEBOOK_LOGIN_START,
  ON_FACEBOOK_LOGIN_CANCEL,
  ON_FACEBOOK_LOGIN_FINISH
} from '../../actions/auth-actions'

const initialState = {
  login: {
    credentials: {}
  },
  register: {
    credentials: {}
  },
  edit: {},
  messages: {},
  errors: {},
  authenticated: false,
  isRequestingToUpdatePassword: false,
  isRequestingToConfirmAccount: false,
  isRequestingToEditProfile: false,
  isRequestingToResendConfirmation: false,
  isRequestingToResetPassword: false,
  isWaitingFacebookResponse: false
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_PASSWORD_UPDATE:
      return {
        ...state,
        isRequestingToUpdatePassword: !state.isRequestingToUpdatePassword
      }

    case TOGGLE_RESET_PASSWORD:
      return {
        ...state,
        isRequestingToResetPassword: !state.isRequestingToResetPassword
      }

    /* SEND REQUEST*/

    case EDIT_PROFILE_REQUEST:
      return {
        ...state,
        isRequestingToEditProfile: true
      }

    /* INPUT CHANGE*/
    case ON_AUTH_INPUT_CHANGE:
      return {
        ...state,
        login: {
          credentials: {
            ...state.login.credentials,
            [action.input.name]: action.input.value
          }
        }
      }

    case ON_REGISTER_INPUT_CHANGE:
      return {
        ...state,
        register: {
          credentials: {
            ...state.register.credentials,
            [action.input.name]: action.input.value
          }
        }
      }

    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.user,
        isRequestingToEditProfile: false,
        messages: {
          type: 'success',
          message: action.message
        }
      }

    case EDIT_PROFILE_FAIL:
      return {
        ...state,
        isRequestingToEditProfile: false,
        messages: {
          type: 'fail',
          reason: action.reason
        }
      }

    /* SUCCESS*/
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...initialState,
        user: action.user,
        authenticated: true,
        messages: {
          type: 'success',
          message: 'messagess.register.success'
        }
      }

    case REGISTER_FAIL:
      return {
        ...initialState,
        messages: {
          type: 'fail',
          reason: action.reason
        }
      }

    /* FAIL*/
    case LOGIN_FAIL:
      return {
        ...initialState,
        isRequestingToResetPassword: false,
        messages: {
          type: 'fail',
          reason: action.reason
        }
      }

    /* Resend Confirmation Email */
    case RESEND_CONFIRMATION_REQUEST:
      return {
        ...state,
        isRequestingToResendConfirmation: true
      }

    case RESEND_CONFIRMATION_SUCCESS:
      return {
        ...state,
        isRequestingToResendConfirmation: false,
        messages: {
          type: 'success',
          message: action.message
        }
      }

    case RESEND_CONFIRMATION_FAIL:
      return {
        ...initialState,
        isRequestingToResendConfirmation: false,
        messages: {
          type: 'fail',
          reason: action.reason
        }
      }

    case CONFIRM_ACCOUNT_SUCCESS:
      return {
        ...state,
        user: action.user,
        authenticated: true,
        isRequestingToConfirmAccount: false,
        messages: {
          type: 'success',
          message: action.message
        }
      }

    case CONFIRM_ACCOUNT_REQUEST:
      return {
        ...state,
        isRequestingToConfirmAccount: true
      }

    case CONFIRM_ACCOUNT_FAIL:
      return {
        ...initialState,
        isRequestingToConfirmAccount: false,
        messages: {
          type: 'fail',
          reason: action.reason
        }
      }

    /* LOGOUT*/
    case LOG_OUT:
      return {
        ...state,
        authenticated: false
      }

    case ON_FACEBOOK_LOGIN_START:
      return {
        ...state,
        isWaitingFacebookResponse: true
      }

    case ON_FACEBOOK_LOGIN_CANCEL:
    case ON_FACEBOOK_LOGIN_FINISH:
      return {
        ...state,
        isWaitingFacebookResponse: false
      }

    default:
      return state
  }
}
