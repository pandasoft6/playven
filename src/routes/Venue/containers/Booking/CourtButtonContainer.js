import { connect } from 'react-redux'

import { onCourtSelect, onCourtDeselect } from '../../../../actions/booking-actions'
import CourtButton from '../../components/Booking/CourtButton'


const mapStateToProps = () => ({})

const mapDispatchToProps = {
  onCourtSelect,
  onCourtDeselect
}


export default connect(mapStateToProps, mapDispatchToProps)(CourtButton)
