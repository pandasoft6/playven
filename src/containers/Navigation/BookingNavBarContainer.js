import { connect } from 'react-redux'
import BookingNavBar from '../../components/Navigation/BookingNavBar'
import { show } from 'redux-modal'
import { clearSelectedCourts } from '../../actions/booking-actions'


const mapStateToProps = state => ({
  selectedCourts: state.booking.selectedCourts
})

const mapDispatchToProps = {
  clearSelectedCourts,
  openModal: show
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingNavBar)
