import React from 'react'
import Availability from 'routes/Venue/components/Booking/Availability'
import FontAwesome from 'react-fontawesome'
import AvailableCourtsRow from 'routes/Venue/components/Booking/AvailableCourtsRow'
import AvailableCourtsGrid from 'routes/Venue/components/Booking/AvailableCourtsGrid'

/* eslint camelcase: ["error", {properties: "never"}] */
/* global shallow */

describe('Availability', () => {
  const props = {
    allCourts: {
      304: {
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
      305: {
        active: true,
        court_description: '',
        created_at: '2016-12-01T14:37:19.874Z',
        custom_sport_name: null,
        duration_policy: 'one_hour',
        id: 304,
        index: 4,
        indoor: true,
        minimum_duration: 60,
        name: 'Indoor 3',
        payment_skippable: true,
        sport_name: 'badminton',
        start_time_policy: 'hour_mark',
        surface: 'hard_court',
        updated_at: '2016-12-01T14:37:19.874Z',
        venue_id: 35
      },
      306: {
        active: true,
        court_description: '',
        created_at: '2016-12-01T14:37:19.874Z',
        custom_sport_name: null,
        duration_policy: 'one_hour',
        id: 304,
        index: 4,
        indoor: true,
        minimum_duration: 60,
        name: 'Outdoor 3',
        payment_skippable: true,
        sport_name: 'badminton',
        start_time_policy: 'hour_mark',
        surface: 'hard_court',
        updated_at: '2016-12-01T14:37:19.874Z',
        venue_id: 35
      }
    },
    allVenuesById: {
      304: {
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
      },
      305: {
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
      },
      306: {
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
    loading: false,
    selectedCourts: [],
    slots: [
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
      },
      {
        id: 305,
        available_times: [
          {
            starts_at: '2017-02-06T12:00:00.000+02:00',
            ends_at: '2017-02-06T13:00:00.000+02:00',
            duration: 60,
            price: 12.5
          }
        ]
      },
      {
        id: 306,
        available_times: [
          {
            starts_at: '2017-02-06T12:00:00.000+02:00',
            ends_at: '2017-02-06T13:00:00.000+02:00',
            duration: 60,
            price: 12.5
          }
        ]
      }
    ],
    availabilityView: 'grid'
  }

  const wrapper = shallow(<Availability {...props} />)


  it('renders spinner when loading: true', () => {
    const props2 = Object.assign({}, props, { loading: true })
    const wrapper2 = shallow(<Availability {...props2} />)

    expect(wrapper2.find(FontAwesome).length).to.equal(1)
  })

  it('doesn\'t render spinner when loading: false', () => {
    expect(wrapper.find(FontAwesome).length).to.equal(0)
  })

  it('renders no available slots when slots.length === 0', () => {
    const props2 = Object.assign({}, props, { slots: [] })
    const wrapper2 = shallow(<Availability {...props2} />)

    expect(wrapper2.find('div.pvt').props().children.props.text)
      .to.equal('modals.booking.error')
    expect(wrapper2.find('p.pvt').first().props().children.props.text)
      .to.equal('modals.booking.info_1')
    expect(wrapper2.find('p.pvt').last().props().children.props.text)
      .to.equal('modals.booking.info_2')
  })

  describe('availabilityView: grid', () => {
    it('renders correct backgroundColor', () => {
      expect(wrapper.props().className).to.equal(null)
    })

    it('renders correct selected view button', () => {
      expect(wrapper.find('[className="mrs mvm"]').childAt(0).props().className)
        .to.contain('color-grey-600')
      expect(wrapper.find('[className="mrm mlt mvm"]').childAt(0).props().className)
        .to.contain('color-turquoise')
    })

    it('renders AvailableCourtsGrid', () => {
      expect(wrapper.find(AvailableCourtsGrid).length).to.equal(1)
    })
  })

  describe('availabilityView: compact', () => {
    const props2 = Object.assign({}, props, { availabilityView: 'compact' })
    const wrapper2 = shallow(<Availability {...props2} />)

    it('renders correct backgroundColor', () => {
      expect(wrapper2.props().className).to.equal('color-bg-grey-100')
    })

    it('renders correct selected view button', () => {
      expect(wrapper2.find('[className="mrs mvm"]').childAt(0).props().className)
        .to.contain('color-turquoise')
      expect(wrapper2.find('[className="mrm mlt mvm"]').childAt(0).props().className)
        .to.contain('color-grey-600')
    })

    it('renders correct number of AvailableCourtsGrid', () => {
      expect(wrapper2.find(AvailableCourtsRow).length).to.equal(1)
    })
  })

  it('compact icon click triggers setAvailabilityView with correct payload', () => {
    const setAvailabilityView = sinon.spy()
    const wrapper2 = shallow(<Availability {...props} setAvailabilityView={setAvailabilityView} />)

    wrapper2.find({ className: 'mrs mvm' }).simulate('click')
    expect(setAvailabilityView.callCount).to.equal(1)
    expect(setAvailabilityView.args[0][0]).to.equal('compact')
  })

  it('grid icon click triggers setAvailabilityView with correct payload', () => {
    const setAvailabilityView = sinon.spy()
    const wrapper2 = shallow(<Availability {...props} setAvailabilityView={setAvailabilityView} />)

    wrapper2.find({ className: 'mrm mlt mvm' }).simulate('click')
    expect(setAvailabilityView.callCount).to.equal(1)
    expect(setAvailabilityView.args[0][0]).to.equal('grid')
  })
})
