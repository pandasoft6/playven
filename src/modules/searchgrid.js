import { browserHistory } from 'react-router'
import axios from 'axios'
import apiEndpoints from '../../config/apis'
import toastr from 'toastr'
import { updateAllCourts } from '../actions/search-actions'
import { getVenueSuccess, getPrepopulatedVenues } from '../actions/venue-actions'

// ------------------------------------
// Constants
// ------------------------------------
import {
  HANDLE_SEARCHGRID_FORM_SUBMIT,
  HANDLE_SEARCHGRID_SEARCH_FAIL
} from '../actions/search-actions'

export const onSearchSuccess = searchResults => ({
  type: HANDLE_SEARCHGRID_FORM_SUBMIT,
  searchResults
})

export const onSearchFail = errorObject => ({
  type: HANDLE_SEARCHGRID_SEARCH_FAIL,
  ...errorObject
})

export const onFetching = () => ({
  searching: true,
  type: HANDLE_SEARCHGRID_FORM_SUBMIT
})

// TODO: api
export const getSearchResults = queryParams =>
  axios
    .get(`${apiEndpoints.playven}/search.json`, { params: queryParams })
    .catch(err => toastr.error(err))

// TODO: move to api
export const onSubmit = (e, query) => {
  const queryParams = query ? query : {}

  if (e) {
    e.preventDefault()
    const fields = Array.from(e.target.elements)

    fields
      .filter(v => v.name !== v.value)
      .forEach(v => {
        queryParams[v.name] = v.value
      })
  }


  return (dispatch, getState) => {
    const store = getState()
    const { chosenCountryId } = store.countrySelection

    queryParams.country = chosenCountryId

    dispatch(onFetching())
    return getSearchResults(queryParams)
    .then(response => {
      dispatch(updateAllCourts(response.data.all_courts))
      const venues = response.data.response.map(tuple => tuple.venue)

      dispatch(getVenueSuccess(venues))

      dispatch(getPrepopulatedVenues(response.data.prepopulated))
      const error = response.data.error

      if (error) {
        dispatch(onSearchFail(error))
      } else {
        dispatch(onSearchSuccess(response.data.response))
      }
    })
    .then(browserHistory.push({ pathname: '/search', query: queryParams }))
  }
}

export const actions = {
  onSubmit
}
