import { connect } from 'react-redux'
import MainContent from '../../components/InvoicePayment/MainContent'
import { selectCard } from '../../../../actions/booking-actions'
import { addCard, getCards } from '../../../../api/reservation-api'
import { payInvoice } from '../../../../api/invoices-api'

const mapStateToProps = state => {
  const cardsState = state.booking

  return {
    invoice: state.profile.invoicePayment.invoice,
    user: state.auth.user,
    cardsLoaded: !cardsState.cardsLoaded,
    cards: cardsState.cards,
    selectedCard: cardsState.selectedCard
  }
}

const mapDispatchToProps = {
  selectCard,
  getCards,
  addCard,
  payInvoice
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContent)
