import React from 'react'
import Overview from 'routes/Venue/components/OverviewSection'
import Images from 'routes/Venue/components/Overview/Images'
import Information from 'routes/Venue/components/Overview/Information'
import PriceRange from 'routes/Venue/components/Overview/PriceRange'

/* eslint camelcase: ["error", {properties: "never"}] */
/* global mount */
/* eslint max-len: ["error", { "ignoreStrings": true }] */

describe('OverviewSection', () => {
  const props = {
    venue: {
      venue_id: 8,
      venue_name: 'Puhos Center',
      highprice: 20,
      lowprice: 15,
      images: [
        {
          image_url: 'http://test-images.ampersports.com.s3.amazonaws.com/photos/images/000/000/021/medium/puhos_center.jpg?1485218074'
        }
      ],
      street: 'Kulosaarentie 2',
      city: 'Helsinki',
      zip: '00570',
      phone_number: '83943490823',
      website: 'www.puhoscenter.fi',
      parking_info: 'Paikkoja hallin edessä',
      transit_info: ''
    }
  }

  const wrapper = mount(<Overview {...props} />)

  it('renders correct venue name', () => {
    expect(wrapper.find('.text-center').text()).to.equal(props.venue.venue_name)
  })

  it('renders correct venue information', () => {
    expect(wrapper.find(Information).childAt(0).text())
      .to.contain(props.venue.street)
    expect(wrapper.find(Information).childAt(0).text())
      .to.contain(props.venue.zip)
    expect(wrapper.find(Information).childAt(0).text())
      .to.contain(props.venue.city)

    expect(wrapper.find(Information).childAt(1).text())
      .to.equal(props.venue.phone_number)

    expect(wrapper.find(Information).childAt(2).text())
      .to.contain(props.venue.website)

    expect(wrapper.find(Information).childAt(3).text())
      .to.contain(props.venue.parking_info)

    expect(wrapper.find(Information).childAt(4).text())
      .to.contain(props.venue.transit_info)
  })

  it('renders correct low and high prices', () => {
    expect(wrapper.find(PriceRange).find('.price').find('.price__amount').first().text())
      .to.equal(String(props.venue.lowprice))
    expect(wrapper.find(PriceRange).find('.price').find('.price__amount').last().text())
      .to.equal(String(props.venue.highprice))
  })

  it('renders correct images', () => {
    expect(wrapper.find(Images).find('.venue-images__image').props().style.backgroundImage)
      .to.contain(props.venue.images[0].image_url)

    expect(wrapper.find(Images).find('.venue-images__image-container').length)
      .to.equal(props.venue.images.length)
  })
})
