import React, { PropTypes } from 'react'
import { Modal } from 'react-bootstrap'
import Text from '../../../containers/Text'
import RegistrationForm from '../../../forms/signuppayment'
import Fa from 'react-fontawesome'

const SignUp = ({ facebookLogin, register, isWaitingFacebookResponse,
changePaymentView, authLoading }) =>

  <Modal.Body style={{ minHeight: '100vh', height: 'auto' }}>
    <div className="payment-sign-in">
      <div
        className="color-bg-white flex-col pam pam-mobile">
        <h2
          className="flex-row flex-hs color-dark-grey text-uc em-high mbt"
          style={{ margin: 'auto' }}>
          SIGN UP
        </h2>
        {!authLoading && !isWaitingFacebookResponse &&
          <div>
            <RegistrationForm
              facebookLogin={() => facebookLogin(() => changePaymentView('content'))}
              isWaitingFacebookResponse={isWaitingFacebookResponse}
              onSubmit={credentials => register({
                credentials,
                onSuccess: () => changePaymentView('content')
              })} />
            <div style={{ marginTop: '4rem' }}>
              <a className="blue-link"
                onClick={() => changePaymentView('signin')}>
                <Text text="modals.register.already_have_account" />
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

SignUp.propTypes = {
  facebookLogin: PropTypes.func.isRequired,
  isWaitingFacebookResponse: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
  changePaymentView: PropTypes.func.isRequired,
  authLoading: PropTypes.bool.isRequired
}


export default SignUp
