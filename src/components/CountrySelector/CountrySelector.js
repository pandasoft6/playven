import React, { Component, PropTypes } from 'react'
import { OverlayTrigger } from 'react-bootstrap'
import Countries from './Countries'

class CountrySelector extends Component {
  constructor(props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }

  onClick(countryId) {
    const { changeCountry } = this.props

    this.overlay.hide()
    changeCountry(countryId)
  }

  render() {
    const { chosenCountryId, countryList } = this.props
    const selectedCountry = countryList.find(country =>
      country.id === parseInt(chosenCountryId, 10)
    )

    return (
      <OverlayTrigger
        id="language-selector"
        overlay={
          <Countries
            chosenCountryId={chosenCountryId}
            className="language-selector__languages"
            countryList={countryList}
            id="language-selector-popover"
            onClick={this.onClick} />
      }
        placement="bottom"
        ref={c => {
          this.overlay = c
        }}
        rootClose={true}
        trigger="click">
        <button
          aria-describedby="language-selector"
          className="language-selector__button"
          style={{
            marginLeft: '0rem',
            borderBottomRightRadius: '0rem',
            borderTopRightRadius: '0rem',
            borderRight: 'solid 1px' }}>
          {selectedCountry.name}
        </button>
      </OverlayTrigger>
    )
  }
}

CountrySelector.propTypes = {
  changeCountry: PropTypes.func.isRequired,
  chosenCountryId: PropTypes.number.isRequired,
  countryList: PropTypes.arrayOf(PropTypes.object)
}

export default CountrySelector
