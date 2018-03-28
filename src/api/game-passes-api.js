import axios from 'axios'
import toastr from 'toastr'
import apiEndpoints from '../../config/apis'
import {
  getUserGamePassesSuccess,
  getUserGamePassesRequest
} from '../routes/Profile/modules/profile'

export const getUserGamePasses = (data, userId) => dispatch => {
  const url = `${apiEndpoints.playven}/users/${userId}/game_passes.json`

  dispatch(getUserGamePassesRequest(data))
  return axios.get(url)
    .then(res => {
      dispatch(getUserGamePassesSuccess(res.data.game_passes))
    })
    .catch(error => toastr.error(error))
}
