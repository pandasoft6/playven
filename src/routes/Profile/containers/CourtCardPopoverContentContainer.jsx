import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import CourtCardPopoverContent from '../components/CourtCardPopoverContent'
import {
  makeSelectFilter
} from '../modules/selectors'
import { cancelReservation } from '../../../api/reservation-api'
import { resellReservation } from '../../../api/reservation-api'
import { addToCalendar } from '../../../api/reservation-api'

const mapStateToProps = createStructuredSelector({
  filter: makeSelectFilter()
})

const mapDispatchToProps = {
  cancelReservation,
  resellReservation,
  addToCalendar
}

export default connect(mapStateToProps, mapDispatchToProps)(CourtCardPopoverContent)
