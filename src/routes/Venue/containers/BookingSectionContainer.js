import { connect } from 'react-redux'

import BookingSection from '../components/BookingSection'

const mapStateToProps = state => ({
  displayBookingResults: state.booking.displayBookingResults,
  loading: !state.booking.loaded,
  selectedCourts: state.booking.selectedCourts,
  slots: state.booking.slots
})


export default connect(mapStateToProps)(BookingSection)
