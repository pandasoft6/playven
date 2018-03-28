import reducer from '../../../src/store/reducers/booking-reducer'

/* eslint camelcase: ["error", {properties: "never"}] */

describe('reducer', () => {
  describe('default', () => {
    it('returns the initial state', () => {
      const initialState = {
        availabilityView: 'grid',
        authLoading: false,
        venue: {},
        date: '',
        displayBookingResults: false,
        sportsListVisible: false,
        sport: 'tennis',
        activeSlot: '',
        slots: [],
        selectedCourts: [],
        loaded: true,
        cards: [],
        cardsLoaded: true,
        selectedCard: '',
        duration: '',
        paymentView: 'content'
      }

      // eslint-disable-next-line
      expect(reducer(undefined, {})).to.deep.equal(initialState)
    })
  })

  describe('on CHANGE_DATE action', () => {
    const state = {
      date: ''
    }

    it('returns the state with chosen date and cleans the courts', () => {
      expect(reducer(state, { type: 'CHANGE_DATE', payload: '30/12/2016' })).to.deep
        .equal({ date: '30/12/2016' })
    })
  })

  describe('on SPORTS_LIST_VISIBILITY action', () => {
    const state = {
      sportsListVisible: false
    }

    it('returns the state toggled sport list', () => {
      expect(reducer(state, { type: 'SPORTS_LIST_VISIBILITY' }))
        .to.deep.equal({ sportsListVisible: !state.sportsListVisible })
    })
  })

  describe('on CHANGE_SPORT action', () => {
    const state = {
      sport: 'tennis'
    }

    it('returns the state with chosen sport and cleans the courts', () => {
      expect(reducer(state, { type: 'CHANGE_SPORT', payload: 'golf' }))
        .to.deep.equal({ sport: 'golf' })
    })
  })

  describe('on ON_COURT_SELECT action when court is new', () => {
    const state = {
      selectedCourts: []
    }

    it('returns the state with chosen court', () => {
      const payload = {
        duration: 60,
        price: 20,
        court: {
          id: 1
        },
        currency: '$',
        starts_at: '2017-02-06T17:00:00+02:00',
        date: '2017/02/06'
      }

      expect(reducer(state, { type: 'ON_COURT_SELECT', payload })).to.deep
        .equal({ selectedCourts: [
          { id: 1, startTime: '17:00', duration: 60, price: 20, date: '2017/02/06', currency: '$' }
        ] })
    })
  })

  describe('on ON_COURT_DESELECT action when court is not new', () => {
    const state = {
      selectedCourts: [{ id: 1, startTime: '17:00' }, { id: 2, startTime: '17:00' }]
    }

    it('returns the state without chosen court', () => {
      expect(reducer(state, { type: 'ON_COURT_DESELECT', courtId: 2, startTime: '17:00' })).to
        .deep.equal({ selectedCourts: [{ id: 1, startTime: '17:00' }] })
    })
  })

  describe('on UPDATE_VENUE_SLOTS action', () => {
    const state = {
      slots: {}
    }

    it('returns the state with venues slots', () => {
      expect(reducer(state, {
        type: 'UPDATE_VENUE_SLOTS',
        payload: {
          available: {
            '17:00': { available_courts: [1, 2, 3] },
            '18:00': { available_courts: [1, 2] }
          }
        }
      }))
      .to.deep.equal({
        slots: {
          available: {
            '17:00': { available_courts: [1, 2, 3] },
            '18:00': { available_courts: [1, 2] }
          }
        }
      })
    })
  })

  describe('on TOGGLE_LOADED action', () => {
    const state = {
      loaded: false
    }

    it('returns the state with chosen slot', () => {
      expect(reducer(state, { type: 'TOGGLE_LOADED' })).to.deep.equal({ loaded: !state.loaded })
    })
  })

  describe('on TOGGLE_LOADED action', () => {
    const state = {
      displayBookingResults: false
    }

    it('returns the state with chosen slot', () => {
      expect(reducer(state, { type: 'DISPLAY_BOOKING_RESULTS' }))
        .to.deep.equal({ displayBookingResults: true })
    })
  })

  describe('on CLEAR_STATE action', () => {
    const initialState = {
      availabilityView: 'grid',
      authLoading: false,
      paymentView: 'content',
      venue: {},
      date: '',
      displayBookingResults: false,
      sportsListVisible: false,
      sport: 'tennis',
      activeSlot: '',
      slots: [],
      selectedCourts: [],
      loaded: true,
      cards: [],
      cardsLoaded: true,
      selectedCard: '',
      duration: ''
    }

    const state = {
      date: '12/12/2022',
      loaded: false
    }

    it('returns initial state', () => {
      expect(reducer(state, { type: 'CLEAR_STATE' })).to.deep.equal(initialState)
    })
  })

  describe('on CLEAR_SELECTED_COURTS action', () => {
    const state = {
      selectedCourts: [1, 2, 3]
    }

    it('returns the state with empty selectedCourts', () => {
      expect(reducer(state, { type: 'CLEAR_SELECTED_COURTS' }))
        .to.deep.equal({ selectedCourts: [] })
    })
  })

  describe('on SAVE_CARDS action', () => {
    const state = {
      cards: []
    }

    it('returns the state with fetched cards', () => {
      expect(reducer(state, { type: 'SAVE_CARDS', payload: [1, 2, 3] }))
        .to.deep.equal({ cards: [1, 2, 3] })
    })
  })

  describe('on SELECT_CARD action', () => {
    const state = {
      selectedCard: ''
    }

    it('returns the state with selected card', () => {
      expect(reducer(state, { type: 'SELECT_CARD', payload: 'card_19OENwI61cakPIniooCxe2cL' }))
        .to.deep.equal({ selectedCard: 'card_19OENwI61cakPIniooCxe2cL' })
    })
  })

  describe('on SET_AVAILABILITY_VIEW action', () => {
    const state = {
      availabilityView: 'compact'
    }

    it('returns the state with selected duration', () => {
      expect(reducer(state, { type: 'SET_AVAILABILITY_VIEW', payload: 'compact' }))
        .to.deep.equal({ availabilityView: 'compact' })
    })
  })

  describe('on UPDATE_DURATION action', () => {
    const state = {
      duration: ''
    }

    it('returns the state with selected duration', () => {
      expect(reducer(state, { type: 'UPDATE_DURATION', payload: 120 }))
        .to.deep.equal({ duration: 120 })
    })
  })

  describe('on ADD_GAME_PASS action', () => {
    const state = {
      selectedCourts: [
        { id: 1 },
        { id: 2 },
        { id: 1 }
      ]
    }

    const payload = [1, 2, 3]

    it('applies game pass to all related courts', () => {
      expect(reducer(state, { type: 'ADD_GAME_PASS', courtId: 1, payload })).to.deep.equal({
        selectedCourts: [
          { id: 1, gamePasses: payload },
          { id: 2 },
          { id: 1, gamePasses: payload }
        ]
      })
    })
  })
})
