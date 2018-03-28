import React from 'react'
import AvailableCourtsGrid from 'routes/Venue/components/Booking/AvailableCourtsGrid'
import AvailableCourtsColumn from 'routes/Venue/components/Booking/AvailableCourtsColumn'
import Slider from 'react-slick'
import { createPossibleStartingTimes } from 'routes/Venue/components/Booking/AvailableCourtsGrid'

/* eslint camelcase: ["error", {properties: "never"}] */
/* global shallow */

describe('AvailableCourtsGrid', () => {
  const props = {
    allCourts: {
      55: {
        active: true,
        court_description: '',
        created_at: '2016-11-04T10:49:44.416Z',
        custom_sport_name: null,
        duration_policy: 'one_hour',
        id: 55,
        index: 1,
        indoor: true,
        minimum_duration: 60,
        name: 'Indoor 1',
        payment_skippable: true,
        sport_name: 'squash',
        start_time_policy: 'any_start_time',
        surface: 'hard_court',
        updated_at: '2016-11-04T10:49:44.416Z',
        venue_id: 11
      }
    },
    allVenuesById: {
      11: {
        city: 'Espoo',
        closing_local: '2017-02-07T21:00:00.000+02:00',
        id: 11,
        image: `http://test-images.ampersports.com.s3.amazonaws.com/photos/images/000/000/023/
          medium/3a-sport_kuva.png?1485218098`,
        opening_local: '2017-02-07T15:00:00.000+02:00',
        phone_number: '09 - 8592662',
        street: 'Sokinsuonkuja 4',
        url: '/api/venues/11.json',
        venue_name: '3A-Sport Liikuntakeskus',
        website: 'www.3asport.fi',
        zip: '02760'
      }
    },
    selectedCourts: [0],
    slots: [
      {
        id: 55,
        available_times: [
          {
            duration: 60,
            ends_at: '2017-02-07T16:00:00.000+02:00',
            price: 9,
            starts_at: '2017-02-07T15:00:00.000+02:00'
          },
          {
            duration: 60,
            ends_at: '2017-02-07T17:00:00.000+02:00',
            price: 9,
            starts_at: '2017-02-07T16:00:00.000+02:00'
          }
        ]
      }
    ]
  }

  const wrapper = shallow(<AvailableCourtsGrid {...props} />)

  it('renders Slider', () => {
    expect(wrapper.find(Slider).length).to.equal(1)
  })

  it('renders correct number AvailableCourtsColumn', () => {
    expect(wrapper.find(AvailableCourtsColumn).length).to.equal(props.slots.length)
  })

  it('Slider renders correct number of Slides', () => {
    expect(wrapper.children().last().children().first().props().slidesToShow)
      .to.equal(props.slots.length)
  })

  describe('time table', () => {
    it('renders correct number of times', () => {
      expect(wrapper.find({ className: 'grid-times mhs t6 text-center' }).children().length)
        .to.equal(createPossibleStartingTimes(null, props.allVenuesById[11], 30).length)
    })
  })
})
