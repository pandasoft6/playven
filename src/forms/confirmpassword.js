import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import Text from '../containers/Text'
import LaddaButton, { SLIDE_UP } from 'react-ladda'
import FieldRenderer from './FieldRenderer'

// TODO: localisation

const ConfirmPasswordForm = props => {
  const { handleSubmit, pristine, submitting, buttonState } = props

  return (
    <form onSubmit={handleSubmit}>
      <div className="login-modal__password-field flex-row">
        <Field
          className="input-text flex"
          component={FieldRenderer}
          name="password"
          placeholder={Text.t('pages.confirm_account.password')}
          type="password" />
      </div>

      <div className="login-modal__password-field flex-row">
        <Field
          className="input-text flex"
          component={FieldRenderer}
          name="password_confirm"
          placeholder={Text.t('pages.confirm_account.new_password_confirmation')}
          type="password" />
      </div>

      <fieldset className="form-group form-group_btns">
        <LaddaButton
          className="btn btn-primary btn-block"
          data-style={SLIDE_UP}
          disabled={pristine || submitting}
          loading={buttonState}
          type="submit">
          <Text text="pages.confirm_account.create_password" />
        </LaddaButton>
      </fieldset>
    </form>
  )
}

ConfirmPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  buttonState: PropTypes.bool.isRequired
}

// a unique identifier for this form
export default reduxForm({
  form: 'confirmpassword'
})(ConfirmPasswordForm)
