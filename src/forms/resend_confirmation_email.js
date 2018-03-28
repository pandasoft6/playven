import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import Text from '../containers/Text'
import LaddaButton, { SLIDE_UP } from 'react-ladda'

const ResendConfirmationEmailForm = ({ handleSubmit, buttonState }) =>
  <form onSubmit={handleSubmit}>
    <fieldset className="form-group form-group_btns">
      <LaddaButton
        className="bd-btn-primary"
        data-style={SLIDE_UP}
        loading={buttonState}
        type="submit" >
        <Text text="modals.resend_confirmation.resend_email" />
      </LaddaButton>
    </fieldset>
  </form>

ResendConfirmationEmailForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  buttonState: PropTypes.bool.isRequired
}

// a unique identifier for this form
export default reduxForm({
  form: 'resendconfirmationemail'
})(ResendConfirmationEmailForm)
