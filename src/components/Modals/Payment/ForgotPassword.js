import React, { PropTypes } from 'react'
import { Modal } from 'react-bootstrap'
import ForgotPasswordForm from '../../../forms/forgotpassword'
import Fa from 'react-fontawesome'

const ForgotPassword = ({ forgotPassword, isResetPassword }) =>

  <Modal.Body style={{ minHeight: '100vh', height: 'auto' }}>
    <div className="payment-sign-in">
      <div
        className="color-bg-white flex-col pam pam-mobile">
        {!isResetPassword &&
          <div>
            <ForgotPasswordForm
              buttonState={isResetPassword}
              onSubmit={credentials => forgotPassword(credentials)
              } />
          </div>
        }
        {isResetPassword &&
          <div className="payment-modal__spinner flex-row flex-vc" style={{ marginTop: '150px' }}>
            <Fa className="color-primary-brand"
              name="refresh"
              spin={true}
              stack="2x" />
          </div>
        }
      </div>
    </div>
  </Modal.Body>

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  isResetPassword: PropTypes.bool.isRequired
}

export default ForgotPassword
