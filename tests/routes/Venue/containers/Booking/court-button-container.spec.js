import React from 'react'
import CourtButton from 'routes/Venue/containers/Booking/CourtButtonContainer'
import { onCourtSelect } from 'actions/booking-actions'

/* global shallow configureStore*/

describe('CourtButtonContainer', () => {
  const mockStore = configureStore()

  const store = mockStore({})
  const wrapper = shallow(<CourtButton store={store} />)

  it('passes props correctly', () => {
    expect(wrapper.props().onCourtSelect()).to.deep.equal(onCourtSelect())
  })
})
