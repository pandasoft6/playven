import React, { Component, PropTypes } from 'react'
import Select from 'react-select'
import FormFieldSelectOption from './FormFieldSelectOption'

export default class FormFieldSport extends Component {
  static propTypes = {
    getSportNames: PropTypes.func,
    param: PropTypes.string,
    sports: PropTypes.arrayOf(
      PropTypes.object,
    ).isRequired,
    onChange: PropTypes.func
  }

  componentWillMount() {
    if (this.props.getSportNames) {
      this.props.getSportNames()
    }
  }

  render() {
    const { sports, onChange, param } = this.props
    const renderValue = option =>
      <div className="search-field__select-value">
        <i className={`icon-${option.value}`} />
        {option.label}
      </div>

    const modifiedSports = sports.map(sport => (
      { value: sport.sport, iconName: sport.sport, label: sport.localized_name }
    ))

    return (
      <Select
        className="search-field search-field__sport"
        clearable={false}
        name="sport_name"
        onChange={e => onChange(e.value)}
        optionComponent={FormFieldSelectOption}
        options={modifiedSports}
        searchable={false}
        value={param}
        dropdownAutoWidth="true"
        valueRenderer={renderValue} />
    )
  }
}
