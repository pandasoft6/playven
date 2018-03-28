/* eslint-disable react/jsx-no-bind */

import React, { Component, PropTypes } from 'react'
import Text from 'containers/Text'

export default class CardDialogOption extends Component {
  static propTypes = {
    className: PropTypes.string,
    onSelect: PropTypes.func,
    option: PropTypes.object.isRequired
  }

  onHandleMouseDown(event) {
    event.preventDefault()
    event.stopPropagation()
    this.props.onSelect(this.props.option, event)
  }

  render() {
    const { last4, brand, expMonth, expYear } = this.props.option
    const end = Text.t('general.ending')

    return (
      <div className={this.props.className} onMouseDown={this.onHandleMouseDown.bind(this)}>
        <div className="card_block flex-row text-uc color-white">
          <div className="card_block__title">{brand} {last4}</div>
          <div className="card_block__right flex-row">
            <div className="card_block__card_exp mlt">
              {`${end} ${expMonth}/${expYear.toString().slice(2)}`}
            </div>
            <button className="card_block__use_card mls text-uc">
              <Text text="modals.payment.use_card" />
            </button>
          </div>
        </div>
      </div>
    )
  }
}
