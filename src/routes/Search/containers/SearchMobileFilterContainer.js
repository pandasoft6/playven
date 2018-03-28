import { connect } from 'react-redux'
import { show, hide } from 'redux-modal'
import _ from 'lodash'
import SearchMobileFilter from '../components/SearchMobileFilter'

const mapDispatchToProps = {
  show,
  hide
}
const mapStateToProps = state => ({
  isActiveFilter: _.hasIn(state, ['modal', 'searchFilter', 'show']) ?
    state.modal.searchFilter.show :
    false
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchMobileFilter)
