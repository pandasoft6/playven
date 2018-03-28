import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import Text from '../containers/Text'
import FieldRenderer from './FieldRenderer'
import './payment-auth.scss'

const LoginForm = props => {
  const {
    facebookLogin,
    isWaitingFacebookResponse,
    pristine,
    submitting,
    handleSubmit
  } = props

  return (
    <form onSubmit={handleSubmit}>
      <div className="login-modal__password-field flex-row">
        <Field
          className="input-text flex input-text-compact"
          component={FieldRenderer}
          name="email"
          placeholder={Text.t('modals.login.email')}
          type="email" />
      </div>

      <div className="login-modal__password-field flex-row">
        <Field
          className="input-text flex input-text-compact"
          component={FieldRenderer}
          name="password"
          placeholder={Text.t('modals.login.password')}
          type="password" />
      </div>

      <div className="login-modal__buttons flex-row flex-col-mobile mts">
        <button
          className="payment-sign-in-button flex pl-btn-primary"
          disabled={pristine || submitting}
          type="submit">
          <Text text="modals.login.login" />
        </button>
      </div>

      <div className="login-modal__buttons flex-row flex-col-mobile mts">
        <a
          className="payment-fb-link"
          disabled={isWaitingFacebookResponse}
          onClick={facebookLogin}
          type="button">
          <i className="icon-facebook mrt" />
          <Text text="modals.login.login_fb" />
        </a>
      </div>
    </form>
  )
}

LoginForm.propTypes = {
  facebookLogin: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isWaitingFacebookResponse: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
}

// a unique identifier for this form
export default reduxForm({
  form: 'login'
})(LoginForm)
