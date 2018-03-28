import { createSelector } from 'reselect'

import Moment from 'moment'
import { extendMoment } from 'moment-range'
const moment = extendMoment(Moment)

import _ from 'lodash'
import { FILTER_ORDER, FILTER_TYPE } from '../modules/profile'

// TODO: Need to move it to user selectors
const selectUser = state => state.auth.user

const makeSelectUserId = () => createSelector(
  selectUser,
  userState => userState.id
)
// ===

const selectProfile = state => state.profile
const selectContent = state => state.profile.content
const selectFilter = state => state.profile.filter

const makeSelectFilter = () => createSelector(
  selectProfile,
  profileState => profileState.filter
)

const makeSelectActive = () => createSelector(
  selectProfile,
  profileState => profileState.active
)

const makeSelectPageNumber = () => createSelector(
  selectProfile,
  profileState => profileState.pageNumber
)

const makeSelectPerPage = () => createSelector(
  selectProfile,
  profileState => profileState.perPage
)

const makeSelectIsFetching = () => createSelector(
  selectProfile,
  profileState => profileState.isFetching
)

const makeSelectContent = () => createSelector(
  selectProfile,
  profileState => profileState.content
)

// Filter
const isFuture = order => FILTER_ORDER.FUTURE === order
const isPast = order => FILTER_ORDER.PAST === order
const checkOrder = ({ filterOrder, arrayFuture = [], arrayPast = [] }) => {
  if (isFuture(filterOrder)) {
    return arrayFuture
  }
  if (isPast(filterOrder)) {
    return arrayPast
  }
  return []
}

const makeSelectReservations = () => createSelector(
  makeSelectContent(),
  makeSelectFilter(),
  (contentState, filterState) => {
    const filterOrder = filterState.order
    let reservations = contentState.reservations

    switch (filterState.type) {
      case FILTER_TYPE.RESERVATIONS:
        reservations = checkOrder({
          filterOrder,
          arrayFuture: _.get(reservations, 'reservations_future.dates'),
          arrayPast: _.get(reservations, 'reservations_past.dates')
        })
        break
      case FILTER_TYPE.RECURRING_RESERVATIONS:
        reservations = checkOrder({
          filterOrder,
          arrayFuture: _.get(reservations, 'recurring_future.dates'),
          arrayPast: _.get(reservations, 'recurring_past.dates')
        })
        break
      case FILTER_TYPE.RESELLING_RECURRING_RESERVATIONS:
        reservations = checkOrder({
          filterOrder,
          arrayFuture: _.get(reservations, 'recurring_reselling_future.dates'),
          arrayPast: _.get(reservations, 'recurring_reselling_past.dates')
        })
        break
      case FILTER_TYPE.RESOLD_RECURRING_RESERVATIONS:
        reservations = checkOrder({
          filterOrder,
          arrayFuture: _.get(reservations, 'recurring_resold_future.dates'),
          arrayPast: _.get(reservations, 'recurring_resold_past.dates')
        })
        break
      default:
        return []
    }

    return reservations
  }
)

const makeSelectMinMaxDate = () => createSelector(
  makeSelectReservations(),
  makeSelectFilter(),
  (reservations, filter) => {
    if (filter.order === FILTER_ORDER.PAST ||
      filter.order === FILTER_ORDER.PAID) {
      return {
        max: moment(_.get(reservations, ['0', 'date'], moment()), 'YYYY-MM-DD'),
        min: moment(_.get(reservations, [reservations.length - 1, 'date'], moment()), 'YYYY-MM-DD')
      }
    }
    return {
      min: moment(_.get(reservations, ['0', 'date'], moment()), 'YYYY-MM-DD'),
      max: moment(_.get(reservations, [reservations.length - 1, 'date'], moment()), 'YYYY-MM-DD')
    }
  }
)

const makeSelectReservationsFiltered = () => createSelector(
  makeSelectReservations(),
  makeSelectFilter(),
  (reservations, filterState) => {
    const dateRange = moment.range(moment(filterState.dateFrom), moment(filterState.dateTo))

    return reservations.filter(item => moment(item.date).within(dateRange))
  }
)


const makeSelectInvoices = () => createSelector(
  makeSelectContent(),
  makeSelectFilter(),
  (contentState, filterState) => {
    const filterOrder = filterState.order
    let invoices = contentState.invoices
    const isPaid = order => FILTER_ORDER.UNPAID === order
    const isUnpaid = order => FILTER_ORDER.PAID === order

    switch (filterState.type) {
      case FILTER_TYPE.INVOICES:
        if (isPaid(filterOrder)) {
          invoices = invoices.filter(i => !i.isPaid)
        }
        if (isUnpaid(filterOrder)) {
          invoices = invoices.filter(i => i.isPaid)
        }
        break
      default:
        invoices = []
    }
    return invoices
  }
)

const makeSelectGamePasses = () => createSelector(
  makeSelectContent(),
  makeSelectFilter(),
  (contentState, filterState) => {
    const filterOrder = filterState.order
    let gamePasses = contentState.gamePasses
    const isExpired = order => FILTER_ORDER.EXPIRED === order
    const isValid = order => FILTER_ORDER.VALID === order

    switch (filterState.type) {
      case FILTER_TYPE.GAME_PASSES:
        if (isExpired(filterOrder)) {
          gamePasses = gamePasses.filter(i => !i.active)
        }
        if (isValid(filterOrder)) {
          gamePasses = gamePasses.filter(i => i.active)
        }
        break
      default:
        gamePasses = []
    }
    return gamePasses
  }
)

export {
  makeSelectUserId,

  selectProfile,
  selectContent,
  selectFilter,
  makeSelectFilter,
  makeSelectActive,
  makeSelectContent,
  makeSelectPageNumber,
  makeSelectPerPage,
  makeSelectIsFetching,
  makeSelectReservations,
  makeSelectReservationsFiltered,
  makeSelectInvoices,
  makeSelectGamePasses,
  makeSelectMinMaxDate
}
