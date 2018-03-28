import {
  ON_SELECT_COUNTRY
} from '../../actions/country-selection-actions'

/* eslint camelcase: ["error", {properties: "never"}] */

const initialState = {
  countryList: [
    { id: 1, iso_2: 'FI', name: 'Finland' },
    { id: 2, iso_2: 'US', name: 'USA' }
  ],
  chosenCountryId: 1
}

const countrySelection = (state = initialState, action) => {
  switch (action.type) {
    case ON_SELECT_COUNTRY:
      return {
        ...state,
        chosenCountryId: action.country
      }

    default:
      return state
  }
}

export default countrySelection
