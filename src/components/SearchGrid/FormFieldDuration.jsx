import React, { PropTypes } from 'react'
import Select from 'react-select'
import FormFieldSelectOption from './FormFieldSelectOption'

const FormFieldDuration = ({ durations, param, onChange }) => {
  const modifiedDurations = durations.map(duration =>
    ({ value: duration.id, label: duration.text }))

  return (
    <Select
      className="search-field search-field__duration"
      clearable={false}
      name="duration"
      onChange={e => onChange(e.value)}
      optionComponent={FormFieldSelectOption}
      options={modifiedDurations}
      searchable={true}
      value={param} />
  )
}

FormFieldDuration.propTypes = {
  param: PropTypes.string,
  durations: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  onChange: PropTypes.func
}


export default FormFieldDuration


// import React, { PropTypes } from 'react'
// import Select2 from 'react-select2-wrapper'
//
// const template = data => {
//  const [num, text] = data.text.split(' ')
//
//  return `<span class='select-num'> ${num} </span><span class='select-one'>${text}</span>`
// }
//
// const FormFieldDuration = ({ durations, param = 60, onChange }) =>
//  <div>
//    <Select2
//      className="form-control"
//      data={durations}
//      name="duration"
//      options={{
//        hideSelectionFromResult: true,
//        escapeMarkup: markup => markup,
//        minimumResultsForSearch: 'Infinity',
//        templateResult: template,
//        templateSelection: template
//      }}
//      onChange={onChange}
//      style={{ width: '100%' }}
//      value={param} />
//  </div>
//
// FormFieldDuration.propTypes = {
//  durations: PropTypes.arrayOf(
//    PropTypes.object
//  ).isRequired,
//  param: PropTypes.string
// }
//
// export default FormFieldDuration
