import React from 'react'
import AvailableCourtsRow from 'routes/Venue/components/Booking/AvailableCourtsRow'
import CourtButton from 'routes/Venue/containers/Booking/CourtButtonContainer'
import CourtsCarousel from 'routes/Venue/components/Booking/CourtsCarousel'

/* eslint camelcase: ["error", {properties: "never"}] */
/* global shallow */

describe('AvailableCourtsRow', () => {
  const props = {
    time: '15:30',
    allCourts: {
      301: {
        id: 301
      },
      302: {
        id: 302
      }
    },
    availableTimes: [
      {
        duration: 60,
        ends_at: '2017-02-06T16:30:00.000+02:00',
        id: 301,
        price: 14.5,
        starts_at: '2017-02-06T15:30:00.000+02:00'
      },
      {
        duration: 60,
        ends_at: '2017-02-06T16:30:00.000+02:00',
        id: 302,
        price: 20,
        starts_at: '2017-02-06T15:30:00.000+02:00'
      }
    ],
    selectedCourts: [
      { id: 44, startTime: '17:30', duration: 60 },
      { id: 301, startTime: '17:30', duration: 60 }
    ],
    venue: {
      currency_unit: '€'
    }
  }
  const wrapper = shallow(<AvailableCourtsRow {...props} />)

  it('renders correct lowest_price', () => {
    const allPricesInThisRow = props.availableTimes.map(data => data.price)
    const lowestPrice = Math.min(...allPricesInThisRow)

    expect(wrapper.childAt(0).props().children.props.amount).to.equal(lowestPrice)
  })

  it('renders correct start time', () => {
    expect(wrapper.childAt(1).text()).to.equal(props.time)
  })

  it('renders CourtsCarousel', () => {
    expect(wrapper.find(CourtsCarousel).length).to.equal(1)
  })

  it('renders correct number of slots when all available', () => {
    expect(wrapper.find(CourtButton).length).to.equal(props.availableTimes.length)
  })
})
