import React, { PropTypes } from 'react'
import { connectModal } from 'redux-modal'
import { Modal } from 'react-bootstrap'
import Text from 'containers/Text'
import ResendConfirmationEmailForm from 'forms/resend_confirmation_email'

export class ResendConfirmationEmail extends React.Component {
  render() {
    const { show, handleHide, resendConfirmationEmail, email, isRequestingToResend } = this.props
    const emailObj = { user: { email } }

    return (
      <Modal
        backdrop={true}
        dialogClassName="login-modal"
        onHide={handleHide}
        show={show} >
        <i className="icon-cross2 modal-close color-white" onClick={handleHide} />
        <Modal.Body>
          <div className="flex-row">
            <div className="login-modal__bg hide-mobile" />
            <div className="flex flex-col flex-vc pam">
              <h2 className="login-modal__title">
                <Text text="modals.resend_confirmation.title" />
              </h2>
              <div className="login-modal__error color-red-error mvm">
                <Text text="modals.resend_confirmation.description" />
              </div>
              <ResendConfirmationEmailForm
                buttonState={isRequestingToResend}
                onSubmit={() => resendConfirmationEmail(emailObj)} />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

ResendConfirmationEmail.propTypes = {
  show: PropTypes.bool.isRequired,
  handleHide: PropTypes.func.isRequired,
  resendConfirmationEmail: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  isRequestingToResend: PropTypes.bool.isRequired
}

export default connectModal({
  name: 'resendconfirmationemail'
})(ResendConfirmationEmail)
