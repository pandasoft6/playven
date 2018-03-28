import { connect } from 'react-redux'
import SearchResults from '../components/SearchResults'
import { onCourtSelect } from '../../../actions/booking-actions'
import { show } from 'redux-modal'

const mapDispatchToProps = {
  show,
  onCourtSelect
}

const mapStateToProps = state => ({
  searchResults: state.search.searchResults,
  searching: state.searchgrid.searching,
  queryParams: state.location.query,
  pageNumber: state.search.pageNumber,
  perPage: state.search.perPage,
  allVenuesById: state.venues.allVenuesById,
  prepopulatedVenues: state.venues.prepopulatedVenues,
  allCourts: state.allCourts,
  errorMessage: state.search.errorMessage,
  selectedCourts: state.booking.selectedCourts,
  gridType: state.search.gridType
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)
