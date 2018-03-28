import { connect } from 'react-redux'
import SearchViewBlock from '../components/SearchViewBlock'
import { changeGridType } from '../modules/search'

const mapDispatchToProps = {
  changeGridType
}

const mapStateToProps = state => ({
  date: state.menu.date || state.location.query.date,
  city: state.menu.city || state.location.query.city,
  gridType: state.search.gridType
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchViewBlock)
