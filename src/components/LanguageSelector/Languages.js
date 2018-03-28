import React, { PropTypes } from 'react'
import { Popover } from 'react-bootstrap'

const Languages = props => {
  const {
    arrowOffsetLeft,
    arrowOffsetTop,
    bsClass,
    id,
    placement,
    positionLeft,
    positionTop,
    title,
    changeLocale,
    locale,
    className
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

  return (
    <Popover {...popoverProps}>
      <button
        className={`color-white ${locale === 'fi' ? 'selected' : ''}`}
        disabled={locale === 'fi'}
        onClick={() => changeLocale('fi', true)}>
        Suomi
      </button>
      <button
        className={`color-white ${locale === 'en' ? 'selected' : ''}`}
        disabled={locale === 'en'}
        onClick={() => changeLocale('en', true)}>
        English
      </button>
    </Popover>
  )
}

Languages.propTypes = {
  changeLocale: PropTypes.func.isRequired,
  locale: PropTypes.string,
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

export default Languages
