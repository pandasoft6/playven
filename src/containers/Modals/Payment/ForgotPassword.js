import { connect } from 'react-redux'
import ForgotPassword from 'components/Modals/Payment/ForgotPassword'
import { forgotPassword } from '../../../actions/auth-actions'
import { changePaymentView } from '../../../actions/booking-actions'

const mapDispatchToProps = {
  forgotPassword: emailHash => forgotPassword({
    user: emailHash,
    onSuccess: () => changePaymentView('signin')
  })
}

const mapStateToProps = state => ({
  isResetPassword: state.auth.isRequestingToResetPassword
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
