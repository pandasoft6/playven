import React, { PropTypes } from 'react'
import Fields from '../../containers/SearchGrid/SearchFields'
import FormFieldCity from './FormFieldCity'
import classname from 'classname'

const SearchGrid = ({
  className, onSubmit, onClickSubmit, preselectedSport, preselectedDate,
  preselectedTime, preselectedDuration, preselectedCity, changeSport,
  changeDuration, changeTime, changeDate, changeCity, citiesList, getAllCities,
  countryId
}) => {
  const onFormSubmit = e => {
    onSubmit(e)
    if (onClickSubmit) {
      onClickSubmit()
    }
  }

  return (
    <form
      className={classname('venue-search-bar-wrapper', className)}
      onSubmit={onFormSubmit}
      role="search">
      <div className="venue-search-bar">
        <Fields.Sport onChange={changeSport} param={preselectedSport} />
        <FormFieldCity citiesList={citiesList} countryId={countryId}
                       getAllCities={getAllCities} onChange={changeCity} param={preselectedCity} />
        <Fields.Time onChange={changeTime} param={preselectedTime} />
        <Fields.Duration onChange={changeDuration} param={preselectedDuration} />
        <Fields.Date onChange={date => changeDate(date)} param={preselectedDate} />
      </div>
      <Fields.Submit />
    </form>
  )
}


SearchGrid.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClickSubmit: PropTypes.func,
  className: PropTypes.string,
  preselectedSport: PropTypes.string,
  preselectedDate: PropTypes.string,
  preselectedDuration: PropTypes.string,
  preselectedTime: PropTypes.string,
  preselectedCity: PropTypes.string,
  changeDuration: PropTypes.func,
  changeTime: PropTypes.func,
  changeSport: PropTypes.func,
  changeDate: PropTypes.func,
  changeCity: PropTypes.func,
  citiesList: PropTypes.arrayOf(PropTypes.object),
  getAllCities: PropTypes.func.isRequired,
  countryId: PropTypes.number.isRequired
}

export default SearchGrid
