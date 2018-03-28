import {
  GET_VENUE_SUCCESS,
  GET_SPORT_NAMES_SUCCESS,
  SET_ACTIVE_SPORT,
  TOGGLE_NEW_SPORT_SELECTION,
  GET_VENUES_BY_NAME,
  GET_PREPOPULATED_VENUE
} from '../../actions/venue-actions'


const initialState = {
  allVenues: [],
  allSports: [],
  allVenuesById: {},
  selectingNewSport: false,
  venuesByName: [],
  prepopulatedVenues: []
}

export default function venueReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VENUE_SUCCESS:
      return {
        ...state,
        // TODO: looks like allVenues is used in a carousel, make sure to use allVenuesById
        allVenues: action.allVenues,
        // One thing bothers me here: not all venues are born equal. Some are served with
        // start_date + end_date and I think we should not REWRITE them entirely,
        // but shallow merge them
        allVenuesById: Object.assign(
          state.allVenuesById,
          ...action.allVenues.map(x => ({ [x.id]: x }))
        )
      }
    case GET_PREPOPULATED_VENUE: {
      return {
        ...state,
        prepopulatedVenues: action.payload
      }
    }
    case GET_SPORT_NAMES_SUCCESS:
      return {
        ...state,
        activeSport: action.sports.sportnames[0],
        allSports: action.sports.sportnames
      }
    case SET_ACTIVE_SPORT:
      return {
        ...state,
        activeSport: action.activeSport
      }
    case TOGGLE_NEW_SPORT_SELECTION:
      return {
        ...state,
        selectingNewSport: !state.selectingNewSport
      }
    case GET_VENUES_BY_NAME:
      return {
        ...state,
        venuesByName: action.payload.venues
      }
    default:
      return state
  }
}
