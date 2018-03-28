import moment from 'moment'
import React, { Component, PropTypes } from 'react'
import PropTypeShapes from '../../../../components/PropTypes'
import utils from '../../../../utils'
import Text from '../../../../containers/Text'


class CourtGridItem extends Component {
  selectThisCourt() {
    const { slot, court, onCourtSelect, onCourtDeselect, currency } = this.props
    const payload = {
      ...slot,
      court,
      currency
    }

    // say, if we picked court 10:30-11:30 and then decided to change to 11:00-11:30
    // have to deselect previous one
    const conflictingCourts = this.findConflictingCourts()

    conflictingCourts.forEach(conflictingCourt => {
      onCourtDeselect(conflictingCourt.id, conflictingCourt.startTime)
    })

    onCourtSelect(payload)
  }

  findConflictingCourts() {
    const { selectedCourts, court, slot } = this.props

    return selectedCourts.filter(alreadySelectedCourt => {
      if (alreadySelectedCourt.id !== court.id) {
        return false
      }

      const candidateStartTime = moment(slot.starts_at, 'YYYY-MM-DD HH:mm:ss').format('HH:mm')
      const candidateEndsTime = moment(slot.ends_at, 'YYYY-MM-DD HH:mm:ss').format('HH:mm')
      const startTime = alreadySelectedCourt.startTime
      // selectedCourts don't have duration
      const endTime = utils.time.addToTime(startTime, alreadySelectedCourt.duration)

      return utils.time.collapses([startTime, endTime], [candidateStartTime, candidateEndsTime])
    })
  }

  deselectThisCourt() {
    const { court, onCourtDeselect, time } = this.props

    onCourtDeselect(court.id, time)
  }

  toggleSelection() {
    const { isCurrentlySelected } = this.props

    if (isCurrentlySelected) {
      this.deselectThisCourt()
    } else {
      this.selectThisCourt()
    }
  }

  render() {
    const { className, time, type, duration } = this.props

    if (type === 'booked') {
      return (
        <div className={`grid-court grid-court-booked ${className}`}>
          <div><Text text="pages.venues.booked" /></div>
        </div>
      )
    }

    if (type === 'unavailable') {
      return (
        <div className={`grid-court grid-court-${type} ${className}`} />
      )
    }

    if (type === 'overlapping') {
      return (
        null
      )
    }

    const endTime = moment(time, 'HH:mm').add(duration, 'minutes').format('HH:mm')

    return (
      <div
        className={`grid-court grid-court-${type} ${className}`}
        onClick={() => this.toggleSelection()}>
        <div>
          <div className="time">
            <div>{time}</div>
            <div className="hyphen">-</div>
            <div>{endTime}</div>
          </div>
        </div>
      </div>
    )
  }
}

CourtGridItem.propTypes = {
  className: PropTypes.string,
  court: PropTypeShapes.court,
  duration: PropTypes.number,
  onCourtSelect: PropTypes.func.isRequired,
  onCourtDeselect: PropTypes.func.isRequired,
  time: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  selectedCourts: PropTypes.arrayOf(PropTypes.object),
  slot: PropTypes.object,
  isCurrentlySelected: PropTypes.bool.isRequired,
  currency: PropTypes.string
}


export default CourtGridItem
