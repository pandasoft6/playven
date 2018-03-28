import { put, takeEvery, select } from 'redux-saga/effects'
import { onChangeFilter, getUserReservations } from './profile'
import {
  makeSelectActive,
  makeSelectMinMaxDate
} from './selectors'

function *setDateRange(action) {
  const active = yield select(makeSelectActive())
  const minMaxDate = yield select(makeSelectMinMaxDate())

  if (action.type === 'ON_GET_USER_RESERVATION_SUCCESS' ||
    active === 'reservations' &&
    action.name === 'order' ||
    action.name === 'type') {
    yield put(onChangeFilter({ name: 'dateFrom', value: minMaxDate.min }))
    yield put(onChangeFilter({ name: 'dateTo', value: minMaxDate.max }))
  }
}

function *fetchReservations() {
  yield put(getUserReservations([]))
}

function *sagas() {
  yield takeEvery('ON_GET_USER_RESERVATION_SUCCESS', setDateRange)
  yield takeEvery('ON_CHANGE_FILTER', setDateRange)
  yield takeEvery('ON_CANCEL_RESERVATION_SUCCESS', fetchReservations)
  yield takeEvery('ON_RESELL_RESERVATION_SUCCESS', fetchReservations)
}

export default sagas
