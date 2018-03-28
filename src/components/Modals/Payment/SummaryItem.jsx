import React, { PropTypes } from 'react'
import GamePassDialog from './GamePassDialog'

class SummaryItem extends React.Component {
  static propTypes = {
    fetchGamePassesForCourt: PropTypes.func.isRequired,
    court: PropTypes.object.isRequired,
    selectedCourtData: PropTypes.object.isRequired,
    selectGamePass: PropTypes.func.isRequired,
    onCourtDeselect: PropTypes.func.isRequired,
    currency: PropTypes.string.isRequired
  }

  componentDidMount() {
    const { fetchGamePassesForCourt, selectedCourtData } = this.props

    fetchGamePassesForCourt(selectedCourtData)
  }

  render() {
    const { court, selectGamePass, selectedCourtData, onCourtDeselect,
      currency } = this.props
    const { name } = court
    const { startTime, duration, price, gamePasses } = selectedCourtData
    const options = gamePasses && gamePasses.map(pass => ({ value: pass.value, label: pass.label }))
    const hasPasses = options && options.length > 0

    return (
      <div className="summary-item flex-row flex-col-mobile mbt">
        <div className="summary-item__holder_info flex-row phs pvt color-bg-grey-300">
          <div className="summary-item__name color-turquoise text-uc mrt">{name}</div>
          <div className="summary-item__time">{duration}min, {startTime}</div>
          <div className="summary-item__price color-turquoise">
            <span className="currency">{currency}</span>{price.toFixed(2)}
          </div>
          <i className="icon-cross2 summary-item__remove color-red"
            onClick={() => onCourtDeselect(court.id, startTime)} />
        </div>
        <div className="summary-item__select">
          {hasPasses &&
            <GamePassDialog
              court={selectedCourtData}
              options={options}
              selectGamePass={selectGamePass} />
          }
        </div>
      </div>
    )
  }
}

export default SummaryItem
