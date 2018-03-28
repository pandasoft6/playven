import React from 'react'

import Price from '../../../../components/Price'


const PriceRange = ({ lowPrice, highPrice, currency }) =>
  <div className="price-range flex-row flex-vb flex-hc mbm">
    <div className="flex-row flex-vc">
      <Price amount={lowPrice} currency={currency} theme="large" />
      <i className="icon-short-arrow-right price-range-divider t4 color-turquoise" />
      <Price amount={highPrice} currency={currency} theme="large" />
    </div>
  </div>

PriceRange.propTypes = {
  currency: React.PropTypes.string.isRequired,
  lowPrice: React.PropTypes.number.isRequired,
  highPrice: React.PropTypes.number.isRequired
}


export default PriceRange
