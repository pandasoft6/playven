import React, { Component } from 'react'


class Price extends Component {
  render() {
    const { amount, currency, theme } = this.props

    return (
      <div className={theme ? `price price-${theme}` : 'price'}>
        <span className="price__currency">{ currency }</span>
        <span className="price__amount">{ amount }</span>
      </div>
    )
  }
}

Price.propTypes = {
  amount: React.PropTypes.number.isRequired,
  currency: React.PropTypes.string.isRequired,
  theme: React.PropTypes.string
}

export default Price
