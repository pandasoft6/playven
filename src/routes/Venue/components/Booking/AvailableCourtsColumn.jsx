import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import PropTypeShapes from '../../../../components/PropTypes'
import moment from 'moment'
import { createPossibleStartingTimes } from './AvailableCourtsGrid'
import CourtGridItem from '../../containers/Booking/CourtGridItemContainer'
import utils from '../../../../utils'

class AvailableCourtsColumn extends Component {
  isCurrentlySelected(candidateCourt, slot) {
    const { selectedCourts } = this.props
    const slotStartTime = moment(slot.starts_at, 'YYYY-MM-DD HH:mm:ss')
    // highlight exact court which is selected

    return selectedCourts.some(court =>
      court.id === candidateCourt.id &&
      court.startTime === slotStartTime.format('HH:mm') &&
      court.date === slotStartTime.format('YYYY/MM/DD')
    )
  }

  // if venue opens at :00 mins and court starts at :30 then we have to insert
  // 30 minutes of "empty" time before the venue
  spaceToInsertBefore() {
    const { court, venue } = this.props
    const venueFormattedOpenTime = moment(venue.opening_local, 'YYYY-MM-DD HH:mm:ss')
    const venueOpeningMinutes = venueFormattedOpenTime.minutes()

    if (venueOpeningMinutes === 30 && court.start_time_policy === 'hour_mark' ||
      venueOpeningMinutes === 0 && court.start_time_policy === 'half_hour_mark') {
      return <CourtGridItem
        duration={30}
        key={'first-unavailable-item'}
        time={venueFormattedOpenTime.format('HH:mm')}
        type="unavailable" />
    }

    return null
  }

  formatTime(time) {
    return moment(time, 'YYYY-MM-DD HH:mm:ss').format('HH:mm')
  }

  isVenueWorkingAtTimeFrame(startTime) {
    const { court, venue } = this.props
    const duration = court.minimum_duration
    const openingTime = utils.time.numberify(this.formatTime(venue.opening_local))
    const closingTime = utils.time.numberify(this.formatTime(venue.closing_local))
    const numEndTime = utils.time.numberify(startTime.clone().add(duration, 'minutes')
      .format('HH:mm'))
    const numStartTime = utils.time.numberify(startTime.format('HH:mm'))
    // if time is before opening or after closing - then this availableSlot doesn't exist
    const isClosed = numEndTime > closingTime || numStartTime < openingTime

    return !isClosed
  }

  needsDoubleHeight() {
    // double slots in height if there are :30 minutes stuff (!hourlyGrid)
    // and this availableSlot is bigger than others (duration >= 60), but which is not "doubled"
    // due to any start time policy (x2 slots due to :00 + :30 start time)
    const { court, hourlyGrid } = this.props
    const minimumDuration = court.minimum_duration

    return minimumDuration >= 60 && !hourlyGrid && court.start_time_policy !== 'any_start_time'
  }

  renderGridCourts() {
    const { court, venue, availableTimes, currency } = this.props
    const possibleStartingTimes = createPossibleStartingTimes(court, venue)

    return possibleStartingTimes.map(startTime => {
      const formattedStartTime = startTime.format('HH:mm')

      let type = null
      let isCurrentlySelected = false
      const slotLengthClasses = []

      // TODO: add quad here?.. what if there's 2 hours min duration and
      // 30 minutes min duration on a same grid?
      // Then 2 hours should be 4 times longer than 30 minutes
      if (this.needsDoubleHeight()) {
        slotLengthClasses.push('grid-court-double')
      }

      // availableSlot contains id, starts_at + duration
      const availableSlot = availableTimes.filter(slot =>
        this.formatTime(slot.starts_at) === formattedStartTime)[0]
      // availableSlot means it can be booked

      if (availableSlot) {
        type = 'available'
        // hourlyGrid means everything is adjusted to an hour

        if (this.isCurrentlySelected(court, availableSlot)) {
          slotLengthClasses.push('grid-court-selected')
          isCurrentlySelected = true
        }
        // either this availableSlot don't exist (and thus unavailable), either it is booked
        // it always returns true because createPossibleStartingTimes generates from time frame
      } else if (this.isVenueWorkingAtTimeFrame(startTime)) {
        type = 'booked'
      } else {
        type = 'unavailable'
      }

      return <CourtGridItem
        className={slotLengthClasses.join(' ')}
        court={this.props.court}
        currency={currency}
        duration={court.minimum_duration}
        isCurrentlySelected={isCurrentlySelected}
        key={formattedStartTime}
        slot={availableSlot}
        time={formattedStartTime}
        type={type} />
    })
  }

  render() {
    const { court } = this.props

    return (
      <div className="color-bdh-white flex">
        <div className="grid-column-name">
          { court.name }
        </div>
        <div>
          { this.spaceToInsertBefore() }
          { this.renderGridCourts() }
        </div>
      </div>
    )
  }
}

AvailableCourtsColumn.propTypes = {
  // name: PropTypes.string.isRequired,
  earliestTimeSlot: PropTypes.string.isRequired,
  courts: PropTypes.arrayOf(
    PropTypes.shape({
      court: PropTypeShapes.court.isRequired,
      // eslint-disable-next-line
      slot_time: PropTypes.string.isRequired,
      taken: PropTypes.bool.isRequired
    })
  ),
  // hourlyColumn: PropTypes.bool.isRequired,
  hourlyGrid: PropTypes.bool.isRequired,
  selectedCourts: PropTypes.arrayOf(PropTypeShapes.court).isRequired,
  isHalfHourColumn: PropTypes.bool,
  court: PropTypes.object.isRequired,
  venue: PropTypes.object.isRequired,
  availableTimes: PropTypes.arrayOf(PropTypes.object)
}


export default AvailableCourtsColumn
