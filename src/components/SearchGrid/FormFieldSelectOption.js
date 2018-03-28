/* eslint-disable react/jsx-no-bind */

import React, { Component, PropTypes } from 'react'

export default class FormFieldSelectOption extends Component {
  static propTypes = {
    className: PropTypes.string,
    onSelect: PropTypes.func,
    option: PropTypes.object.isRequired,
    isSelected: PropTypes.bool
  }

  onHandleMouseDown(event) {
    event.preventDefault()
    event.stopPropagation()
    this.props.onSelect(this.props.option, event)
  }

  render() {
    const { value, label, iconName } = this.props.option
    const { isSelected } = this.props

    return (
      <div
        className={`
          search-field__select-option
          ${iconName ? 'icon' : ''} ${isSelected ? 'selected' : ''}
        `}
        onMouseDown={this.onHandleMouseDown.bind(this)}>
        {iconName && <i className={`icon-${value}`} />}
        <div>{label}</div>
      </div>
    )
  }
}
