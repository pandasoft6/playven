import React, { Component, PropTypes } from 'react'
import Text from '../../../containers/Text'
import { FILTER_TYPE } from '../modules/profile'

export default class CourtCardPopoverContent extends Component {
  static propTypes = {
    reservation: PropTypes.object.isRequired,
    filter: PropTypes.object.isRequired,
    cancelReservation: PropTypes.func.isRequired,
    resellReservation: PropTypes.func.isRequired,
    addToCalendar: PropTypes.func.isRequired
  }

  state = {
    showMessage: false
  }

  renderCancel() {
    if (this.props.reservation.isRecurring) {
      return null
    }

    if (this.props.reservation.cancelMessage) {
      return null
    }

    return (
      <div
        className="court-card-popover__action-item"
        onClick={this.onShowMessage}>
        <i className="icon-cancel" />
        <span>
          <Text text="pages.profile.cancel" />
        </span>
      </div>
    )
  }

  renderResell() {
    if (!this.props.reservation.isRecurring) {
      return null
    }

    if (this.props.filter.type !== FILTER_TYPE.RECURRING_RESERVATIONS) {
      return null
    }

    if (!this.props.reservation.isFuture) {
      return null
    }

    return (
      <div
        className="court-card-popover__action-item"
        onClick={this.onShowMessage}>
        <i className="icon-law" />
        <span>
          <Text text="pages.profile.resell_booking" />
        </span>
      </div>
    )
  }

  renderCancelResell() {
    if (!this.props.reservation.isFuture) {
      return null
    }

    if (this.props.filter.type !== FILTER_TYPE.RESELLING_RECURRING_RESERVATIONS) {
      return null
    }

    return (
      <div
        className="court-card-popover__action-item"
        onClick={this.onShowMessage}>
        <i className="icon-cancel" />
        <span>
          <Text text="pages.profile.cancel_resell" />
        </span>
      </div>
    )
  }

  renderMessage({ text, onConfirm }) {
    if (!this.state.showMessage) {
      return null
    }

    return (
      <div>
        <div className="court-card-popover__message">
          <span><Text text={text} /></span>
        </div>
        <div className="court-card-popover__buttons">
          <button onClick={() => onConfirm(this.props.reservation)}>
            <div>
              <i className="icon-checked" />
              <span>
                <Text text="pages.profile.confirm" />
              </span>
            </div>
          </button>
          <button onClick={this.onHideMessage}>
            <div>
              <i className="icon-rounded-cross" />
              <span>
                <Text text="pages.profile.decline" />
              </span>
            </div>
          </button>
        </div>
      </div>
    )
  }

  onShowMessage = () =>
    this.setState({ showMessage: true })

  onHideMessage = () =>
    this.setState({ showMessage: false })

  render() {
    const {
      reservation,
      cancelReservation,
      resellReservation,
      addToCalendar } = this.props

    return (
      <div className="court-card-popover">
        {reservation.isRecurring &&
        <div className="court-card-popover__header flex-row">
          <i className="icon-recurring" />
          <div>
            <Text text="pages.profile.recurring_description" />
          </div>
        </div>}
        {reservation.cancelMessage &&
        !this.props.reservation.isRecurring &&
        <div className="court-card-popover__header flex-row">
          <div>
            {reservation.cancelMessage}
          </div>
        </div>}
        <div className="court-card-popover__action-list">
          <div
            className="court-card-popover__action-item"
            onClick={() => addToCalendar(reservation)}>
            <i className="icon-calendar-new" />
            <span>
              <Text text="pages.profile.add_to_calendar" />
            </span>
          </div>
          {this.renderResell()}
          {this.renderCancelResell()}
          {this.renderCancel()}
        </div>
        {reservation.isRecurring &&
        this.props.filter.type === FILTER_TYPE.RECURRING_RESERVATIONS &&
        this.renderMessage({
          text: 'pages.profile.resell_question',
          onConfirm: resellReservation
        })}
        {this.props.filter.type === FILTER_TYPE.RESELLING_RECURRING_RESERVATIONS &&
        this.renderMessage({
          text: 'pages.profile.resell_cancel_question',
          onConfirm: resellReservation
        })}
        {!reservation.isRecurring && this.renderMessage({
          text: 'pages.profile.cancel_question',
          onConfirm: cancelReservation
        })}
      </div>
    )
  }
}
