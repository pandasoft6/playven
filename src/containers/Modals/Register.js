import { connect } from 'react-redux'
import { show as showModal, hide as hideModal } from 'redux-modal'
import Register from '../../components/Modals/Register'
import {
  register,
  onChange,
  ON_REGISTER_INPUT_CHANGE,
  facebookLogin
} from '../../actions/auth-actions'

const mapDispatchToProps = {
  register,
  onChange: e => onChange(e, ON_REGISTER_INPUT_CHANGE),
  facebookLogin,
  showModal,
  hideModal
}
const mapStateToProps = state => ({
  error: state.auth.messages,
  locale: state.i18n.locale,
  isWaitingFacebookResponse: state.auth.isWaitingFacebookResponse
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)
