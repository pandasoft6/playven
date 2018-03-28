import React, { Component, PropTypes } from 'react'
import moment from 'moment'

import CourtsCarousel from './CourtsCarousel'
import CourtButton from '../../containers/Booking/CourtButtonContainer'
import PropTypeShapes from '../../../../components/PropTypes'
import Price from '../../../../components/Price'
import utils from '../../../../utils'


class AvailableCourtsRow extends Component {

  isCourtSelected(candidate) {
    const { selectedCourts } = this.props

    return selectedCourts.some(selectedCourt => {
      if (selectedCourt.id !== candidate.id) {
        return false
      }

      const slotStartTime = moment(candidate.starts_at, 'YYYY-MM-DD HH:mm:ss')
      const candidateStartTime = slotStartTime.format('HH:mm')
      const startTime = selectedCourt.startTime
      const endTime = utils.time.addToTime(startTime, selectedCourt.duration)

      return selectedCourt.date === slotStartTime.format('YYYY/MM/DD') &&
        (startTime === candidateStartTime ||
          utils.time.isInside([startTime, endTime], candidateStartTime))
    })
  }

  render() {
    const { time, availableTimes, allCourts, venue } = this.props
    const remainingCourts = availableTimes.map(data => ({
      ...data,
      court: allCourts[data.id],
      currency: venue.currency_unit
    }))
    const allPricesInThisRow = availableTimes.map(data => data.price)

    const lowestPrice = Math.min(...allPricesInThisRow)

    return (
      <div className="available-courts-row flex-row">
        <div className="flex-row flex-hc flex-vc pas hide-mobile">
          <Price amount={lowestPrice} currency={venue.currency_unit} theme="pale-turquoise" />
        </div>
        <div className="time-slot flex-row flex-hc">
          <div className="time mlm mls-mobile">{ time }</div>
        </div>
        <div className="courts-carousel-wrapper flex flex-row flex-vc phs pht-mobile pvs-mobile">
          <CourtsCarousel>
            {remainingCourts.map((courtData, index) => {
              const court = courtData.court
              const isSelected = this.isCourtSelected(courtData)

              return (
                <div key={index}>
                  <CourtButton
                    className={`${isSelected ? 'not-selectable' : ''}`}
                    court={court}
                    courtData={courtData}
                    duration={courtData.duration}
                    selected={isSelected}
                    time={time} />
                </div>
              )
            })}
          </CourtsCarousel>
        </div>
      </div>
    )
  }
}

AvailableCourtsRow.propTypes = {
  selectedCourts: PropTypes.arrayOf(PropTypeShapes.court),
  slot: PropTypes.shape({
    /*eslint-disable */
    available_courts: PropTypes.arrayOf(PropTypeShapes.court),
    duration: PropTypes.number,
    lowest_price: PropTypes.number,
    slot_time: PropTypes.string
    /*eslint-enable */
  }),
  time: PropTypes.string,
  availableTimes: PropTypes.arrayOf(PropTypes.object),
  allCourts: PropTypes.object,
  venue: PropTypes.object.isRequired
}


export default AvailableCourtsRow
