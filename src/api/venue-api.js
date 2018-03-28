import axios from 'axios'
import { getVenueSuccess, getSportNameSuccess, getVenuesByName } from '../actions/venue-actions'
import { displayBookingResults, updateVenueSlots, toggleLoaded } from '../actions/booking-actions'
import { updateAllCourts } from '../actions/search-actions'
import { onVenueLoad } from '../routes/Venue/modules/venue'
import apiEndpoints from '../../config/apis'

/**
 * GET_VENUES
 * /api/venues.json
 * @param {string} sport
 * //TODO: --> /api/venues.json
 */

export function getVenues(sport = '', country) {
  return dispatch =>
    axios.get(`${apiEndpoints.playven}/venues.json?sport=${sport}&country=${country}`)
      .then(response => {
        dispatch(getVenueSuccess(response.data.venues))
        return response
      })
}

export function loadVenue(venueId) {
  return dispatch => axios.get(`${apiEndpoints.playven}/venues/${venueId}.json`)
      .then(response => {
        dispatch(onVenueLoad(response.data))
        return response
      })
}

export const fetchSingleVenue = params => {
  // eslint-disable-next-line
  const { venueId, date, time, duration, sport_name } = params

  return dispatch => {
    dispatch(toggleLoaded())
    dispatch(displayBookingResults())
    return axios.get(`${apiEndpoints.playven}/venues/${venueId}/available_courts.json`, {
      params: {
        date,
        time,
        duration,
        // eslint-disable-next-line
        sport_name: sport_name
      }
    })
    .then(response => {
      dispatch(updateAllCourts(response.data.all_courts))
      dispatch(getVenueSuccess([response.data.venue, response.data.connected_venue]))
      dispatch(updateVenueSlots(response.data.courts))
      dispatch(toggleLoaded())
    })
    .catch(() => {
      dispatch(toggleLoaded())
    })
  }
}

/**
 * GET_ALL_SPORT_NAMES
 * api/all_sport_names.json
 */

export function getSportNames() {
  return dispatch => axios.get(`${apiEndpoints.playven}/all_sport_names.json`)
      .then(response => {
        dispatch(getSportNameSuccess(response.data))
        return response
      })
}

export const searchByName = (name, country) => dispatch =>
  axios.get(`${apiEndpoints.playven}/search/filter_by_name.json`, {
    params: {
      name,
      country
    }
  })
    .then(response => dispatch(getVenuesByName(response.data)))

