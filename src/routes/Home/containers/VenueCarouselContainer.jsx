import { connect } from 'react-redux'
import VenueCarousel from '../components/VenueCarousel'
import { getVenues } from '../../../actions/venue-actions'

const countrySelector = ({ countryList, chosenCountryId }) =>
  countryList.find(country => country.id === parseInt(chosenCountryId, 10))

/*
initialState
{
  allVenues: [],
  allSports: []
}
*/

const mapStateToProps = state => ({
  allVenues: state.venues.allVenues,
  selectedCountry: countrySelector(state.countrySelection)
})

const mapDispatchToProps = {
  getVenues
}

export default connect(mapStateToProps, mapDispatchToProps)(VenueCarousel)
