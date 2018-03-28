import {
  CITIES_FULFILLED
} from '../../actions/search-actions'

const initialState = {
  allCities: []
}

export default function citiesReducer(state = initialState, action) {
  switch (action.type) {
    case CITIES_FULFILLED:
      return {
        ...state,
        allCities: action.payload
      }

    default:
      return state
  }
}
