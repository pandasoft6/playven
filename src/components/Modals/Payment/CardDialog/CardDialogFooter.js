import React, { PropTypes } from 'react'
import Text from 'containers/Text'

const CardDialogFooter = ({ addCard }) =>
  <div className="flex-row flex-vc mtt">
    <span><Text text="modals.payment.add_card_description" /></span>
    <button
      className="add-card color-bg-azure color-white text-uc"
      onClick={addCard}>
      + <Text text="modals.payment.add_card" />
    </button>
  </div>

CardDialogFooter.propTypes = {
  addCard: PropTypes.func.isRequired
}

export default CardDialogFooter
