import React, { PropTypes } from 'react'
import Select from 'react-select'
import Text from 'components/Text'
import FormFieldSelectOption from './FormFieldSelectOption'

const FormFieldTime = ({ timetable, param, onChange }) => {
  const modifiedTimetable = timetable.map(time => {
    const sTime = time.toString()
    const hours = sTime.length > 3 ? sTime.substring(0, 2) : `0${sTime[0]}`
    const minutes = sTime.substring(sTime.length - 2)
    return { value: sTime, label: `${hours}:${minutes}` }
  })

  return (
    <Select
      className="search-field search-field__time"
      clearable={false}
      name="time"
      onChange={e => onChange(e.value)}
      optionComponent={FormFieldSelectOption}
      options={modifiedTimetable}
      placeholder={`${Text.t('general.select')}...`}
      searchable={true}
      value={param} />
  )
}

FormFieldTime.propTypes = {
  param: PropTypes.string,
  timetable: PropTypes.arrayOf(
    PropTypes.number
  ).isRequired,
  onChange: PropTypes.func
}


export default FormFieldTime
