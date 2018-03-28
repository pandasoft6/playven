import React, { PropTypes } from 'react'
import { connectModal } from 'redux-modal'
import { Modal } from 'react-bootstrap'
import ForgotPasswordForm from 'forms/forgotpassword'

const ForgotPassword = ({ show, handleHide, forgotPassword, isResetPassword }) =>
  <Modal
    backdrop={true}
    dialogClassName="login-modal"
    onHide={handleHide}
    show={show}>
    <i className="icon-cross2 modal-close color-white" onClick={handleHide} />
    <Modal.Body>
      <div className="flex-row">
        <div className="login-modal__bg hide-mobile" />
        <div className="flex flex-col flex-vc pam">
          <ForgotPasswordForm
            buttonState={isResetPassword}
            onSubmit={credentials => {
              forgotPassword(credentials)
            }} />
        </div>
      </div>
    </Modal.Body>
  </Modal>

ForgotPassword.propTypes = {
  show: PropTypes.bool.isRequired,
  handleHide: PropTypes.func.isRequired,
  forgotPassword: PropTypes.func.isRequired,
  isResetPassword: PropTypes.bool.isRequired
}

export default connectModal({
  name: 'forgotpassword'
})(ForgotPassword)
