import React from 'react'
import CourtGridItem from 'routes/Venue/components/Booking/CourtGridItem'

/* eslint camelcase: ["error", {properties: "never"}] */
/* global shallow */

describe('CourtGridItem', () => {
  it('returns Booked when type: booked', () => {
    const wrapper = shallow(<CourtGridItem type="booked" />)

    expect(wrapper.children().props().children.props.text).to.equal('pages.venues.booked')
    expect(wrapper.props().className).to.contain('grid-court-booked')
  })

  it('returns Unavailable when type: unavailable', () => {
    const wrapper = shallow(<CourtGridItem type="unavailable" />)

    expect(wrapper.props().className).to.contain('grid-court-unavailable')
  })

  it('returns null when type: overlapping', () => {
    const wrapper = shallow(<CourtGridItem type="overlapping" />)

    expect(wrapper.html()).to.equal(null)
  })

  it('renders correct time and endTime', () => {
    const props = {
      court: {
        duration: 60,
        id: 44,
        name: 'Indoor 4',
        payment_skippable: true,
        price: 20,
        start_time: '17:00'
      },
      time: '17:00',
      duration: 60,
      selectedCourts: []
    }
    const wrapper = shallow(<CourtGridItem {...props} />)

    expect(wrapper.find('.time').childAt(0).text()).to.equal(props.time)
    expect(wrapper.find('.time').childAt(2).text()).to.equal('18:00')
  })

  describe('onCourtSelect click', () => {
    const props = {
      court: {
        duration: 60,
        id: 44,
        name: 'Indoor 4',
        payment_skippable: true,
        price: 12.5,
        start_time: '17:00'
      },
      slot: {
        duration: 60,
        ends_at: '2017-02-06T18:00:00.000+02:00',
        price: 12.5,
        starts_at: '2017-02-06T17:00:00.000+02:00'
      },
      time: '17:00',
      duration: 60,
      selectedCourts: [],
      currency: '$'
    }
    const onCourtSelect = sinon.spy()
    const wrapper = shallow(<CourtGridItem {...props} onCourtSelect={onCourtSelect} />)

    wrapper.simulate('click')

    it('called one time', () => {
      expect(onCourtSelect.callCount).to.equal(1)
    })

    it('called with correct payload', () => {
      const payload = Object.assign(
        { ...props.slot },
        { court: props.court },
        { currency: props.currency }
      )

      expect(onCourtSelect.args[0][0]).to.deep.equal(payload)
    })

    it('calls onCourtDeselect when court is selected with correct payload', () => {
      const onCourtDeselect = sinon.spy()
      const wrapper2 = shallow(
        <CourtGridItem
          {...props}
          isCurrentlySelected={true}
          onCourtDeselect={onCourtDeselect} />
      )

      wrapper2.simulate('click')

      expect(onCourtDeselect.callCount).to.equal(1)
      expect(onCourtDeselect.args[0][0]).to.deep.equal(props.court.id, props.time)
    })

    it('calls onCourtDeselect on previous court when overlapping court is selected', () => {
      const onCourtDeselect = sinon.spy()
      const selectedCourts = [
        { id: 44, startTime: '17:30', duration: 60 },
        { id: 43, startTime: '17:30', duration: 60 }
      ]
      const props2 = Object.assign({}, props, { selectedCourts })
      const wrapper2 = shallow(
        <CourtGridItem
          {...props2}
          onCourtDeselect={onCourtDeselect}
          onCourtSelect={onCourtSelect} />)

      wrapper2.simulate('click')

      expect(onCourtDeselect.args[0][0])
        .to.deep.equal(selectedCourts[0].id, selectedCourts[0].startTime)
    })
  })
})
