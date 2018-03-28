import moment from 'moment'

/** **************************************
*     Export api functions.             *
* Kept separate to have code integrity  *
****************************************/

export { update } from '../../../api/auth-api'
export { getUserReservations, getUserSubscriptions } from '../../../api/profile-api'
export { getUserInvoices } from '../../../api/invoices-api'
export { getSportNames } from '../../../api/venue-api'
export { getUserGamePasses } from '../../../api/game-passes-api'

// ------------------------------------
// Constants
// ------------------------------------

// FILTER
export const FILTER_ORDER = {
  FUTURE: 'future',
  PAST: 'past',
  PAID: 'paid',
  UNPAID: 'unpaid',
  VALID: 'valid',
  EXPIRED: 'expired'
}
export const FILTER_TYPE = {
  GAME_PASSES: 'game_passes',
  INVOICES: 'invoices',
  RESERVATIONS: 'reservations',
  RECURRING_RESERVATIONS: 'recurring',
  RESELLING_RECURRING_RESERVATIONS: 'recurring_reselling',
  RESOLD_RECURRING_RESERVATIONS: 'recurring_resold'
}

export const ON_CLICK_NAVIGATION_ITEM = 'ON_CLICK_NAVIGATION_ITEM'
export const ON_CHANGE_FILTER = 'ON_CHANGE_FILTER'

export const ON_SUBMIT_PROFILE_FORM = 'ON_SUBMIT_PROFILE_FORM'
export const ON_SUBMITTED_PROFILE_FORM = 'ON_SUBMITTED_PROFILE_FORM'
export const ON_SUBMIT_PROFILE_FORM_SUCCESS = 'ON_SUBMIT_PROFILE_FORM_SUCCESS'

export const ON_GET_USER_SUBSCRIPTION_SUCCESS = 'ON_GET_USER_SUBSCRIPTION_SUCCESS'
export const ON_GET_USER_SUBSCRIPTION_FAIL = 'ON_GET_USER_SUBSCRIPTION_FAIL'

export const ON_GET_USER_RESERVATION_REQUEST = 'ON_GET_USER_RESERVATION_REQUEST'
export const ON_GET_USER_RESERVATION_SUCCESS = 'ON_GET_USER_RESERVATION_SUCCESS'

export const ON_GET_USER_INVOICES_REQUEST = 'ON_GET_USER_INVOICES_REQUEST'
export const ON_GET_USER_INVOICES_SUCCESS = 'ON_GET_USER_INVOICES_SUCCESS'
export const INVOICE_DOWNLOADED = 'INVOICE_DOWNLOADED'

export const ON_GET_USER_GAME_PASSES_REQUEST = 'ON_GET_USER_GAME_PASSES_REQUEST'
export const ON_GET_USER_GAME_PASSES_SUCCESS = 'ON_GET_USER_GAME_PASSES_SUCCESS'

export const ON_CANCEL_RESERVATION_SUCCESS = 'ON_CANCEL_RESERVATION_SUCCESS'
export const ON_RESELL_RESERVATION_SUCCESS = 'ON_RESELL_RESERVATION_SUCCESS'

export const ON_CLICK_INVOICE_PAY = 'ON_CLICK_INVOICE_PAY'
export const ON_INVOICE_PAID = 'ON_INVOICE_PAID'

export const RESERVATION_DOWNLOADED = 'RESERVATION_DOWNLOADED'

const MOVETOSEARCHPAGE = 'MOVETOSEARCHPAGE'

// ------------------------------------
// Actions
// ------------------------------------

export const onChangeFilter = ({ name, value }) => ({
  type: ON_CHANGE_FILTER,
  name,
  value
})

export const onClickNavigationItem = (item, order = '') => ({
  type: ON_CLICK_NAVIGATION_ITEM,
  item,
  order
})

export const getUserReservationsRequest = payload => ({
  type: ON_GET_USER_RESERVATION_REQUEST,
  payload
})

export const getUserReservationsSuccess = payload => ({
  type: ON_GET_USER_RESERVATION_SUCCESS,
  payload
})

export const getUserGamePassesRequest = payload => ({
  type: ON_GET_USER_GAME_PASSES_REQUEST,
  payload
})

export const getUserGamePassesSuccess = payload => ({
  type: ON_GET_USER_GAME_PASSES_SUCCESS,
  payload
})

export const getUserReservationsFail = payload => ({
  type: ON_GET_USER_SUBSCRIPTION_FAIL,
  payload
})

export const getUserSubscriptionsSuccess = payload => ({
  type: ON_GET_USER_SUBSCRIPTION_SUCCESS,
  payload
})

// TODO : Handle this
export const getUserSubscriptionsFail = payload => ({
  type: ON_GET_USER_SUBSCRIPTION_FAIL,
  payload
})

export const getUserInvoicesRequest = payload => ({
  type: ON_GET_USER_INVOICES_REQUEST,
  payload
})

export const getUserInvoicesSuccess = payload => ({
  type: ON_GET_USER_INVOICES_SUCCESS,
  payload
})

export const invoiceDownloaded = payload => ({
  type: INVOICE_DOWNLOADED,
  payload
})

export const moveToPage = pageNumber => ({
  type: MOVETOSEARCHPAGE,
  value: pageNumber
})

export const cancelReservationSuccess = payload => ({
  type: ON_CANCEL_RESERVATION_SUCCESS,
  payload
})

export const resellReservationSuccess = payload => ({
  type: ON_RESELL_RESERVATION_SUCCESS,
  payload
})

export const reservationDownloaded = payload => ({
  type: RESERVATION_DOWNLOADED,
  payload
})

export const onClickInvoicePay = invoice => ({
  type: ON_CLICK_INVOICE_PAY,
  invoice
})

export const onInvoicePaid = invoices => ({
  type: ON_INVOICE_PAID,
  invoices
})

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  ON_CHANGE_FILTER: (state, action) => ({
    ...state,
    filter: {
      ...state.filter,
      [action.name]: action.value
    },
    pageNumber: 0
  }),
  ON_CLICK_NAVIGATION_ITEM: (state, action) => ({
    ...state,
    active: action.item,
    filter: {
      ...state.filter,
      type: action.item,
      order: action.order
    },
    pageNumber: 0
  }),
  ON_GET_USER_SUBSCRIPTION_SUCCESS: (state, action) => ({
    ...state,
    content: {
      ...state.content,
      reservations: action.payload
    }
  }),
  ON_GET_USER_RESERVATION_REQUEST: (state, action) => ({
    ...state,
    content: {
      ...state.content,
      reservations: action.payload
    },
    isFetching: true
  }),
  ON_GET_USER_RESERVATION_SUCCESS: (state, action) => ({
    ...state,
    content: {
      ...state.content,
      reservations: action.payload
    },
    isFetching: false
  }),
  ON_GET_USER_GAME_PASSES_REQUEST: (state, action) => ({
    ...state,
    content: {
      ...state.content,
      gamePasses: action.payload
    },
    isFetching: true
  }),
  ON_GET_USER_GAME_PASSES_SUCCESS: (state, action) => ({
    ...state,
    content: {
      ...state.content,
      gamePasses: action.payload
    },
    isFetching: false
  }),
  ON_GET_USER_INVOICES_REQUEST: (state, action) => ({
    ...state,
    content: {
      ...state.content,
      invoices: action.payload
    },
    isFetching: true
  }),
  ON_GET_USER_INVOICES_SUCCESS: (state, action) => ({
    ...state,
    content: {
      ...state.content,
      invoices: action.payload
    },
    isFetching: false
  }),
  [MOVETOSEARCHPAGE]: (state, action) => ({
    ...state,
    pageNumber: action.value
  }),
  ON_CANCEL_RESERVATION_SUCCESS: state => state,
  ON_RESELL_RESERVATION_SUCCESS: state => state,
  ON_CLICK_INVOICE_PAY: (state, action) => ({
    ...state,
    invoicePayment: {
      ...state.invoicePayment,
      invoice: action.invoice
    }
  }),
  ON_INVOICE_PAID: (state, action) => ({
    ...state,
    content: {
      ...state.content,
      invoices: action.invoices
    }
  })
}

// ------------------------------------
// Reducer ** Initial values
// ------------------------------------

const initialState = {
  active: 'reservations',
  filter: {
    type: FILTER_TYPE.RESERVATIONS,
    order: FILTER_ORDER.FUTURE,
    sport: 'all',
    dateFrom: moment(),
    dateTo: moment()
  },
  content: {},
  pageNumber: 0,
  perPage: 6,
  isFetching: false
}


export default function profileReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
