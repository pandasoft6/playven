import axios from 'axios'
import toastr from 'toastr'
import _ from 'lodash'

import { toggleCardsLoaded, saveCards, selectCard, clearSelectedCourts,
  addGamePass, gamePassesRejected, gamePassesClear
} from '../actions/booking-actions'
import apiEndpoints from '../../config/apis'
import {
  resellReservationSuccess,
  cancelReservationSuccess,
  reservationDownloaded
} from '../routes/Profile/modules/profile'

export const bookWithoutPayment = params => (dispatch, getState) => {
  const { onSuccess } = params
  const state = getState()
  const { selectedCourts } = state.booking
  const bookings = selectedCourts.map(court => {
    // eslint-disable-next-line
    const start_time = `${court.date} ${court.startTime}`

    // eslint-disable-next-line
    return { id: court.id, price: court.price, start_time, duration: court.duration }
  })

  dispatch(toggleCardsLoaded())
  return axios.post(`${apiEndpoints.playven}/reservations`, {
    bookings: JSON.stringify(bookings)
  })
  .then(
    res => {
      dispatch(clearSelectedCourts())
      dispatch(toggleCardsLoaded())
      if (onSuccess && typeof onSuccess === 'function') {
        dispatch(onSuccess())
      }
      toastr.success(res.data.message)
    },
    error => {
      dispatch(toggleCardsLoaded())
      // eslint-disable-next-line
      Rollbar.critical('Unpaid booking failed!', {
        user: state.auth.user, bookings,
        error: error.response.data.errors
      })
      // eslint-disable-next-line
      toastr.error('Varaaminen epäonnistui. Virhe ilmoitettu Playvenille. Ota yhteyttä chatin avulla tukea varten')
    }
  )
}

export const pay = params => (dispatch, getState) => {
  const { onSuccess, doesCostAnything } = params
  const state = getState()
  const card = state.booking.selectedCard

  if (!card && doesCostAnything) {
    toastr.error('Please select a card to pay')
    return false
  }
  const { selectedCourts } = state.booking
  const bookings = selectedCourts.map(court => {
    // eslint-disable-next-line
    const start_time = `${court.date} ${court.startTime}`

    // eslint-disable-next-line
    return { id: court.id, price: court.price, start_time,
      // eslint-disable-next-line
      duration: court.duration, game_pass_id: court.selectedGamePassId }
  })

  dispatch(toggleCardsLoaded())
  return axios.post(`${apiEndpoints.playven}/reservations`, {
    bookings: JSON.stringify(bookings),
    card,
    pay: true
  })
  .then(
    () => {
      dispatch(toggleCardsLoaded())
      dispatch(clearSelectedCourts())
      if (onSuccess && typeof onSuccess === 'function') {
        dispatch(onSuccess())
      }
    },
    error => {
      dispatch(toggleCardsLoaded())
      // eslint-disable-next-line
      Rollbar.critical('Paid booking failed!', {
        user: state.auth.user, bookings,
        error: error.response.data.errors
      })
      // eslint-disable-next-line
      toastr.error('Varaaminen epäonnistui. Virhe ilmoitettu Playvenille. Ota yhteyttä chatin avulla tukea varten')
    }
  )
}

export const getCards = () => dispatch => {
  dispatch(toggleCardsLoaded())
  return axios.get(`${apiEndpoints.playven}/cards.json`)
    .then(response => {
      dispatch(toggleCardsLoaded())
      if (response.data.cards) {
        dispatch(saveCards(response.data.cards.data))
      }
      if (response.data.default_card) {
        dispatch(selectCard(response.data.default_card))
      }
    })
    .catch(() => {
      dispatch(toggleCardsLoaded())
    })
}

export const addCard = token => dispatch => {
  dispatch(toggleCardsLoaded())
  return axios.post(`${apiEndpoints.playven}/cards`, {
    token: token.id
  })
    .then(response => {
      dispatch(toggleCardsLoaded())
      if (response.data.cards) {
        dispatch(saveCards(response.data.cards.data))
      }
      if (response.data.default_card) {
        dispatch(selectCard(response.data.default_card))
      }
    })
    .catch(() => {
      dispatch(toggleCardsLoaded())
      toastr.error('Card could not be added!')
    })
}

export const cancelReservation = reservation => dispatch => {
  axios.delete(`${apiEndpoints.playven}/reservations/${reservation.id}`)
    .then(({ data }) => {
      toastr.success(data.message)
      dispatch(cancelReservationSuccess(reservation))
    })
    .catch(error => {
      toastr.error(_.values(error.response.data.errors).join(', '))
    })
}

export const resellReservation = reservation => dispatch => {
  axios.get(`${apiEndpoints.playven}/reservations/${reservation.id}/resell`)
    .then(({ data }) => {
      toastr.success(data.message)
      dispatch(resellReservationSuccess(reservation))
    })
    .catch(error => {
      toastr.error(_.values(error.response.data.errors).join(', '))
    })
}

export const getGamePasses = ({ startTime, endTime, courtId, duration }) =>
  (dispatch, getState) => {
    const store = getState()
    const params = {
    /*eslint-disable */
    start_time: startTime,
    court_id: courtId,
    end_time: endTime,
    duration,
    country_id: store.countrySelection.chosenCountryId
    /*eslint-enable */
    }

    dispatch(gamePassesClear(courtId))
    axios.get(`${apiEndpoints.playven}/game_passes/available`, { params })
    .then(({ data }) => {
      dispatch(addGamePass(data, courtId))
    })
    .catch(() => {
      dispatch(gamePassesRejected())
    })
  }

export const addToCalendar = data => dispatch => {
  window.open(`${data.calendarLink}?Authorization=${localStorage.getItem('authToken')}`)
  dispatch(reservationDownloaded(data))
}
