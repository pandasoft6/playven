import { connect } from 'react-redux'
import { Navigation } from '../../components/Navigation'
import { toggleMobileMenu, toggleSearchMenu } from '../../actions/menu-actions'
import { searchByName } from 'api/venue-api'
import { changeLocale } from 'api/profile-api'
import { changeCountry } from '../../api/countries-api'

const mapStateToProps = state => ({
  auth: state.auth.authenticated,
  isMobileMenuOpen: state.menu.isMobileMenuOpen,
  isSearchMenuOpen: state.menu.isSearchMenuOpen,
  country: state.countrySelection.chosenCountryId,
  countryList: state.countrySelection.countryList,
  venuesByName: state.venues.venuesByName
})

const mapDispatchToProps = {
  toggleMobileMenu,
  toggleSearchMenu,
  changeLocale,
  searchByName,
  changeCountry
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)
