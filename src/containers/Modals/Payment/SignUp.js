import { connect } from 'react-redux'
import SignUp from '../../../components/Modals/Payment/SignUp'
import { changePaymentView } from '../../../actions/booking-actions'
import {
  register,
  onChange,
  ON_REGISTER_INPUT_CHANGE,
  facebookLogin
} from '../../../actions/auth-actions'

const mapDispatchToProps = {
  register,
  onChange: e => onChange(e, ON_REGISTER_INPUT_CHANGE),
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
)(SignUp)
