import {
  ON_CANCEL_RESERVATION_SUCCESS,
  cancelReservationSuccess,
  default as profileReducer
} from 'routes/Profile/modules/profile'

/* eslint camelcase: ["error", {properties: "never"}] */

describe('(Redux Module) Profile', () => {
  it('Should export a constant ON_CANCEL_RESERVATION_SUCCESS.', () => {
    expect(ON_CANCEL_RESERVATION_SUCCESS).to.equal('ON_CANCEL_RESERVATION_SUCCESS')
  })

  describe('cancelReservationSuccess action', () => {
    it('has the correct type', () => {
      const action = cancelReservationSuccess()

      expect(action.type).to.equal(ON_CANCEL_RESERVATION_SUCCESS)
    })

    it('has the correct payload', () => {
      const action = cancelReservationSuccess({ id: 3345, booking_type: 'online' })

      expect(action.payload).to.deep.equal({ id: 3345, booking_type: 'online' })
    })
  })

  describe('reducer', () => {
    it('should return new reservations on ON_CANCEL_RESERVATION_SUCCESS', () => {
      const state = {
        content: {
          reservations: [
            { id: 3303, booking_type: 'online' },
            { id: 3345, booking_type: 'online' },
            { id: 3347, booking_type: 'online' }
          ]
        }
      }

      expect(profileReducer(state, {
        type: 'ON_CANCEL_RESERVATION_SUCCESS'
      }))
      .to.deep.equal(state)
    })

    it('should return new reservations on ON_RESELL_RESERVATION_SUCCESS', () => {
      const state = {
        content: {
          reservations: [
            { id: 3345, isReselling: false },
            { id: 3347, isReselling: false }
          ]
        }
      }

      expect(profileReducer(state, {
        type: 'ON_RESELL_RESERVATION_SUCCESS'
      }))
        .to.deep.equal(state)
    })
  })
})
