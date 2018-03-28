import React, { PropTypes } from 'react'
import Popover from 'antd/lib/popover'
import Text from 'containers/Text'
import GamePassPopoverContent from './GamePassPopoverContent'

const getSelectedGamePassLabel = (options, selectedGamePassId) => {
  const getGamePass = options.filter(item => selectedGamePassId === item.value)

  if (getGamePass.length > 0) {
    return getGamePass[0].label
  }
  return false
}

const GamePassDialog = ({ court, options, selectGamePass }) =>
  <div className="flex">
    <div className="gamePassDialog color-bdb-grey-300 flex-row flex-col-mobile">
      <div className="flex">
        <Popover
          content={
            <GamePassPopoverContent
              court={court}
              options={options}
              selectGamePass={selectGamePass} />
          }
          trigger="click">
          <button>
            {getSelectedGamePassLabel(options, court.selectedGamePassId) ||
            Text.t('modals.payment.select_game_pass')}
            {court.selectedGamePassId &&
            <i className="gamePassDialog__clear icon-rounded-cross"
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                selectGamePass(null, court)
              }} />}
            <i className="icon-up-arrow" />
          </button>
        </Popover>
      </div>
    </div>
  </div>

GamePassDialog.propTypes = {
  court: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired
  })),
  selectGamePass: PropTypes.func.isRequired
}

export default GamePassDialog

