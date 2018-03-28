import React, { PropTypes } from 'react'
import { Modal } from 'react-bootstrap'
import { connectModal } from 'redux-modal'
import MainContent from '../../containers/InvoicePayment/MainContentContainer'

export const InvoicePayment = ({ show, handleHide }) =>
  <Modal backdrop={false}
    dialogClassName="payment-modal flex-he flex-row flex-vs"
    onHide={handleHide}
    show={show}>
    <i className="icon-cross2 modal-close color-white" onClick={handleHide} />
    <div className="payment-modal__overlay color-bg-turquoise" />
    <MainContent handleHide={handleHide} />
  </Modal>

InvoicePayment.propTypes = {
  show: PropTypes.bool,
  handleHide: PropTypes.func.isRequired
}

export default connectModal({
  name: 'invoice_payment'
})(InvoicePayment)
