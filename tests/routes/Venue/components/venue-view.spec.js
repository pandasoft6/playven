import React from 'react'
import VenueView from 'routes/Venue/components/VenueView'
import FontAwesome from 'react-fontawesome'
import OverviewSection from 'routes/Venue/components//OverviewSection'
import BookingSection from 'routes/Venue/containers/BookingSectionContainer'
import DetailsSection from 'routes/Venue/components//DetailsSection'
import Navigation from 'containers/Navigation'
import Payment from 'containers/Modals/Payment'

/* eslint camelcase: ["error", {properties: "never"}] */
/* global shallow */

describe('VenueView', () => {
  const props = {
    venue: {
      venue_id: 8,
      venue_name: 'Puhos Center'
    },
    imageIndex: 0,
    pathName: '8',
    displayMenu: true
  }

  const wrapper = shallow(<VenueView {...props} />)

  it('doesn\'t render loader when venue passed', () => {
    expect(wrapper.find(FontAwesome).length).to.equal(0)
  })

  it('renders loader when no venue passed', () => {
    const props2 = Object.assign({}, props, { venue: null })
    const wrapper2 = shallow(<VenueView {...props2} />)

    expect(wrapper2.find(FontAwesome).length).to.equal(1)
  })

  it('renders OverviewSection, BookingSection, DetailsSection when venue passed', () => {
    expect(wrapper.find(OverviewSection).length).to.equal(1)
    expect(wrapper.find(BookingSection).length).to.equal(1)
    expect(wrapper.find(DetailsSection).length).to.equal(1)
  })

  it('renders Navigation, NotLogged, Payment, Success', () => {
    expect(wrapper.find(Navigation).length).to.equal(1)
    expect(wrapper.find(Payment).length).to.equal(1)
  })
})
