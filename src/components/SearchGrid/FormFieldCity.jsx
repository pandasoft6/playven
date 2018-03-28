import React, { PropTypes } from 'react'
import Select from 'react-select'
import Text from 'components/Text'
import FormFieldSelectOption from './FormFieldSelectOption'

class FormFieldCity extends React.Component {
  componentDidMount() {
    const { getAllCities, citiesList, countryId } = this.props

    if (!citiesList || citiesList.length === 0) {
      getAllCities(countryId)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { getAllCities, countryId } = this.props

    if (countryId && countryId !== nextProps.countryId) {
      getAllCities(nextProps.countryId)
    }
  }


  render() {
    const { param, onChange, citiesList } = this.props
    const mappedCities = citiesList.map(city =>
      ({ value: city, label: city })
    )

    return (
      <Select
        className="search-field search-field__city"
        clearable={false}
        name="city"
        onChange={e => onChange(e.value)}
        optionComponent={FormFieldSelectOption}
        options={mappedCities}
        placeholder={`${Text.t('general.select')}...`}
        searchable={true}
        value={param} />
    )
  }
}

FormFieldCity.propTypes = {
  param: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  getAllCities: PropTypes.func.isRequired,
  citiesList: PropTypes.arrayOf(PropTypes.object),
  countryId: PropTypes.number.isRequired
}


export default FormFieldCity
