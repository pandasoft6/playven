import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import SecondaryProfileNavigation from '../components/SecondaryProfileNavigation'
import { onChangeFilter } from '../modules/profile'
import {
  makeSelectFilter,
  makeSelectActive,
  makeSelectReservations,
  makeSelectMinMaxDate
} from '../modules/selectors'

const mapStateToProps = createStructuredSelector({
  active: makeSelectActive(),
  filter: makeSelectFilter(),
  reservations: makeSelectReservations(),
  minMaxDate: makeSelectMinMaxDate()
})

const mapDispatchToProps = {
  onChangeFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(SecondaryProfileNavigation)


