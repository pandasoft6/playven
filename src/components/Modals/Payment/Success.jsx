import React, { PropTypes } from 'react'
import { Modal } from 'react-bootstrap'
import Text from '../../../containers/Text'

const Success = () =>
  <Modal.Body>
    <div className="color-bg-white flex-col pam pam-mobile" style={{ paddingTop: '10rem', width: '80%', height: '100%' }}>
      <h2 className="flex-row flex-hs color-dark-grey text-uc em-high mbt">
         <Text text="modals.payment.thank_you" />
      </h2>
      <span className="t5 text-uc color-light-grey mbm">
         <Text text="modals.payment.success_message" />
      </span>
      <a href="/profile" style={{textDecoration: 'underline', color: '#2683f8', textTransform: 'uppercase'}}>
        <i className="icon-calendar-new" />
        <Text text="modals.payment.view_booking" />
      </a>
    </div>
  </Modal.Body>

export default Success
