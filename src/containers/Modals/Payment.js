import { connect } from 'react-redux'
import { show } from 'redux-modal'
import Payment from '../../components/Modals/Payment/'
import {
  bookWithoutPayment,
  pay,
  getCards,
  addCard,
  getGamePasses
} from '../../api/reservation-api'
import {
  selectCard,
  clearSelectedCourts,
  selectGamePass,
  onCourtDeselect,
  changePaymentView
} from '../../actions/booking-actions'

const mapDispatchToProps = {
  bookWithoutPayment,
  pay,
  openModal: show,
  getCards,
  addCard,
  selectCard,
  clearSelectedCourts,
  getGamePasses,
  selectGamePass,
  changePaymentView,
  onCourtDeselect
}
const mapStateToProps = state => {
  const booking = state.booking
  const location = state.location
  const query = location.query
  // ensure that we don't pass empty string
  let duration = parseInt(query.duration || booking.duration, 10)

  duration = isNaN(duration) ? 0 : duration
  return {
    loaded: !booking.loaded,
    cardsLoaded: !booking.cardsLoaded,
    user: state.auth.user,
    selectedCourts: booking.selectedCourts,
    duration,
    cards: booking.cards,
    selectedCard: booking.selectedCard,
    locale: state.i18n.locale,
    gamePasses: booking.gamePasses,
    paymentView: booking.paymentView,
    allCourts: state.allCourts,
    allVenuesById: state.venues.allVenuesById
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment)
