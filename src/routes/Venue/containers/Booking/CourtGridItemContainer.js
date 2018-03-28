import { connect } from 'react-redux'

import { onCourtSelect, onCourtDeselect } from '../../../../actions/booking-actions'
import CourtGridItem from '../../components/Booking/CourtGridItem'


const mapStateToProps = state => ({
  selectedCourts: state.booking.selectedCourts
})

const mapDispatchToProps = {
  onCourtSelect,
  onCourtDeselect
}


export default connect(mapStateToProps, mapDispatchToProps)(CourtGridItem)
