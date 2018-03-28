import React, { PropTypes } from 'react'
import moment from 'moment'
import Text from '../../../containers/Text'

const InvoiceCard = ({ invoice, downloadInvoice, openModal, payInvoice }) =>
  <div className="invoice-card">
    <div className="invoice-card__content">
      <div className="invoice-card___title-info">
        <div className="invoice-card___date">
          {moment(invoice.billingTime, 'DD/MM/YYYY').format('MMM Do YYYY')}
        </div>
        <div className="invoice-card___number"><Text text="pages.profile.invoice" /> #{invoice.id}</div>
      </div>
      <div className="invoice-card___court-info">
        <div>
          <div className="invoice-card___court-title">{invoice.company.legalName}</div>
        </div>
        <div>
          <div><i className="icon-phone-call" /> {invoice.company.phone}</div>
          <div>
            <i className="icon-letter" />
            {' '}
            <a href={`http://${invoice.company.website}`} target="_blank">
              {invoice.company.website}
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="invoice-card__total-wrapper">
      <div className="invoice-card__total">
        <div className="invoice-card__price">
          {invoice.total} <Text text="pages.profile.total" />
        </div>
        <div className="invoice-card__action-list">
          {!invoice.isPaid && <div
            className="invoice-card__action-item"
            onClick={() => {
              openModal('invoice_payment')
              payInvoice(invoice)
            }}>
            <i className="icon-wallet" />
            <span><Text text="pages.profile.pay_now" /></span>
          </div>}
          <div
            className="invoice-card__action-item"
            onClick={() => downloadInvoice(invoice)}>
            <i className="icon-download" />
            <span><Text text="pages.profile.download" /></span>
          </div>
        </div>
      </div>
    </div>
  </div>

export default InvoiceCard
