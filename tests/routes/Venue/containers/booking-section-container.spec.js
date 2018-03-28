import React from 'react'
import BookingSection from 'routes/Venue/containers/BookingSectionContainer'

/* eslint camelcase: ["error", {properties: "never"}] */
/* global shallow configureStore */

describe('BookingSectionContainer', () => {
  const mockStore = configureStore()
  const initialState = {
    booking: {
      displayBookingResults: true,
      loaded: true,
      selectedCourts: [],
      slots: [
        {
          id: 304,
          available_times: [
            {
              starts_at: '2017-02-06T12:00:00.000+02:00',
              ends_at: '2017-02-06T13:00:00.000+02:00',
              duration: 60,
              price: 12.5
            }
          ]
        }
      ]
    }
  }

  const store = mockStore(initialState)
  const wrapper = shallow(<BookingSection store={store} />)

  it('passes props correctly', () => {
    expect(wrapper.props().displayBookingResults)
      .to.deep.equal(initialState.booking.displayBookingResults)
    expect(wrapper.props().selectedCourts).to.deep.equal(initialState.booking.selectedCourts)
    expect(wrapper.props().loading).to.equal(!initialState.booking.loaded)
    expect(wrapper.props().slots).to.deep.equal(initialState.booking.slots)
  })
})
