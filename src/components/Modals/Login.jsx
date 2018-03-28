import React from 'react'
import { Modal } from 'react-bootstrap'
import { connectModal } from 'redux-modal'
import Text from '../../containers/Text'
import LoginForm from '../../forms/login'

const Login = ({
  show,
  onChange,
  handleHide,
  facebookLogin,
  isWaitingFacebookResponse,
  login,
  register,
  open,
  error,
  showModal,
  hideModal,
  onSuccess
}) =>
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
          <h2 className="login-modal__title"><Text text="modals.register.sign_in" /></h2>
          <LoginForm
            facebookLogin={facebookLogin}
            isWaitingFacebookResponse={isWaitingFacebookResponse}
            onSubmit={credentials => login({ credentials, onSuccess })} />
          <div className="flex-row flex-col-mobile flex-hc t5 mtm">
            <div className="mrt">
              <Text text="modals.login.signup_message" />
            </div>
            <div>
              <a className="blue-link text-uc"
                onClick={() => hideModal('login') && showModal('register')}>
                <Text text="modals.login.signup" />
              </a>
            </div>
          </div>
          <div className="login-modal__forgot-password t5">
            <a href="#" onClick={() => hideModal('login') && showModal('forgotpassword')}>
              <Text text="modals.login.forgot_password" />
            </a>
          </div>
        </div>
      </div>
    </Modal.Body>
  </Modal>


export default connectModal({
  name: 'login'
})(Login)
