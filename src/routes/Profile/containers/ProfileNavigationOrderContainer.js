import { connect } from 'react-redux'
import ProfileNavigationOrder from '../components/ProfileNavigationOrder'
import { onChangeFilter } from '../modules/profile'

const mapStateToProps = state => ({
  filter: state.profile.filter
})

const mapDispatchToProps = {
  onChangeFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileNavigationOrder)
