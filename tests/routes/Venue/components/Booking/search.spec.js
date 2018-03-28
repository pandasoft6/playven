import React from 'react'
import Search from 'routes/Venue/components/Booking/Search'
import { Provider } from 'react-redux'
import Fields from 'components/SearchGrid/FormFields'
import DatePicker from 'react-datepicker'
import moment from 'moment'

/* eslint camelcase: ["error", {properties: "never"}] */
/* global configureStore mount */

describe('Search', () => {
  const componentDidMount = sinon.spy(Search.prototype, 'componentDidMount')
  const componentDidUpdate = sinon.spy(Search.prototype, 'componentDidUpdate')
  const selectSupportedSport = sinon.spy(Search.prototype, 'selectSupportedSport')
  const getSupportedSport = sinon.spy(Search.prototype, 'getSupportedSport')
  const doInitialSearchRequest = sinon.spy(Search.prototype, 'doInitialSearchRequest')
  const onSearchSubmit = sinon.spy(Search.prototype, 'onSearchSubmit')
  const sportsSupportedByVenue = sinon.spy(Search.prototype, 'sportsSupportedByVenue')
  const changeSport = sinon.spy()
  const changeDate = sinon.spy()
  const fetchSingleVenue = sinon.spy()
  const clearState = sinon.spy()
  const props = {
    venue: {
      venue_id: 8,
      venue_name: 'Puhos Center',
      supported_sports: ['squash', 'tennis']
    },
    sport: 'squash',
    date: '02/02/2017',
    sports: [{ sport: 'floorball' }, { sport: 'golf' }, { sport: 'tennis' }, { sport: 'squash' }],
    clearState,
    changeDate,
    changeSport,
    fetchSingleVenue
  }

  const mockStore = configureStore()
  const initialState = {
    i18n: { locale: 'en' }
  }
  const store = mockStore(initialState)

  const wrapper = mount(<Provider store={store}><Search {...props} /></Provider>)

  it('componentDidMount called', () => {
    expect(componentDidMount.callCount).to.equal(1)
  })

  it('doInitialSearchRequest called', () => {
    expect(doInitialSearchRequest.callCount).to.equal(1)
  })

  it('fetchSingleVenue called', () => {
    expect(fetchSingleVenue.callCount).to.equal(1)
  })

  it('changeSport called', () => {
    expect(changeSport.callCount).to.equal(1)
  })

  it('changeDate called', () => {
    expect(changeDate.callCount).to.equal(1)
  })

  it('selectSupportedSport called', () => {
    expect(selectSupportedSport.callCount).to.equal(1)
  })

  it('getSupportedSport not called when supported sport passed', () => {
    expect(getSupportedSport.callCount).to.equal(0)
  })

  it('sportsSupportedByVenue called', () => {
    expect(sportsSupportedByVenue.callCount > 0).to.equal(true)
  })

  it('renders correct chosen sport', () => {
    expect(wrapper.find(Fields.Sport).props().param).to.equal(props.sport)
  })

  it('renders correct chosen date', () => {
    expect(wrapper.find({ name: 'date' }).first().props().value).to.equal(props.date)
  })

  it('sport change triggers onSearchSubmit', () => {
    const count = JSON.stringify(onSearchSubmit.callCount)

    wrapper.find(Fields.Sport).props().onChange({ target: { value: 'tennis' } })
    expect(onSearchSubmit.callCount).to.equal(Number(count) + 1)
  })

  it('date change triggers onSearchSubmit', () => {
    const count = JSON.stringify(onSearchSubmit.callCount)
    const isDefaultPrevented = () => false

    wrapper.find({ name: 'date' }).props()
      .onChange({ target: { value: '10/11/2017' }, isDefaultPrevented })
    expect(onSearchSubmit.callCount).to.equal(Number(count) + 1)
  })

  it('renders datepicker with limit 365 days in the future if no booking_ahead_limit', () => {
    expect(wrapper.find(DatePicker).props().maxDate.format('DD/MM/YYYY'))
      .to.equal(moment().add(365, 'days').format('DD/MM/YYYY'))
  })

  it('renders datepicker with limit 30 days in the future if booking_ahead_limit = 30', () => {
    const venue2 = {
      venue_id: 8,
      venue_name: 'Puhos Center',
      supported_sports: ['squash', 'tennis'],
      booking_ahead_limit: 30
    }
    const props2 = Object.assign({}, props, { venue: venue2 })
    const wrapper2 = mount(<Provider store={store}><Search {...props2} /></Provider>)

    expect(wrapper2.find(DatePicker).props().maxDate.format('DD/MM/YYYY'))
      .to.equal(moment().add(venue2.booking_ahead_limit, 'days').format('DD/MM/YYYY'))
  })

  it('prevents from choosing date that exceed allowed maxDate', () => {
    const count = JSON.stringify(onSearchSubmit.callCount)
    const isDefaultPrevented = () => false

    wrapper.find({ name: 'date' }).props()
      .onChange({ target: { value: '10/11/2019' }, isDefaultPrevented })
    expect(onSearchSubmit.callCount).to.equal(Number(count))
  })

  it('componentDidUpdate called', () => {
    wrapper.setProps({ sport: 'tennis' })
    expect(componentDidUpdate.callCount).to.equal(1)
  })

  it('getSupportedSport called when not supported sport passed', () => {
    const props2 = Object.assign({}, props, { sport: 'golf' })

    mount(<Provider store={store}><Search {...props2} /></Provider>)

    expect(getSupportedSport.callCount).to.equal(1)
  })

  it('getSupportedSport returns null when no supported_sports', () => {
    const props2 = Object.assign({}, props, { venue: {
      venue_id: 8,
      venue_name: 'Puhos Center',
      supported_sports: []
    } })

    mount(<Provider store={store}><Search {...props2} /></Provider>)

    expect(getSupportedSport.callCount).to.equal(2)
  })
})
