import axios from 'axios'
import toastr from 'toastr'
import apiEndpoints from '../../config/apis'
import _ from 'lodash'
import { I18n } from 'react-redux-i18n'

export const addEmailToList = ({ email, onSuccess }) => {
  const trimmedEmail = _.trim(email)

  if (trimmedEmail === '') {
    return toastr.warning(I18n.t('pages.sales.toastr.empty_email'))
  }
  if (_.compact(_.split(trimmedEmail, '@')).length !== 2) {
    return toastr.warning(I18n.t('pages.sales.toastr.invalid_email'))
  }
  return axios.post(`${apiEndpoints.playven}/mailchimp_subscribers`, { email: trimmedEmail })
    .then(() => {
      toastr.success(I18n.t('pages.sales.toastr.email_saved'))
      onSuccess()
    })
    .catch(() => toastr.error(I18n.t('pages.sales.toastr.error_adding_email')))
}
