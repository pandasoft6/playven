import { connect } from 'react-redux'
import { show as showModal, hide as hideModal } from 'redux-modal'
import Login from '../../components/Modals/Login'
import { login, onChange, register, facebookLogin } from '../../actions/auth-actions'

const mapDispatchToProps = {
  login,
  onChange,
  register,
  showModal,
  hideModal,
  facebookLogin
}

const mapStateToProps = state => ({
  error: state.auth.messages,
  isWaitingFacebookResponse: state.auth.isWaitingFacebookResponse
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
