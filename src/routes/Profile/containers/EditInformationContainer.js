import { connect } from 'react-redux'
import EditInformation from '../components/EditInformation'
import { getCards, addCard } from '../../../api/reservation-api'
import { show } from 'redux-modal'
import { selectCard } from '../../../actions/booking-actions'


const mapStateToProps = state => ({
  user: state.auth.user,
  isEditingProfile: state.auth.isRequestingToEditProfile,
  isUpdatingPassword: state.auth.isRequestingToUpdatePassword,
  loaded: !state.booking.loaded,
  cards: state.booking.cards,
  selectedCard: state.booking.selectedCard
})
// TODO: Fix onSubmit url/access
const mapDispatchToProps = {
  show,
  getCards,
  addCard,
  selectCard
}

export default connect(mapStateToProps, mapDispatchToProps)(EditInformation)
