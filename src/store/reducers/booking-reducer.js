import {
  CHANGE_DATE,
  DISPLAY_BOOKING_RESULTS,
  SPORTS_LIST_VISIBILITY,
  CHANGE_SPORT,
  ON_COURT_SELECT,
  ON_COURT_DESELECT,
  UPDATE_VENUE_SLOTS,
  TOGGLE_LOADED,
  TOGGLE_CARDS_LOADED,
  TOGGLE_AUTH_LOADING,
  CLEAR_STATE,
  CLEAR_SELECTED_COURTS,
  SAVE_CARDS,
  SELECT_CARD,
  UPDATE_DURATION,
  SET_AVAILABILITY_VIEW,
  ADD_GAME_PASS,
  GAME_PASSES_CLEAR,
  GAME_PASSES_REJECTED,
  SELECT_GAME_PASS,
  CHANGE_PAYMENT_VIEW
} from '../../actions/booking-actions'

import _ from 'lodash'
import moment from 'moment'

const initialState = {
  availabilityView: 'grid',
  venue: {},
  date: '',
  displayBookingResults: false,
  sportsListVisible: false,
  sport: 'tennis',
  activeSlot: '',
  slots: [],
  selectedCourts: [],
  loaded: true,
  cards: [],
  cardsLoaded: true,
  selectedCard: '',
  duration: '',
  paymentView: 'content',
  authLoading: false
}

let index

export default function bookingReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_DATE:
      return {
        ...state,
        date: action.payload
        // selectedCourts: []
      }
    case SPORTS_LIST_VISIBILITY:
      return {
        ...state,
        sportsListVisible: !state.sportsListVisible
      }
    case CHANGE_SPORT:
      return {
        ...state,
        sport: action.payload
        // selectedCourts: []
      }

    case ON_COURT_SELECT: {
      const startsAtMoment = moment(action.payload.starts_at, 'YYYY-MM-DD HH:mm:ss')
      const startTime = startsAtMoment.format('HH:mm')

      if (state.selectedCourts.filter(court => court.id === action.payload.court.id &&
        court.startTime === startTime)[0]) {
        return state
      }

      return {
        ...state,
        selectedCourts: [
          ...state.selectedCourts,
          {
            id: action.payload.court.id,
            startTime,
            duration: action.payload.duration,
            price: action.payload.price,
            currency: action.payload.currency,
            date: startsAtMoment.format('YYYY/MM/DD')
          }
        ]
      }
    }

    case ON_COURT_DESELECT: {
      return {
        ...state,
        selectedCourts: state.selectedCourts.filter(court => !(court.id === action.courtId &&
          court.startTime === action.startTime))
      }
    }


    case UPDATE_VENUE_SLOTS:
      return {
        ...state,
        slots: action.payload
      }

    case DISPLAY_BOOKING_RESULTS:
      return {
        ...state,
        displayBookingResults: true
      }

    case TOGGLE_LOADED:
      return {
        ...state,
        loaded: !state.loaded
      }

    case TOGGLE_CARDS_LOADED:
      return {
        ...state,
        cardsLoaded: !state.cardsLoaded
      }

    case CLEAR_STATE:
      return {
        ...initialState
      }
    case CLEAR_SELECTED_COURTS:
      return {
        ...state,
        selectedCourts: []
      }

    case SAVE_CARDS:
      return {
        ...state,
        cards: action.payload
      }
    case SELECT_CARD:
      return {
        ...state,
        selectedCard: action.payload
      }

    case SET_AVAILABILITY_VIEW:
      return {
        ...state,
        availabilityView: action.payload
      }

    case UPDATE_DURATION:
      return {
        ...state,
        duration: action.payload
      }

    case ADD_GAME_PASS: {
      const selectedCourts = state.selectedCourts.map(court => {
        if (court.id !== action.courtId) {
          return court
        }
        return { ...court, gamePasses: action.payload }
      })

      return {
        ...state,
        selectedCourts
      }
    }
    case GAME_PASSES_CLEAR:
    case GAME_PASSES_REJECTED:
      return {
        ...state,
        selectedCourts: state.selectedCourts.map(court => {
          if (!action.courtId || action.courtId === court.id) {
            return { ...court, selectedGamePassId: null }
          }
          return court
        })
      }

    case SELECT_GAME_PASS:
      index = state.selectedCourts.indexOf(action.court)
      if (index === -1) {
        return state
      }
      return {
        ...state,
        selectedCourts: [
          ...state.selectedCourts.slice(0, index),
          { ...state.selectedCourts[index], selectedGamePassId: action.payload },
          ...state.selectedCourts.slice(index + 1)
        ]
      }
    case CHANGE_PAYMENT_VIEW:
      return {
        ...state,
        paymentView: action.payload
      }
    case TOGGLE_AUTH_LOADING:
      return {
        ...state,
        authLoading: !state.authLoading
      }

    default:
      return state
  }
}
