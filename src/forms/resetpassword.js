import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import Text from '../containers/Text'
import LaddaButton, { SLIDE_UP } from 'react-ladda'
import FieldRenderer from './FieldRenderer'


// Have to return undefined for redux-form when value is valid
/*eslint-disable */
const required = value => value ? undefined : Text.t('modals.reset_password.required')
const password = value =>
  value && !/^\S*$/.test(value) ?
  Text.t('modals.reset_password.invalid_password') : undefined
const minValue = min => value =>
  value && value.length < min ? Text.t('modals.reset_password.short_password') : undefined
const minValue8 = minValue(8)
/*eslint-enable */


const ResetPasswordForm = ({ handleSubmit, pristine, submitting, isRequestingToResetPassword }) =>
  <form onSubmit={handleSubmit}>
    <h2 style={{ textAlign: 'center', color: 'white' }}>
      <Text text="modals.reset_password.title" />
    </h2>
    <div className="login-modal__password-field flex-row">
      <Field
        className="input-text flex"
        component={FieldRenderer}
        name="password"
        placeholder={Text.t('modals.reset_password.new_password')}
        type="password"
        validate={[required, password, minValue8]} />
    </div>

    <div className="login-modal__password-field flex-row">
      <Field
        className="input-text flex"
        component={FieldRenderer}
        name="password_confirm"
        placeholder={Text.t('modals.reset_password.new_password_confirmation')}
        type="password"
        validate={[required, password, minValue8]} />
    </div>

    <fieldset className="form-group form-group_btns" style={{ marginTop: '30px' }}>
      <LaddaButton
        className="btn btn-primary btn-block"
        data-style={SLIDE_UP}
        disabled={pristine || submitting}
        loading={isRequestingToResetPassword}
        style={{ height: '50px', backgroundColor: '#0e7dff', borderColor: '#0e7dff' }}
        type="submit" >
        <Text text="modals.reset_password.change_password" />
      </LaddaButton>
    </fieldset>
  </form>

ResetPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  isRequestingToResetPassword: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'resetpassword'
})(ResetPasswordForm)
