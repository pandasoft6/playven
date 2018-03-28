export const CHANGE_DATE = 'CHANGE_DATE'
export const DISPLAY_BOOKING_RESULTS = 'DISPLAY_BOOKING_RESULTS'
export const SPORTS_LIST_VISIBILITY = 'SPORTS_LIST_VISIBILITY'
export const CHANGE_SPORT = 'CHANGE_SPORT'
export const UPDATE_VENUE_SLOTS = 'UPDATE_VENUE_SLOTS'
export const ON_COURT_SELECT = 'ON_COURT_SELECT'
export const ON_COURT_DESELECT = 'ON_COURT_DESELECT'
export const TOGGLE_LOADED = 'TOGGLE_LOADED'
export const TOGGLE_CARDS_LOADED = 'TOGGLE_CARDS_LOADED'
export const CLEAR_STATE = 'CLEAR_STATE'
export const CLEAR_SELECTED_COURTS = 'CLEAR_SELECTED_COURTS'
export const SAVE_CARDS = 'SAVE_CARDS'
export const SELECT_CARD = 'SELECT_CARD'
export const SET_AVAILABILITY_VIEW = 'SET_AVAILABILITY_VIEW'
export const UPDATE_DURATION = 'UPDATE_DURATION'
export const GAME_PASSES_CLEAR = 'GAME_PASSES_CLEAR'
export const GAME_PASSES_REJECTED = 'GAME_PASSES_REJECTED'
export const ADD_GAME_PASS = 'ADD_GAME_PASS'
export const SELECT_GAME_PASS = 'SELECT_GAME_PASS'
export const CHANGE_PAYMENT_VIEW = 'CHANGE_PAYMENT_VIEW'
export const TOGGLE_AUTH_LOADING = 'TOGGLE_AUTH_LOADING'

export const changeDate = date => ({
  type: CHANGE_DATE,
  payload: date
})

export const displayBookingResults = () => ({
  type: DISPLAY_BOOKING_RESULTS
})

export const toggleSportsList = () => ({
  type: SPORTS_LIST_VISIBILITY
})

export const changeSport = sport => ({
  type: CHANGE_SPORT,
  payload: sport
})


export const updateVenueSlots = slots => ({
  type: UPDATE_VENUE_SLOTS,
  payload: slots
})

export const onCourtSelect = courtData => ({
  type: ON_COURT_SELECT,
  payload: courtData
})

export const onCourtDeselect = (courtId, startTime) => ({
  type: ON_COURT_DESELECT,
  courtId,
  startTime
})

export const toggleLoaded = () => ({
  type: TOGGLE_LOADED
})

export const toggleCardsLoaded = () => ({
  type: TOGGLE_CARDS_LOADED
})

export const clearState = () => ({
  type: CLEAR_STATE
})

export const clearSelectedCourts = () => ({
  type: CLEAR_SELECTED_COURTS
})

export const saveCards = cards => ({
  type: SAVE_CARDS,
  payload: cards
})

export const selectCard = id => ({
  type: SELECT_CARD,
  payload: id
})

export const setAvailabilityView = availabilityView => ({
  type: SET_AVAILABILITY_VIEW,
  payload: availabilityView
})

export const updateDuration = duration => ({
  type: UPDATE_DURATION,
  payload: duration
})

export const gamePassesClear = courtId => ({
  type: GAME_PASSES_CLEAR,
  courtId
})

export const gamePassesRejected = () => ({
  type: GAME_PASSES_REJECTED
})

export const addGamePass = (data, courtId) => ({
  type: ADD_GAME_PASS,
  payload: data,
  courtId
})

export const selectGamePass = (gamePassId, court) => ({
  type: SELECT_GAME_PASS,
  payload: gamePassId,
  court
})

export const changePaymentView = view => ({
  type: CHANGE_PAYMENT_VIEW,
  payload: view
})

export const toggleAuthLoading = () => ({
  type: TOGGLE_AUTH_LOADING
})
