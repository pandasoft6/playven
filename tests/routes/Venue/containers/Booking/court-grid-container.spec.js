import React from 'react'
import CourtGridItem from 'routes/Venue/containers/Booking/CourtGridItemContainer'
import { onCourtSelect, onCourtDeselect } from 'actions/booking-actions'

/* global shallow configureStore*/

describe('CourtGridItemContainer', () => {
  const mockStore = configureStore()
  const initialState = {
    booking: {
      selectedCourts: [{ id: 1 }]
    }
  }

  const store = mockStore(initialState)
  const wrapper = shallow(<CourtGridItem store={store} />)

  it('passes props correctly', () => {
    expect(wrapper.props().selectedCourts).to.deep.equal(initialState.booking.selectedCourts)
    expect(wrapper.props().onCourtSelect()).to.deep.equal(onCourtSelect())
    expect(wrapper.props().onCourtDeselect()).to.deep.equal(onCourtDeselect())
  })
})
