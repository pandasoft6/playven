import { connect } from 'react-redux'

import Search from '../../components/Booking/Search'
import { fetchSingleVenue, getSportNames } from '../../../../api/venue-api'
import {
  changeDate,
  changeSport,
  updateDuration,
  clearState
} from '../../../../actions/booking-actions'


const mapStateToProps = state => ({
  sports: state.venues.allSports,
  sport: state.booking.sport,
  date: state.booking.date
})

const mapDispatchToProps = {
  changeDate,
  changeSport,
  updateDuration,
  fetchSingleVenue,
  clearState,
  getSportNames
}


export default connect(mapStateToProps, mapDispatchToProps)(Search)
