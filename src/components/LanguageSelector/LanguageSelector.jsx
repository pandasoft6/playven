import React, { PropTypes } from 'react'
import { OverlayTrigger } from 'react-bootstrap'
import Languages from './Languages'

const LanguageSelector = ({ changeLocale, locale }) =>
  <OverlayTrigger
    id="language-selector"
    overlay={
      <Languages
        changeLocale={changeLocale}
        className="language-selector__languages"
        id="language-selector-popover"
        locale={locale} />
    }
    placement="bottom"
    rootClose={true}
    trigger="click">
    <button
      aria-describedby="language-selector"
      className="language-selector__button"
      style={{
        marginLeft: '0rem',
        borderBottomLeftRadius: '0rem',
        borderTopLeftRadius: '0rem'
      }}>
      {locale === 'fi' ? 'Suomi' : 'English'}
    </button>
  </OverlayTrigger>

LanguageSelector.propTypes = {
  changeLocale: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired
}

export default LanguageSelector
