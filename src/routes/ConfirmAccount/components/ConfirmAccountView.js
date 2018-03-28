import React, { PropTypes } from 'react'
import ConfirmPasswordForm from '../../../forms/confirmpassword'
import Text from '../../../containers/Text'
import LaddaButton from 'react-ladda'
import { Modal } from 'react-bootstrap'
// import './confirm-account-view.scss'

const ConfirmAccountView = ({ confirmAccount, isConfirmingAccount, location }) => {
  const isRequiresPassword = () => location.query.needs_to_setup_password === 'true'

  let content = <div className="flex-col pal pam-mobile">
    <h3 style={{ color: 'white' }}>
      <Text text="pages.confirm_account.welcome" />
    </h3>
    <LaddaButton
      className="btn btn-primary btn-block"
      loading={isConfirmingAccount}
      onClick={() => confirmAccount(null, location)}
      type="button">
      <Text text="pages.confirm_account.confirm_account" />
    </LaddaButton>
  </div>

  if (isRequiresPassword()) {
    content = <div className="flex-col pal pam-mobile">
      <h3 style={{ color: 'white' }}>
        <Text text="pages.confirm_account.welcome_with_password" />
      </h3>
      <ConfirmPasswordForm
        buttonState={isConfirmingAccount}
        onSubmit={credentials => {
          confirmAccount(credentials, location)
        }} />
    </div>
  }

  return (
    <Modal
      backdrop={true}
      className="confirm-account-background"
      dialogClassName="login-modal hex-modal"
      show={true} >
      <Modal.Body>
        {content}
      </Modal.Body>
    </Modal>
  )
}

ConfirmAccountView.propTypes = {
  confirmAccount: PropTypes.func.isRequired,
  isConfirmingAccount: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired
}

export default ConfirmAccountView
