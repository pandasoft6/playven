import { connect } from 'react-redux'
import SportCard from '../components/SportCard'

const mapStateToProps = state => ({
  filter: state.profile.filter
})

export default connect(mapStateToProps)(SportCard)
