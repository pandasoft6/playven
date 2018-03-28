import { connect } from 'react-redux'
import ResetPassword from '../components/ResetPassword.jsx'
import { resetPassword } from '../../../api/profile-api'

const mapStateToProps = state => ({
  isRequestingToResetPassword: state.auth.isRequestingToResetPassword
})

const mapDispatchToProps = {
  resetPassword
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
