import React, { PropTypes } from 'react'
import { Modal } from 'react-bootstrap'
import Text from '../../../containers/Text'
import LoginForm from '../../../forms/signinpayment'
import Fa from 'react-fontawesome'

const SignInPayment = ({ facebookLogin, isWaitingFacebookResponse,
login, changePaymentView, authLoading }) =>

  <Modal.Body style={{ minHeight: '100vh', height: 'auto' }}>
    <div className="payment-sign-in">
      <div
        className="color-bg-white flex-col pam pam-mobile">
        <h2
          className="flex-row flex-hs color-dark-grey text-uc em-high mbt"
          style={{ margin: 'auto' }}>
          SIGN IN
        </h2>
        {!authLoading && !isWaitingFacebookResponse &&
          <div>
            <LoginForm
              facebookLogin={() => facebookLogin(() => changePaymentView('content'))}
              isWaitingFacebookResponse={isWaitingFacebookResponse}
              onSubmit={credentials => login({
                credentials,
                onSuccess: () => changePaymentView('content')
              })} />
            <div style={{ marginTop: '3rem' }}>
              <a className="blue-link"
                onClick={() => changePaymentView('signup')}>
                <Text text="modals.login.no_account" />
              </a>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <a className="blue-link"
                onClick={() => changePaymentView('forgot_password')}>
                <Text text="modals.login.forgot_password" />
              </a>
            </div>
          </div>
        }
        {(authLoading || isWaitingFacebookResponse) &&
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

SignInPayment.propTypes = {
  facebookLogin: PropTypes.func.isRequired,
  isWaitingFacebookResponse: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  changePaymentView: PropTypes.func.isRequired,
  authLoading: PropTypes.bool.isRequired
}

export default SignInPayment
