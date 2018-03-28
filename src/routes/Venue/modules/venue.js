// ------------------------------------
// Constants
// ------------------------------------

export const ON_VENUE_PAGE_LOAD = 'ON_VENUE_PAGE_LOAD'
export const CHANGE_IMAGE = 'CHANGE_IMAGE'
export const TOGGLE_INFO_OPEN = 'TOGGLE_INFO_OPEN'

// ------------------------------------
// Actions
// ------------------------------------

export const onVenueLoad = venue => ({
  type: ON_VENUE_PAGE_LOAD,
  venue
})

export function changeImage(nextIndex) {
  return {
    type: CHANGE_IMAGE,
    payload: nextIndex
  }
}

export function toggleInfoOpen() {
  return {
    type: TOGGLE_INFO_OPEN
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  ON_VENUE_PAGE_LOAD: (state, action) => ({
    ...state,
    venue: action.venue
  }),

  CHANGE_IMAGE: (state, action) => ({
    ...state,
    imageIndex: action.payload
  }),

  TOGGLE_INFO_OPEN: state => ({
    ...state,
    isInfoOpen: !state.isInfoOpen
  })
}

// ------------------------------------
// Reducer ** Initial values
// ------------------------------------

const initialState = {
  venue: null,
  imageIndex: 0,
  isInfoOpen: false
}

export default function venueReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

/** **************************************
*     Export api functions.             *
* Kept separate to have code integrity  *
****************************************/

export { loadVenue, getSportNames, fetchSingleVenue } from '../../../api/venue-api'
