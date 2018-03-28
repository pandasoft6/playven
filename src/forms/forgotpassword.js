import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import Text from '../containers/Text'
import LaddaButton, { SLIDE_UP } from 'react-ladda'
import FieldRenderer from './FieldRenderer'


const ForgotPasswordForm = props => {
  const { handleSubmit, pristine, submitting, buttonState } = props

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="form-group">
        <h2><Text text="modals.login.forgot_your_password" /></h2>
      </fieldset>

      <div className="flex-row">
        <Field
          className="input-text flex"
          component={FieldRenderer}
          name="email"
          placeholder={Text.t('modals.login.email')}
          type="email" />
      </div>


      <fieldset className="form-group form-group_btns" style={{ marginTop: '30px' }}>
        <LaddaButton
          className="bd-btn-primary"
          data-style={SLIDE_UP}
          disabled={pristine || submitting}
          loading={buttonState}
          type="submit">
          <Text text="modals.login.reset_password_instructions" />
        </LaddaButton>
      </fieldset>
    </form>
  )
}

ForgotPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  buttonState: PropTypes.bool.isRequired
}

// a unique identifier for this form
export default reduxForm({
  form: 'forgotpassword'
})(ForgotPasswordForm)
