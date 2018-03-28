import { connect } from 'react-redux'
import { show } from 'redux-modal'
import { createStructuredSelector } from 'reselect'
import {
  makeSelectUserId,

  makeSelectFilter,
  makeSelectActive,
  makeSelectReservations,
  makeSelectReservationsFiltered,
  makeSelectInvoices,
  makeSelectGamePasses,
  makeSelectPageNumber,
  makeSelectPerPage,
  makeSelectIsFetching
} from '../modules/selectors'
import Content from '../components/Content'
import * as actions from '../modules/profile'
import { update } from '../../../api/auth-api'
import { downloadInvoice } from '../../../api/invoices-api'

const mapStateToProps = createStructuredSelector({
  active: makeSelectActive(),
  filter: makeSelectFilter(),
  reservations: makeSelectReservations(),
  reservationsFiltered: makeSelectReservationsFiltered(),
  invoices: makeSelectInvoices(),
  gamePasses: makeSelectGamePasses(),
  pageNumber: makeSelectPageNumber(),
  perPage: makeSelectPerPage(),
  isFetching: makeSelectIsFetching(),
  userId: makeSelectUserId()
})

const mapDispatchToProps = {
  getReservations: actions.getUserReservations,
  getInvoices: actions.getUserInvoices,
  getGamePasses: actions.getUserGamePasses,
  onChangeFilter: actions.onChangeFilter,
  update,

  downloadInvoice,
  openModal: show,
  payInvoice: actions.onClickInvoicePay
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)
