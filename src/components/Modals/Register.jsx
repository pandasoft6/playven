import React from 'react'
import { Modal } from 'react-bootstrap'
import { connectModal } from 'redux-modal'
import Text from '../../containers/Text'
import RegistrationForm from '../../forms/register'
import { I18n } from 'react-redux-i18n'

const Register = ({
  show,
  onChange,
  handleHide,
  facebookLogin,
  register,
  open,
  onSuccess,
  isWaitingFacebookResponse,
  showModal,
  hideModal
}) =>
  <Modal
    backdrop={true}
    dialogClassName="login-modal login-modal__register"
    onHide={handleHide}
    show={show}>
    <i className="icon-cross2 modal-close color-white" onClick={handleHide} />
    <Modal.Body>
      <div className="flex-row">
        <div className="login-modal__bg hide-mobile" />
        <div className="flex flex-col pam">
          <h2 className="login-modal__title"><Text text="modals.login.signup" /></h2>
          <RegistrationForm
            facebookLogin={facebookLogin}
            isWaitingFacebookResponse={isWaitingFacebookResponse}
            onSubmit={credentials => register({ credentials, onSuccess })} />
          <div className="flex-row flex-col-mobile flex-hc t5 mtm">
            <div className="mrt">
              <Text text="modals.register.already_have_account_text" />
            </div>
            <div>
              <a
                className="blue-link text-uc"
                onClick={() => hideModal('register') && showModal('login')}>
                <Text text="modals.register.sign_in" />
              </a>
            </div>
          </div>
          <div className="t5 mtt">
            {I18n.t('modals.register.terms_text_1')}
            {' '}
            <a
              className="blue-link"
              href="/termsofuse">
              {I18n.t('modals.register.terms_text_2')}
            </a>
            {' '}
            {I18n.t('modals.register.terms_text_3')}
            {' '}
            <a
              className="blue-link"
              href="/privacypolicy">
              {I18n.t('modals.register.terms_text_4')}
            </a>
          </div>
        </div>
      </div>
    </Modal.Body>
  </Modal>


export default connectModal({
  name: 'register'
})(Register)
