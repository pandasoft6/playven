import React, { PropTypes } from 'react'
import { connectModal } from 'redux-modal'
import { Modal } from 'react-bootstrap'
import UpdatePasswordForm from 'forms/updatepassword'

const UpdatePassword = ({ show, handleHide, updatePassword, isUpdatingPassword, userId }) =>
  <Modal
    backdrop={true}
    dialogClassName="login-modal hex-modal"
    onHide={handleHide}
    show={show}>
    <i className="icon-hex-close modal-close color-white" onClick={handleHide} />
    <Modal.Body>
      <div className="flex-col pal pam-mobile">
        <div className="flex-row flex-hc">
          <i className="icon-logo-playven color-primary-brand" />
        </div>

        <UpdatePasswordForm
          buttonState={isUpdatingPassword}
          onSubmit={credentials => {
            updatePassword(credentials, userId)
          }} />
      </div>
    </Modal.Body>
  </Modal>

UpdatePassword.propTypes = {
  show: PropTypes.bool.isRequired,
  handleHide: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  isUpdatingPassword: PropTypes.bool.isRequired
}

export default connectModal({
  name: 'updatepassword'
})(UpdatePassword)
