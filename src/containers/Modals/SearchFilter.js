import { connect } from 'react-redux'
import { show as showModal, hide as hideModal } from 'redux-modal'
import SearchFilter from 'components/Modals/SearchFilter'

const mapDispatchToProps = {
  showModal,
  hideModal
}

export default connect(
  null,
  mapDispatchToProps
)(SearchFilter)
