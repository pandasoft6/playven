import React, { Component } from 'react'
import moment from 'moment'
import PropTypes from '../../../../components/PropTypes'
import Price from '../../../../components/Price'


class CourtButton extends Component {
  toggleSelection() {
    const { selected, onCourtSelect, onCourtDeselect, courtData } = this.props

    if (selected) {
      const startTime = moment(courtData.starts_at, 'YYYY-MM-DD HH:mm:ss').format('HH:mm')

      onCourtDeselect(courtData.id, startTime)
    } else {
      onCourtSelect(courtData)
    }
  }

  render() {
    const {
      className,
      court,
      selected,
      courtData
    } = this.props

    let priceTheme = ''

    if (className === 'not-selectable') {
      priceTheme = 'grey'
    }

    return (
      <div
        className={`court-button flex-row ${className} ${selected ? 'court-button-selected' : ''}`}
        onClick={() => this.toggleSelection()}>

        <div className="flex">
          <div className="name">
            {court.name}
          </div>

          <div className="flex-row time">
            <div className="duration">
              {courtData.duration} min
            </div>
          </div>
        </div>

        <Price
          amount={courtData.price}
          currency={courtData.currency}
          theme={priceTheme} />
      </div>
    )
  }
}

CourtButton.propTypes = {
  className: React.PropTypes.string,
  duration: React.PropTypes.number,
  court: PropTypes.court.isRequired,
  onCourtSelect: React.PropTypes.func.isRequired,
  selected: React.PropTypes.bool.isRequired,
  onCourtDeselect: React.PropTypes.func.isRequired,
  courtData: React.PropTypes.object.isRequired,
  currency: React.PropTypes.string.isRequired
}


export default CourtButton
