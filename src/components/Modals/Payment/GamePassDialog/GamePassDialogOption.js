import React, { PropTypes } from 'react'
import Text from 'containers/Text'

const isSelected = (value, selectedGamePassId) => {
  if (value === selectedGamePassId) {
    return 'active'
  }
  return ''
}

const GamePassDialogOption = ({ selectGamePass, label, value, court }) =>
  <div className={`gamePass_block__dialog-option ${isSelected(value, court.selectedGamePassId)}`}>
    <button
      className="gamePass_block__action text-uc"
      onClick={() => {
        if (value === court.selectedGamePassId) {
          selectGamePass(null, court)
        } else {
          selectGamePass(value, court)
        }
      }}>
      <div className="gamePass_block color-white t5 text-uc flex-row">
        <div>{label}</div>
        <div className="mls">
          <Text text="modals.payment.use" />
        </div>
      </div>
    </button>
  </div>

GamePassDialogOption.propTypes = {
  court: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  selectGamePass: PropTypes.func.isRequired
}

export default GamePassDialogOption
