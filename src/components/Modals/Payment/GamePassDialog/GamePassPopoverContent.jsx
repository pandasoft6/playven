import React from 'react'
import Text from 'containers/Text'
import GamePassDialogOption from './GamePassDialogOption'

const GamePassPopoverContent = ({ court, options, selectGamePass }) =>
  <div>
    <div className="gamePass_block__header mbt">
      <Text text="modals.payment.available_cards_and_discounts" />
    </div>
    {options.map((item, idx) =>
      <GamePassDialogOption
        {...item}
        court={court}
        key={idx}
        selectGamePass={selectGamePass} />
    )}
  </div>

export default GamePassPopoverContent
