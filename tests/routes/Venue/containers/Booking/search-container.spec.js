import React from 'react'
import Search from 'routes/Venue/containers/Booking/SearchContainer'
import {
  changeDate,
  changeSport,
  clearState
} from 'actions/booking-actions'

/* eslint camelcase: ["error", {properties: "never"}] */
/* global shallow configureStore*/

describe('SearchContainer', () => {
  const mockStore = configureStore()
  const initialState = {
    venues: {
      allSports: [
        {
          sport: 'floorball',
          localized_name: 'Floorball'
        },
        {
          sport: 'squash',
          localized_name: 'Squash'
        }
      ]
    },
    booking: {
      sport: 'squash',
      date: '31/01/2017'
    }
  }

  const store = mockStore(initialState)
  const wrapper = shallow(<Search store={store} />)

  it('passes props correctly', () => {
    expect(wrapper.props().sports).to.deep.equal(initialState.venues.allSports)
    expect(wrapper.props().sport).to.deep.equal(initialState.booking.sport)
    expect(wrapper.props().date).to.deep.equal(initialState.booking.date)
    expect(wrapper.props().changeDate()).to.deep.equal(changeDate())
    expect(wrapper.props().changeSport()).to.deep.equal(changeSport())
    expect(wrapper.props().clearState()).to.deep.equal(clearState())
  })
})
