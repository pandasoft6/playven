import React, { PropTypes } from 'react'
import { Popover } from 'react-bootstrap'

const Countries = props => {
  const {
    arrowOffsetLeft,
    arrowOffsetTop,
    bsClass,
    id,
    placement,
    positionLeft,
    positionTop,
    title,
    className,
    chosenCountryId,
    countryList,
    onClick
  } = props
  const popoverProps = {
    arrowOffsetLeft,
    arrowOffsetTop,
    bsClass,
    id,
    placement,
    positionLeft,
    positionTop,
    title,
    className
  }

  const buttons = countryList.map((country, i) =>
    <button
      className={`color-white ${country.id === chosenCountryId ? 'selected' : ''}`}
      disabled={country.id === chosenCountryId === 'en'}
      key={i}
      onClick={() => onClick(country.id)}>
      {country.name}
    </button>
  )

  return (
    <Popover {...popoverProps}>
      {buttons}
    </Popover>
  )
}

Countries.propTypes = {
  onClick: PropTypes.func.isRequired,
  chosenCountryId: PropTypes.number.isRequired,
  countryList: PropTypes.arrayOf(PropTypes.object),
  arrowOffsetLeft: PropTypes.string,
  arrowOffsetTop: PropTypes.string,
  bsClass: PropTypes.string,
  id: PropTypes.string,
  placement: PropTypes.string,
  positionLeft: PropTypes.number,
  positionTop: PropTypes.number,
  title: PropTypes.string,
  className: PropTypes.string
}

export default Countries
