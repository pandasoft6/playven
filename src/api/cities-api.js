import axios from 'axios'
import toastr from 'toastr'

import { citiesFulfilled } from '../actions/search-actions'
import apiEndpoints from '../../config/apis'

export const getAllCities = country =>
  dispatch => axios.get(`${apiEndpoints.playven}/cities`, {
    params: {
      country
    }
  })
    .then(res => {
      dispatch(citiesFulfilled(res.data.cities))
    })
    .catch(() => toastr.error('Error when fetching cities'))
