import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
  bookWithoutPayment,
  pay,
  getCards,
  addCard,
  cancelReservation,
  resellReservation
} from '../../src/api/reservation-api'
import * as types from '../../src/actions/booking-actions'
import {
  ON_CANCEL_RESERVATION_SUCCESS,
  TOGGLE_ALERT,
  ON_RESELL_RESERVATION_SUCCESS
} from '../../src/routes/Profile/modules/profile'
import { show, destroy } from 'redux-modal'
import moxios from 'moxios'

/* eslint camelcase: ["error", {properties: "never"}] max-nested-callbacks: ["error", 5] */

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('async actions', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })


  it('creates SAVE_CARDS and SELECT_CARD when fetching cards has been done', () => {
    const expectedActions = [
      { type: types.TOGGLE_LOADED },
      { type: types.TOGGLE_LOADED },
      { type: types.SAVE_CARDS, payload: [
        { exp_month: 12, exp_year: 2021, id: 'card_19NMZwI61cakPIniPBuEm4f7' },
        { exp_month: 11, exp_year: 2019, id: 'card_19OENwI61cakPIniooCxe2cL' }
      ] },
      { type: types.SELECT_CARD, payload: 'card_19NMZwI61cakPIniPBuEm4f7' }
    ]

    const store = mockStore({ cards: [], default_card: '' })

    store.dispatch(getCards())

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()

      request.respondWith({
        status: 200,
        response: {
          cards: { data: [
            { exp_month: 12, exp_year: 2021, id: 'card_19NMZwI61cakPIniPBuEm4f7' },
            { exp_month: 11, exp_year: 2019, id: 'card_19OENwI61cakPIniooCxe2cL' }
          ] },
          default_card: 'card_19NMZwI61cakPIniPBuEm4f7'
        }
      }).then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
    })
  })


  it('creates SAVE_CARDS and SELECT_CARD when add card has been done', () => {
    const expectedActions = [
      { type: types.TOGGLE_LOADED },
      { type: types.TOGGLE_LOADED },
      { type: types.SAVE_CARDS, payload: [
        { exp_month: 12, exp_year: 2021, id: 'card_19NMZwI61cakPIniPBuEm4f7' },
        { exp_month: 11, exp_year: 2019, id: 'card_19OENwI61cakPIniooCxe2cL' },
        { exp_month: 10, exp_year: 2018, id: 'newCard' }
      ] },
      { type: types.SELECT_CARD, payload: 'newCard' }
    ]

    const store = mockStore({ cards: [], default_card: '' })

    store.dispatch(addCard({ id: 'newCard' }))

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()

      request.respondWith({
        status: 200,
        response: {
          cards: { data: [
            { exp_month: 12, exp_year: 2021, id: 'card_19NMZwI61cakPIniPBuEm4f7' },
            { exp_month: 11, exp_year: 2019, id: 'card_19OENwI61cakPIniooCxe2cL' },
            { exp_month: 10, exp_year: 2018, id: 'newCard' }
          ] },
          default_card: 'newCard'
        }
      }).then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
    })
  })


  it('creates SAVE_CARDS and SELECT_CARD when booking without payment has been done', () => {
    const initialState = { booking: {
      selectedCourts: [],
      activeSlot: 720
    } }

    const expectedActions = [
      destroy('payment'),
      show('success'),
      { type: types.CLEAR_STATE }
    ]

    const store = mockStore(initialState)

    store.dispatch(bookWithoutPayment({}))

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()

      request.respondWith({
        status: 200
      }).then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
    })
  })


  it('creates SAVE_CARDS and SELECT_CARD when booking with payment has been done', () => {
    const initialState = { booking: {
      selectedCourts: [],
      selectedCard: 'card_19OENwI61cakPIniooCxe2cL',
      activeSlot: 720
    } }

    const expectedActions = [
      { type: types.TOGGLE_LOADED },
      { type: types.TOGGLE_LOADED },
      destroy('payment'),
      show('success'),
      { type: types.CLEAR_STATE }
    ]

    const store = mockStore(initialState)

    store.dispatch(pay({}))

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()

      request.respondWith({
        status: 200
      }).then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
    })
  })

  it('creates ON_CANCEL_RESERVATION_SUCCESS when reservation canceled', () => {
    const reservation = {
      id: 3345,
      booking_type: 'online'
    }

    const expectedActions = [
      { type: ON_CANCEL_RESERVATION_SUCCESS, payload: reservation },
      { type: TOGGLE_ALERT }
    ]

    const store = mockStore({})

    store.dispatch(cancelReservation(reservation))

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()

      request.respondWith({ status: 200 })
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
    })
  })

  it('creates ON_RESELL_RESERVATION_SUCCESS when reservation reselled', () => {
    const reservation = {
      id: 3345,
      booking_type: 'online',
      reselling: true
    }

    const expectedActions = [
      { type: ON_RESELL_RESERVATION_SUCCESS, payload: reservation },
      { type: TOGGLE_ALERT }
    ]

    const store = mockStore({})

    store.dispatch(resellReservation(reservation))

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()

      request.respondWith({ status: 200 })
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
    })
  })
})
