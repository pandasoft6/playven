import React, { PropTypes } from 'react'
import moment from 'moment'
import Text from '../../../../containers/Text'

export const InvoiceComponent = ({ startTime, endTime, date, price }) =>
  <div className="venue-item color-bg-grey-150 t5 mrs mbs">
    <div className="flex-row flex-col-mobile pat">
      <div className="venue-item__day text-uc color-turquoise mrs">
        {moment(date).format('dddd, MMM Do YYYY')}
      </div>
      <div className="venue-item__total text-uc">
        {`${startTime} - ${endTime}`}
      </div>
      <div className="summary-item__price color-turquoise invoice-component">
        <span className="currency">{price}</span>
      </div>
    </div>
  </div>

export const CustomInvoiceComponent = ({ name, price }) =>
  <div className="venue-item color-bg-grey-150 t5 mrs mbs">
    <div className="flex-row flex-col-mobile pat">
      <div
        className="venue-item__day text-uc color-turquoise mrs"
        title={name}>
        {`${name.substring(0, 25)}${name.length > 25 ? '.....' : ''}`}
      </div>
      <div className="summary-item__price color-turquoise invoice-component">
        <span className="currency">{price}</span>
      </div>
    </div>
  </div>

export const GamepassInvoiceComponent = ({ price }) =>
  <div className="venue-item color-bg-grey-150 t5 mrs mbs">
    <div className="flex-row flex-col-mobile pat">
      <div
        className="venue-item__day text-uc color-turquoise mrs">
        <Text text="modals.invoicePayment.gamepass" />
      </div>
      <div className="summary-item__price color-turquoise invoice-component">
        <span className="currency">{price}</span>
      </div>
    </div>
  </div>

InvoiceComponent.propTypes = {
  date: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired
}

CustomInvoiceComponent.propTypes = {
  price: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

GamepassInvoiceComponent.propTypes = {
  price: PropTypes.string.isRequired
}
