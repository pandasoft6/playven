import React from 'react'
import DetailsSection from 'routes/Venue/components/DetailsSection'
import About from 'routes/Venue/components/Details/About'
import Hours from 'routes/Venue/components/Details/Hours'
import Map from 'routes/Venue/components/Details/Map'
import { Provider } from 'react-redux'
import moment from 'moment'

/* eslint camelcase: ["error", {properties: "never"}] */
/* global configureStore mount */

describe('DetailsSection', () => {
  const props = {
    venue: {
      venue_id: 8,
      venue_name: 'Puhos Center',
      business_hours: {
        mon: { opening: 25200, closing: 75600 },
        tue: { opening: 25200, closing: 75600 },
        wed: { opening: 25200, closing: 75600 },
        thu: { opening: 25200, closing: 75600 },
        fri: { opening: 25200, closing: 75600 },
        sat: { opening: 36000, closing: 75600 },
        sun: { opening: 36000, closing: 75600 }
      },
      longitude: 25.0006762,
      latitude: 60.1859158,
      description: 'Here should be very looooong description.'
    }
  }

  const mockStore = configureStore()
  const initialState = {
    i18n: {
      locale: 'en'
    }
  }

  const store = mockStore(initialState)
  const covertSeconds = seconds => moment().startOf('day').seconds(seconds).format('HH:mm')

  const wrapper = mount(<Provider store={store}><DetailsSection {...props} /></Provider>)

  it('renders Map with correct longitude and latitude', () => {
    expect(wrapper.find(Map).find('.venue-map__container').childAt(0).props().src)
      .to.contain(props.venue.longitude)
    expect(wrapper.find(Map).find('.venue-map__container').childAt(0).props().src)
      .to.contain(props.venue.latitude)
  })

  it('renders About with correct description', () => {
    expect(wrapper.find(About).childAt(1).text()).to.equal(props.venue.description)
  })

  describe('renders correct Hours', () => {
    it('renders 7 day abbreviations', () => {
      expect(wrapper.find(Hours).find('.mrs').children().length).to.equal(7)
    })

    it('renders correct number of opening and closing times', () => {
      expect(wrapper.find(Hours).childAt(1).childAt(1).children().length)
        .to.equal(Object.keys(props.venue.business_hours).length)
    })


    it('renders correct opening and closing times', () => {
      expect(wrapper.find(Hours).childAt(1).childAt(1).childAt(0).text())
        .to.contain(covertSeconds(props.venue.business_hours.mon.opening))
      expect(wrapper.find(Hours).childAt(1).childAt(1).childAt(0).text())
        .to.contain(covertSeconds(props.venue.business_hours.mon.closing))

      expect(wrapper.find(Hours).childAt(1).childAt(1).childAt(6).text())
        .to.contain(covertSeconds(props.venue.business_hours.sun.opening))
      expect(wrapper.find(Hours).childAt(1).childAt(1).childAt(6).text())
        .to.contain(covertSeconds(props.venue.business_hours.sun.closing))
    })
  })
})
