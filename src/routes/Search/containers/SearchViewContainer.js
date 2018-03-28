import { connect } from 'react-redux'
import SearchView from '../components/SearchView'
import { getSportNames } from '../../../api/venue-api'
import { onSubmit } from '../../../modules/searchgrid'

const mapDispatchToProps = { getSportNames, onSubmit }
const mapStateToProps = state => ({
  queryParams: state.location.query
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchView)
