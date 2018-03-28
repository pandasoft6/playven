import React, { PropTypes } from 'react'
import { Field, FormSection, reduxForm } from 'redux-form'
import Text from '../containers/Text'
import FieldRenderer from './FieldRenderer'
import './payment-auth.scss'

const RegistrationForm = props => {
  const {
    handleSubmit,
    pristine,
    submitting,
    facebookLogin,
    isWaitingFacebookResponse } = props

  return (
    <form onSubmit={handleSubmit}>
      <FormSection name="user">
        <div className="login-modal__password-field flex-row">
          <Field
            className="input-text flex input-text-compact"
            component={FieldRenderer}
            name="first_name"
            placeholder={Text.t('modals.register.first_name')}
            type="text" />
        </div>

        <div className="login-modal__password-field flex-row">
          <Field
            className="input-text flex input-text-compact"
            component={FieldRenderer}
            name="last_name"
            placeholder={Text.t('modals.register.last_name')}
            type="text" />
        </div>

        <div className="login-modal__password-field flex-row">
          <Field
            className="input-text flex input-text-compact"
            component={FieldRenderer}
            name="email"
            placeholder={Text.t('modals.register.email')}
            type="email" />
        </div>

        <div className="login-modal__password-field flex-row">
          <Field
            className="input-text flex input-text-compact"
            component={FieldRenderer}
            name="password"
            placeholder={Text.t('modals.register.password')}
            type="password" />
        </div>

        <div className="login-modal__password-field flex-row">
          <Field
            className="input-text flex input-text-compact"
            component={FieldRenderer}
            name="password_confirmation"
            placeholder={Text.t('modals.register.password_confirmation')}
            type="password" />
        </div>
      </FormSection>


      <div className="login-modal__buttons flex-row flex-col-mobile mts">
        <button
          className="payment-sign-in-button flex pl-btn-primary"
          disabled={pristine || submitting}
          type="submit">
          <Text text="modals.signup.signup" />
        </button>
      </div>

      <div className="login-modal__buttons flex-row flex-col-mobile mts">
        <a
          className="payment-fb-link"
          disabled={isWaitingFacebookResponse}
          onClick={facebookLogin}
          type="button">
          <i className="icon-facebook mrt" />
          <Text text="modals.signup.facebook" />
        </a>
      </div>
    </form>
  )
}

RegistrationForm.propTypes = {
  facebookLogin: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isWaitingFacebookResponse: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
}

// a unique identifier for this form
export default reduxForm({
  form: 'register'
})(RegistrationForm)
