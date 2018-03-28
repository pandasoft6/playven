import axios from 'axios'
import toastr from 'toastr'
import apiEndpoints from '../../config/apis'
import { I18n } from 'react-redux-i18n'
import { getUserInvoicesSuccess,
  getUserInvoicesRequest,
  onInvoicePaid,
  invoiceDownloaded } from '../routes/Profile/modules/profile.js'

export const getUserInvoices = data => dispatch => {
  const url = `${apiEndpoints.playven}/invoices.json`

  dispatch(getUserInvoicesRequest(data))
  return axios.get(url)
    .then(res => {
      dispatch(getUserInvoicesSuccess(res.data.invoices))
    })
    .catch(error => toastr.error(error))
}

export const downloadInvoice = data => dispatch => {
  window.open(`${apiEndpoints.playven}/invoices/${data.id}.pdf?` +
              `Authorization=${localStorage.getItem('authToken')}`)
  dispatch(invoiceDownloaded(data))
}

export const payInvoice = data => (dispatch, getState) => {
  const url = `${apiEndpoints.playven}/invoices/${data.invoice.id}/pay.json`
  const card = getState().booking.selectedCard

  if (!card) {
    toastr.error(I18n.t('pages.profile.toastr.no_card'))
    return false
  }

  return axios.post(url, {
    card
  }).then(res => {
    dispatch(onInvoicePaid(res.data.invoices))
    toastr.success(I18n.t('pages.profile.toastr.invoice_paid'))
    data.onSuccess()
  }).catch(e => toastr.error(e))
}
