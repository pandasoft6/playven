import React from 'react'
import CourtButton from 'routes/Venue/components/Booking/CourtButton'

/* eslint camelcase: ["error", {properties: "never"}] max-nested-callbacks: ["error", 5] */
/* global shallow */

describe('CourtButton', () => {
  const props = {
    className: '',
    court: {
      id: 41,
      price: 10,
      name: 'Indoor 1',
      duration: 30,
      payment_skippable: true,
      start_time: '07:00'
    },
    selected: false,
    time: '07:00',
    duration: 30,
    courtData: {
      court: {
        id: 41,
        price: 10,
        name: 'Indoor 1',
        duration: 30,
        payment_skippable: true,
        start_time: '07:00'
      },
      duration: 30,
      ends_at: '2017-02-06T07:00:00.000+02:00',
      id: 41,
      price: 10,
      starts_at: '2017-02-06T07:00:00.000+02:00'
    }
  }

  const wrapper = shallow(<CourtButton {...props} />)

  describe('when className empty and selected: false', () => {
    it('has correct className', () => {
      expect(wrapper.props().className).to.equal('court-button flex-row  ')
    })

    it('has correct priceTheme', () => {
      expect(wrapper.children().last().props().theme).to.equal('')
    })

    it('renders duration', () => {
      expect(wrapper.find('.duration').length).to.equal(1)
    })

    it('doesn\'t render start and end time', () => {
      expect(wrapper.find('[className="flex-row time"]').childAt(0))
        .not.to.contain(props.court.start_time)
    })
  })

  describe('when className empty and selected: true', () => {
    const onCourtDeselect = sinon.spy()

    const props2 = Object.assign({}, props, { selected: true })
    const wrapper2 = shallow(<CourtButton {...props2} onCourtDeselect={onCourtDeselect} />)

    it('has correct className', () => {
      expect(wrapper2.props().className).to.equal('court-button flex-row  court-button-selected')
    })

    it('has correct priceTheme', () => {
      expect(wrapper2.children().last().props().theme).to.equal('')
    })

    it('renders duration', () => {
      expect(wrapper2.find('.duration').length).to.equal(1)
    })

    it('doesn\'t render start and end time', () => {
      expect(wrapper2.find('[className="flex-row time"]').childAt(0))
        .not.to.contain(props.court.start_time)
    })

    describe('call onCourtDeselect when click on selected', () => {
      wrapper2.simulate('click')
      it('called one time', () => {
        expect(onCourtDeselect.callCount).to.equal(1)
      })

      it('called with correct payload', () => {
        expect(onCourtDeselect.args[0][0]).to.equal(props.courtData.court.id, props.time)
      })
    })
  })

  it('renders correct priceTheme when className: not-selectable', () => {
    const props2 = Object.assign({}, props, { className: 'not-selectable' })
    const wrapper2 = shallow(<CourtButton {...props2} />)

    expect(wrapper2.children().last().props().theme).to.equal('grey')
  })

  describe('renders correct court info', () => {
    it('renders correct court name', () => {
      expect(wrapper.find('.name').text()).to.equal(props.court.name)
    })

    it('renders correct price', () => {
      expect(wrapper.children().last().props().amount).to.equal(props.court.price)
    })

    it('renders correct duration', () => {
      expect(wrapper.find('.duration').text()).to.contain(props.court.duration)
    })
  })


  describe('onCourtSelect click', () => {
    const onCourtSelect = sinon.spy()
    const wrapper2 = shallow(<CourtButton {...props} onCourtSelect={onCourtSelect} />)

    wrapper2.simulate('click')

    it('called one time', () => {
      expect(onCourtSelect.callCount).to.equal(1)
    })

    it('called with correct payload', () => {
      expect(onCourtSelect.args[0][0]).to.equal(props.courtData, props.time)
    })
  })
})
