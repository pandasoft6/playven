import React from 'react'
import BookingSection from 'routes/Venue/components/BookingSection'
import Availability from 'routes/Venue/containers/Booking/AvailabilityContainer'
import Search from 'routes/Venue/containers/Booking/SearchContainer'

/* eslint camelcase: ["error", {properties: "never"}] */
/* global shallow */

describe('BookingSection', () => {
  const slots = [
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


  const props = {
    venue: {
      venue_id: 8,
      venue_name: 'Puhos Center'
    },
    displayBookingResults: true,
    loading: false,
    selectedCourts: [],
    slots
  }

  const wrapper = shallow(<BookingSection {...props} />)

  it('renders Search', () => {
    expect(wrapper.find(Search).length).to.equal(1)
  })

  it('doesn\'t render Availability when displayBookingResults: false', () => {
    const props2 = Object.assign({}, props, { displayBookingResults: false })
    const wrapper2 = shallow(<BookingSection {...props2} />)

    expect(wrapper2.find(Availability).length).to.equal(0)
  })

  it('renders Availability when displayBookingResults: true', () => {
    expect(wrapper.find(Availability).length).to.equal(1)
  })
})
