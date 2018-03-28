import React, { PropTypes } from 'react'
import { Modal } from 'react-bootstrap'
import { connectModal } from 'redux-modal'
import Text from '../../../containers/Text'
import { I18n } from 'react-redux-i18n'
import moment from 'moment'
import MainContent from './MainContent'
import SignIn from '../../../containers/Modals/Payment/SignIn'
import SignUp from '../../../containers/Modals/Payment/SignUp'
import ForgotPassword from '../../../containers/Modals/Payment/ForgotPassword'
import Success from './Success'
import VenueItem from './VenueItem'
import _ from 'lodash'

export class Payment extends React.Component {
  constructor(props) {
    super(props)

    this.fetchGamePassesForCourt = this.fetchGamePassesForCourt.bind(this)
  }

  venueItems() {
    const { selectGamePass, allCourts, allVenuesById,
      selectedCourts, onCourtDeselect } = this.props

    // group selected courts by venue id
    const courtsGroupedByVenue = _.groupBy(selectedCourts, courtData =>
      allCourts[courtData.id].venue_id
    )

    const currency = selectedCourts.some(court => court.currency === '$') ?
      '$' :
      '\u20AC'

    return _.map(courtsGroupedByVenue, (courtsDatum, venueId) => {
      const venue = allVenuesById[venueId]
      const groupedByDate = _.groupBy(courtsDatum, 'date')

      return _.map(groupedByDate, (groupedCourtsDatum, date) => <VenueItem
        allCourts={allCourts}
        currency={currency}
        date={date}
        fetchGamePassesForCourt={this.fetchGamePassesForCourt}
        key={`${venueId}${date}`}
        onCourtDeselect={onCourtDeselect}
        openDetails={true}
        selectGamePass={selectGamePass}
        selectedCourts={groupedCourtsDatum}
        venueImage={venue.image}
        venueName={venue.venue_name} />)
    })
  }

  skipButton() {
    const { loaded, bookWithoutPayment, selectedCourts, allCourts, changePaymentView,
      onSuccess } = this.props
    const skippable = selectedCourts.every(court => allCourts[court.id].payment_skippable)
    const doesCostAnything = this.priceWithDiscount() > 0
    const canSkipPayment = !loaded && skippable && doesCostAnything

    if (!canSkipPayment) {
      return null
    }
    return (
      <div className="flex-row flex-he">
        <a
          className="skip_button blue-link t5 mtt text-uc"
          href="#"
          onClick={e => {
            e.preventDefault()
            bookWithoutPayment(
              {
                onSuccess: () => {
                  changePaymentView('success')
                  onSuccess()
                }
              }
            )
          }}>
          <Text text="modals.payment.skip_payment" />
        </a>
      </div>
    )
  }

  fetchGamePassesForCourt(court) {
    const { getGamePasses, user } = this.props

    if (user) {
      const startTime = moment(`${court.startTime} ${court.date}`, 'HH:mm YYYY/MM/DD')
      .format('YYYY-MM-DD HH:mm')
      const courtDuration = court.duration

      getGamePasses({ courtId: court.id, duration: courtDuration, startTime })
    }
  }

  onHide() {
    const { changePaymentView, handleHide } = this.props

    changePaymentView('content')
    handleHide()
  }

  priceWithDiscount() {
    const { selectedCourts } = this.props

    return selectedCourts.reduce((sum, court) => {
      // please not that we want to use `==`, not `===`, due to value can be null
      // Todo: for game passes check reducers

      const price = court.selectedGamePassId ? 0 : court.price

      return sum + price
    }, 0)
  }

  totalDuration() {
    const { selectedCourts } = this.props

    return _.sumBy(selectedCourts, 'duration')
  }

  render() {
    const { show, selectedCourts, user, cardsLoaded, onCardAdd,
      pay, cards, getCards, addCard,
      selectCard, selectedCard, paymentView, changePaymentView, onSuccess } = this.props
    // const { show, handleHide, selectedCourts, user, cardsLoaded, onCardAdd,
    //   pay, cards, getCards, addCard,
    //   selectCard, selectedCard } = this.props


    const doesCostAnything = this.priceWithDiscount() > 0
    const courtCount = I18n.t('modals.payment.court_count', { count: selectedCourts.length })
    let content

    const currency = selectedCourts.some(court => court.currency === '$') ?
      '$' :
      '\u20AC'

    switch (paymentView) {
      case 'forgot_password':
        content = <ForgotPassword />
        break
      case 'signin':
        content = <SignIn />
        break
      case 'signup':
        content = <SignUp />
        break
      case 'success':
        content = <Success />
        break
      default:
        content = <MainContent
          addCard={addCard}
          cards={cards}
          cardsLoaded={cardsLoaded}
          changePaymentView={changePaymentView}
          courtCount={courtCount}
          currency={currency}
          doesCostAnything={doesCostAnything}
          getCards={getCards}
          onCardAdd={onCardAdd}
          onSuccess={onSuccess}
          pay={pay}
          priceWithDiscount={this.priceWithDiscount()}
          selectCard={selectCard}
          selectedCard={selectedCard}
          skipButton={this.skipButton()}
          sumDuration={this.totalDuration()}
          user={user}
          venueItems={this.venueItems()} />
    }
    return (
      <Modal backdrop={false}
        dialogClassName="payment-modal flex-he flex-row flex-vs"
        onHide={() => this.onHide()}
        show={show}>
        <i className="icon-cross2 modal-close color-white" onClick={() => this.onHide()} />
        <div className="payment-modal__overlay color-bg-turquoise" />
        {content}
      </Modal>
    )
  }
}


Payment.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  venue: PropTypes.object,
  show: PropTypes.bool,
  handleHide: PropTypes.func,
  user: PropTypes.object,
  loaded: PropTypes.bool,
  cardsLoaded: PropTypes.bool,
  onCardAdd: PropTypes.func,
  pay: PropTypes.func,
  bookWithoutPayment: PropTypes.func,
  duration: PropTypes.number,
  getCards: PropTypes.func.isRequired,
  addCard: PropTypes.func.isRequired,
  selectCard: PropTypes.func.isRequired,
  selectedCard: PropTypes.string,
  clearSelectedCourts: PropTypes.func,
  getGamePasses: PropTypes.func,
  selectGamePass: PropTypes.func,
  selectedCourts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    startTime: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  })).isRequired,
  cards: PropTypes.array, // eslint-disable-line react/forbid-prop-types,
  changePaymentView: PropTypes.func.isRequired,
  paymentView: PropTypes.string.isRequired,
  allCourts: PropTypes.object,
  allVenuesById: PropTypes.object,
  onCourtDeselect: PropTypes.func.isRequired
}

export default connectModal({
  name: 'payment'
})(Payment)
