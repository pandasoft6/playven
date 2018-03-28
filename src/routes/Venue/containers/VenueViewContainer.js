import { connect } from 'react-redux'
import VenueView from '../components/VenueView'

import {
  loadVenue,
  getSportNames,
  toggleInfoOpen,
  fetchSingleVenue,
  onVenueLoad
} from '../modules/venue'

const mapStateToProps = state => ({
  venue: state.venue.venue,
  imageIndex: state.venue.imageIndex,
  pathName: state.routing.locationBeforeTransitions.pathname.split('/')[2],
  isInfoOpen: state.venue.isInfoOpen,
  sport: state.booking.sport,
  date: state.booking.date
})

const mapDispatchToProps = {
  loadVenue,
  getSportNames,
  toggleInfoOpen,
  fetchSingleVenue,
  onVenueLoad
}


export default connect(mapStateToProps, mapDispatchToProps)(VenueView)
