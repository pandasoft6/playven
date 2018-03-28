import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import ReactLadda, { SLIDE_UP } from 'react-ladda'
import Text from '../../../containers/Text'
import CardDialog from '../../../components/Modals/Payment/CardDialog'
import FieldRenderer from '../../../forms/FieldRenderer/'

// TODO onChange is not updating correctly, FIX!
// TODO pass proper selectCard action to CardDialog

class EditInformation extends Component {
  constructor(props) {
    super(props)
    this.showUpdatePasswordModal = this.showUpdatePasswordModal.bind(this)
  }

  componentDidMount() {
    this.handleInitialize()
  }

  showUpdatePasswordModal(e) {
    const { show } = this.props

    show('updatepassword')
    e.preventDefault()
  }

  handleInitialize() {
    /*eslint-disable */
    const initData = {
      first_name: this.props.user.first_name,
      last_name: this.props.user.last_name,
      email: this.props.user.email,
      phone_number: this.props.user.phone_number,
      street_address: this.props.user.street_address,
      zipcode: this.props.user.zipcode,
      city: this.props.user.city
    }
    /*eslint-enable */
    this.props.initialize(initData)
  }

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      isEditingProfile,
      isUpdatingPassword,
      addCard,
      cards,
      getCards,
      loaded,
      onCardAdd,
      selectCard,
      selectedCard,
      user
    } = this.props

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="edit-information">
            <div className="edit-information__section section_edit_information">
              <h4 className="edit-information__section-title">
                <Text text="pages.profile.edit_form.title" />
              </h4>
              <span className="edit-information__last_update">last updated april 4th, 2017</span>
            </div>

            <div className="flex-row flex-col-mobile">
              <Field
                className="input-text flex"
                component={FieldRenderer}
                name="first_name"
                placeholder={Text.t('pages.profile.edit_form.first_name')}
                type="text" />
              <Field
                className="input-text flex"
                component={FieldRenderer}
                name="last_name"
                placeholder={Text.t('pages.profile.edit_form.last_name')}
                type="text" />
            </div>

            <div className="flex-row flex-col-mobile">
              <Field
                className="input-text flex"
                component={FieldRenderer}
                name="email"
                placeholder={Text.t('pages.profile.edit_form.email')}
                type="email" />
              <Field
                className="input-text flex"
                component={FieldRenderer}
                name="phone_number"
                placeholder={Text.t('pages.profile.edit_form.phone')}
                type="text" />
            </div>

            <div className="flex-row flex-col-mobile">
              <Field
                className="input-text flex"
                component={FieldRenderer}
                name="street_address"
                placeholder={Text.t('pages.profile.edit_form.street_address')}
                type="text" />
              <Field
                className="input-text flex"
                component={FieldRenderer}
                name="zipcode"
                placeholder={Text.t('pages.profile.edit_form.zip')}
                type="text" />
            </div>

            <div className="flex-row flex-col-mobile">
              <Field
                className="input-text flex"
                component={FieldRenderer}
                name="city"
                placeholder={Text.t('pages.profile.edit_form.city')}
                type="text" />
            </div>

            <div className="edit-information__section section_password">
              <h4 className="edit-information__section-title">
                <Text text="pages.profile.edit_form.password" />
              </h4>
            </div>

            <div className="flex-row flex-col-mobile">
              <Field
                className="input-text flex"
                component={FieldRenderer}
                name="current_password"
                placeholder={Text.t('pages.profile.edit_form.old_password')}
                type="password" />
              <Field
                className="input-text flex"
                component={FieldRenderer}
                name="password"
                placeholder={Text.t('pages.profile.edit_form.new_password')}
                type="password" />
              <Field
                className="input-text flex"
                component={FieldRenderer}
                name="password_confirmation"
                placeholder={Text.t('pages.profile.edit_form.new_password_confirmation')}
                type="password" />
              <div>
                {isUpdatingPassword && <i
                  className="fa fa-refresh fa-spin fa-1x fa-fw"
                  style={{ width: '100%', fontSize: '2rem' }} />
                }
              </div>
            </div>

            <div className="mtm">
              <div className="edit-information__section section_payment_method">
                <h4 className="edit-information__section-title">
                  <Text text="pages.profile.edit_form.payment_title" />
                </h4>
              </div>
              <div className="flex-row flex-col-mobile">
                <div className="section_payment_method__description">
                  <Text text="pages.profile.edit_form.payment_method_description" />
                </div>
                <div className="section_payment_method__card_dialog">
                  <CardDialog
                    addCard={addCard}
                    cards={cards}
                    getCards={getCards}
                    isProfile={true}
                    loaded={loaded}
                    onCardAdd={onCardAdd}
                    selectCard={selectCard}
                    selectedCard={selectedCard}
                    user={user} />
                  {loaded && <i
                    className="fa fa-refresh fa-spin fa-1x fa-fw"
                    style={{ width: '100%', fontSize: '2rem' }} />
                  }
                  <div className="section_payment_method__card_description">
                    <i className="icon-lock" />
                    {' '}
                    <Text text="pages.profile.edit_form.payment_method_card_description" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-row flex-hc">
            <ReactLadda
              className="bd-btn-primary"
              data-style={SLIDE_UP}
              disabled={pristine || submitting}
              loading={isEditingProfile || isUpdatingPassword}
              type="submit">
              <Text text="pages.profile.edit_form.save_changes" />
            </ReactLadda>
          </div>
        </form>
      </div>
    )
  }
}

EditInformation.propTypes = {
  show: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  isEditingProfile: PropTypes.bool.isRequired,
  isUpdatingPassword: PropTypes.bool.isRequired,
  addCard: PropTypes.func.isRequired,
  // eslint-disable-next-line
  cards: PropTypes.array,
  getCards: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired,
  onCardAdd: PropTypes.func,
  selectCard: PropTypes.func.isRequired,
  selectedCard: PropTypes.string,
  user: PropTypes.object.isRequired,
  initialize: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'editinformation'
})(EditInformation)
