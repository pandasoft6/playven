import { connect } from 'react-redux'

import Availability from '../../components/Booking/Availability'
import { setAvailabilityView } from '../../../../actions/booking-actions'


const mapStateToProps = state => ({
  availabilityView: state.booking.availabilityView,
  allCourts: state.allCourts,
  allVenuesById: state.venues.allVenuesById,
  venue: state.venue.venue
})

const mapDispatchToProps = {
  setAvailabilityView
}


export default connect(mapStateToProps, mapDispatchToProps)(Availability)
