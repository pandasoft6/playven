import React from 'react'
import AvailableCourtsColumn from 'routes/Venue/components/Booking/AvailableCourtsColumn'
import CourtGridItem from 'routes/Venue/containers/Booking/CourtGridItemContainer'
import { createPossibleStartingTimes } from 'routes/Venue/components/Booking/AvailableCourtsGrid'

/* eslint camelcase: ["error", {properties: "never"}] */
/* global shallow */
/* eslint max-len: ["error", { "ignoreStrings": true }] */

describe('AvailableCourtsColumn', () => {
  const props = {
    availableTimes: [
      {
        duration: 60,
        ends_at: '2017-02-06T17:00:00.000+02:00',
        price: 14.5,
        starts_at: '2017-02-06T16:00:00.000+02:00'
      },
      {
        duration: 60,
        ends_at: '2017-02-06T18:00:00.000+02:00',
        price: 14.5,
        starts_at: '2017-02-06T17:00:00.000+02:00'
      }
    ],
    court: {
      active: true,
      court_description: '',
      created_at: '2016-12-01T14:37:19.874Z',
      custom_sport_name: null,
      duration_policy: 'one_hour',
      id: 304,
      index: 4,
      indoor: true,
      minimum_duration: 60,
      name: 'Indoor 4',
      payment_skippable: true,
      sport_name: 'badminton',
      start_time_policy: 'hour_mark',
      surface: 'hard_court',
      updated_at: '2016-12-01T14:37:19.874Z',
      venue_id: 35
    },
    courtData: {
      id: 304,
      available_times: [
        {
          duration: 60,
          ends_at: '2017-02-06T17:00:00.000+02:00',
          price: 14.5,
          starts_at: '2017-02-06T16:30:00.000+02:00'
        },
        {
          duration: 60,
          ends_at: '2017-02-06T18:00:00.000+02:00',
          price: 14.5,
          starts_at: '2017-02-06T17:00:00.000+02:00'
        }
      ]
    },
    earliestTimeSlot: 'hz',
    hourlyGrid: false,
    selectedCourts: [{ id: 304, startTime: '17:00' }],
    venue: {
      id: 35,
      opening_local: '2017-02-06T07:00:00.000+02:00',
      closing_local: '2017-02-06T23:30:00.000+02:00'
    }
  }

  const wrapper = shallow(<AvailableCourtsColumn {...props} />)

  it('renders correct number of CourtGridItem', () => {
    expect(wrapper.find(CourtGridItem).length)
      .to.equal(createPossibleStartingTimes(props.court, props.venue).length)
  })

  it('renders correct number of available CourtGridItem', () => {
    expect(wrapper.find(CourtGridItem).find({ type: 'available' }).length)
      .to.equal(props.availableTimes.length)
  })

  it('renders correct number of booked CourtGridItem', () => {
    const allItems = wrapper.find(CourtGridItem)

    expect(allItems.find({ type: 'booked' }).length)
      .to.equal(allItems.length - props.availableTimes.length)
  })

  it('renders space before CourtGridItem when venueOpeningMinutes = 0 and start_time_policy === half_hour_mark', () => {
    const props2 = Object.assign({}, props, { venue: {
      id: 35,
      opening_local: '2017-02-06T07:30:00.000+02:00',
      closing_local: '2017-02-06T23:30:00.000+02:00'
    } })

    const wrapper2 = shallow(<AvailableCourtsColumn {...props2} />)

    expect(wrapper2.find(CourtGridItem).first().props().duration).to.equal(30)
    expect(wrapper2.find(CourtGridItem).first().props().type).to.equal('unavailable')
  })
})
