import React from 'react'
import VenueView from 'routes/Venue/containers/VenueViewContainer'

/* eslint camelcase: ["error", {properties: "never"}] */
/* global shallow configureStore */

describe('VenueViewContainer', () => {
  const mockStore = configureStore()
  const initialState = {
    booking: {
      selectedCourts: []
    },
    venue: {
      venue: {
        venue_id: 8,
        venue_name: 'Puhos Center'
      },
      imageIndex: 0
    },
    routing: {
      locationBeforeTransitions: {
        pathname: '/venues/8'
      }
    },
    languageSelection: {
      showing: true
    }
  }
  const store = mockStore(initialState)
  const wrapper = shallow(<VenueView store={store} />)

  it('passes props correctly', () => {
    expect(wrapper.props().venue).to.deep.equal(initialState.venue.venue)
    expect(wrapper.props().imageIndex).to.deep.equal(initialState.venue.imageIndex)
    expect(wrapper.props().pathName)
      .to.deep.equal(initialState.routing.locationBeforeTransitions.pathname.split('/')[2])
  })
})
