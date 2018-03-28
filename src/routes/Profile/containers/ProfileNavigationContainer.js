import { connect } from 'react-redux'
import ProfileNavigation from '../components/ProfileNavigation'
import { onClickNavigationItem } from '../modules/profile'

const mapStateToProps = state => ({
  active: state.profile.active,
  filter: state.profile.filter,
  firstName: state.auth.user && state.auth.user.first_name,
  lastName: state.auth.user && state.auth.user.last_name
})

const mapDispatchToProps = {
  onClick: (item, order) => onClickNavigationItem(item, order)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileNavigation)


