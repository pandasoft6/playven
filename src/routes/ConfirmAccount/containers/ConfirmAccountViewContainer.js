import { connect } from 'react-redux'
import ConfirmAccountView from '../components/ConfirmAccountView'
import { confirmAccount } from '../../../api/auth-api'

const mapDispatchToProps = {
  confirmAccount
}

const mapStateToProps = state => ({
  isConfirmingAccount: state.auth.isRequestingToConfirmAccount,
  locale: state.i18n.locale
})

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmAccountView)
