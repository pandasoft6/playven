import {
  UPDATE_ALL_COURTS
} from '../../actions/search-actions'

export default function courtsReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_ALL_COURTS: {
      const newCourts = action.payload.length > 0 ?
        Object.assign(...action.payload.map(court => ({ [court.id]: court }))) :
        {}

      return {
        ...state,
        ...newCourts
      }
    }
    default:
      return state
  }
}
