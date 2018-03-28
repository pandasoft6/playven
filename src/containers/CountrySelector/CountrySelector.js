import { connect } from 'react-redux'
import { changeCountry } from '../../api/countries-api'

import CountrySelector from '../../components/CountrySelector'

const mapStateToProps = state => ({
  chosenCountryId: state.countrySelection.chosenCountryId,
  countryList: state.countrySelection.countryList
})

const mapDispatchToProps = {
  changeCountry
}

export default connect(mapStateToProps, mapDispatchToProps)(CountrySelector)
