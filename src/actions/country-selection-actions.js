import * as types from '../actions/action-types'
export const ON_SELECT_COUNTRY = types.ON_SELECT_COUNTRY

export const onCountrySelect = country => ({
  type: types.ON_SELECT_COUNTRY,
  country
})
