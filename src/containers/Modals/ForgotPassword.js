import { connect } from 'react-redux'
import ForgotPassword from 'components/Modals/ForgotPassword'
import { forgotPassword } from '../../actions/auth-actions'

const mapDispatchToProps = {
  forgotPassword: emailHash => forgotPassword({ user: emailHash })
}

const mapStateToProps = state => ({
  isResetPassword: state.auth.isRequestingToResetPassword
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
