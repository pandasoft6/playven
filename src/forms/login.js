import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import Text from '../containers/Text'
import FieldRenderer from './FieldRenderer'


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
      <div className="login-modal__email-field flex-row">
        <Field
          className="input-text flex"
          component={FieldRenderer}
          name="email"
          placeholder={Text.t('modals.login.email')}
          type="email" />
      </div>

      <div className="login-modal__password-field flex-row">
        <Field
          className="input-text flex"
          component={FieldRenderer}
          name="password"
          placeholder={Text.t('modals.login.password')}
          type="password" />
      </div>

      <div className="login-modal__buttons flex-col mtm">
        <button
          className="login-modal__login-button flex bd-btn-primary mbs"
          disabled={pristine || submitting}
          type="submit">
          <Text text="modals.login.login" />
        </button>

        <button
          className="login-modal__facebook-button"
          disabled={isWaitingFacebookResponse}
          onClick={facebookLogin}
          type="button">
          <i className="icon-facebook mrt" />
          <Text text="modals.login.login_fb" />
        </button>
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
