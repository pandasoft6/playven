import React from 'react'
import Availability from 'routes/Venue/containers/Booking/AvailabilityContainer'
import { setAvailabilityView } from 'actions/booking-actions'

/* eslint camelcase: ["error", {properties: "never"}] */
/* global shallow configureStore*/

describe('AvailabilityContainer', () => {
  const mockStore = configureStore()
  const initialState = {
    booking: {
      availabilityView: 'grid'
    },
    allCourts: { 301: { id: 301 } },
    venues: {
      allVenuesById: { 35: { id: 35 } }
    },
    venue: {
      currency_unit: '€'
    }
  }

  const store = mockStore(initialState)
  const wrapper = shallow(<Availability store={store} />)

  it('passes props correctly', () => {
    expect(wrapper.props().availabilityView).to.deep.equal(initialState.booking.availabilityView)
    expect(wrapper.props().setAvailabilityView()).to.deep.equal(setAvailabilityView())
    expect(wrapper.props().allCourts).to.deep.equal(initialState.allCourts)
    expect(wrapper.props().allVenuesById).to.deep.equal(initialState.venues.allVenuesById)
  })
})
