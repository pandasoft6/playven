import { connect } from 'react-redux'
import SignIn from '../../../components/Modals/Payment/SignIn'
import { login, onChange, register, facebookLogin } from '../../../actions/auth-actions'
import { changePaymentView } from '../../../actions/booking-actions'

const mapDispatchToProps = {
  login,
  onChange,
  register,
  facebookLogin,
  changePaymentView
}

const mapStateToProps = state => ({
  error: state.auth.messages,
  isWaitingFacebookResponse: state.auth.isWaitingFacebookResponse,
  authLoading: state.booking.authLoading
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn)
