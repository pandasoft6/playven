import React from 'react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import TestUtils from 'react-addons-test-utils'
import Payment from '../../src/components/Modals/Payment'
import ConnectedPayment from '../../src/containers/Modals/Payment'

/* eslint camelcase: ["error", {properties: "never"}] */

describe('Payment modal', () => {
  const middlewares = [thunk]
  const mockStore = configureStore(middlewares)
  const initialState = {
    booking: {
      loaded: true,
      selectedCourts: [
        { id: 297, price: 16, duration: 60, startTime: '14:30' },
        { id: 298, price: 16, duration: 60, startTime: '15:30' }
      ],
      cards: [
        { exp_month: 12, exp_year: 2021, id: 'card_19NMZwI61cakPIniPBuEm4f7' },
        { exp_month: 11, exp_year: 2019, id: 'card_19OENwI61cakPIniooCxe2cL' }
      ],
      selectedCard: 'card_19OENwI61cakPIniooCxe2cL'
    },
    location: {
      query: {
        duration: 120,
        date: '30/12/2016'
      },
      pathname: '/search'
    },
    auth: {
      user: {
        first_name: 'Stas',
        id: 917
      }
    },
    modal: {
      payment: {
        show: true
      }
    },
    i18n: {
      locale: 'fi'
    },
    venues: {
      allVenuesById: {
        1: {
          image: '...',
          venue_name: '...'
        }
      },
      venuesByName: []
    },
    allCourts: {
      297: { venue_id: 1 },
      298: { venue_id: 1 }
    },
    countrySelection: { chosenCountryId: 1 }
  }
  const store = mockStore(initialState)

  describe('state provided by the store', () => {
    it('passes down props correctly', () => {
      const connectedApp = TestUtils.renderIntoDocument(
        <Provider store={store}>
          <ConnectedPayment />
        </Provider>
      )
      const app = TestUtils.findRenderedComponentWithType(connectedApp, Payment)

      expect(app.props.selectedCourts).to.equal(initialState.booking.selectedCourts)
      expect(app.props.user).to.equal(initialState.auth.user)
      expect(app.props.loaded).to.equal(!initialState.booking.loaded)
      expect(app.props.duration).to.equal(initialState.location.query.duration)
      expect(app.props.cards).to.equal(initialState.booking.cards)
      expect(app.props.cards).to.equal(initialState.booking.cards)
      expect(app.props.selectedCard).to.equal(initialState.booking.selectedCard)
    })
  })
})
