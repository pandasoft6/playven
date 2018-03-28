import {
  ON_VENUE_PAGE_LOAD,
  CHANGE_IMAGE,
  onVenueLoad,
  changeImage,
  default as venueReducer
} from 'routes/Venue/modules/venue'

/* eslint camelcase: ["error", {properties: "never"}] */

describe('(Redux Module) Venue', () => {
  it('Should export a constant ON_VENUE_PAGE_LOAD.', () => {
    expect(ON_VENUE_PAGE_LOAD).to.equal('ON_VENUE_PAGE_LOAD')
  })

  describe('onVenueLoad action', () => {
    it('has the correct type', () => {
      const action = onVenueLoad()

      expect(action.type).to.equal(ON_VENUE_PAGE_LOAD)
    })

    it('has the correct payload', () => {
      const action = onVenueLoad({ venue_id: 8, venue_name: 'Puhos Center' })

      expect(action.venue).to.deep.equal({ venue_id: 8, venue_name: 'Puhos Center' })
    })
  })

  it('Should export a constant CHANGE_IMAGE.', () => {
    expect(CHANGE_IMAGE).to.equal('CHANGE_IMAGE')
  })

  describe('changeImage action', () => {
    it('has the correct type', () => {
      const action = changeImage()

      expect(action.type).to.equal(CHANGE_IMAGE)
    })

    it('has the correct payload', () => {
      const action = changeImage({ imageIndex: 4 })

      expect(action.payload).to.deep.equal({ imageIndex: 4 })
    })
  })


  describe('reducer', () => {
    it('should add venue on ON_VENUE_PAGE_LOAD', () => {
      const state = {
        venue: null
      }

      expect(venueReducer(state, {
        type: 'ON_VENUE_PAGE_LOAD',
        venue: { venue_id: 8, venue_name: 'Puhos Center' }
      }))
      .to.deep.equal({
        venue: { venue_id: 8, venue_name: 'Puhos Center' }
      })
    })

    it('should change imageIndex on CHANGE_IMAGE', () => {
      const state = {
        imageIndex: 1
      }

      expect(venueReducer(state, { type: 'CHANGE_IMAGE', payload: 2 }))
        .to.deep.equal({
          imageIndex: 2
        })
    })
  })
})
