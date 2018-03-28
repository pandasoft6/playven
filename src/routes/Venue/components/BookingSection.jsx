import React, { PropTypes } from 'react'
import PropTypeShapes from '../../../components/PropTypes'

import Availability from '../containers/Booking/AvailabilityContainer'
import Search from '../containers/Booking/SearchContainer'


const BookingSection = ({ displayBookingResults, loading, selectedCourts, slots, venue }) =>
  <div className="booking-section limit-width">
    <div className="booking-section-container flex-col mam">
      <Search venue={venue} />

      {displayBookingResults &&
        <div>
          <Availability loading={loading} selectedCourts={selectedCourts} slots={slots} />
        </div>
      }
    </div>
  </div>

BookingSection.propTypes = {
  displayBookingResults: PropTypes.bool,
  loading: PropTypes.bool,
  selectedCourts: PropTypes.arrayOf(PropTypeShapes.court),
  slots: PropTypes.arrayOf(PropTypes.object),
  venue: PropTypes.object.isRequired
}


export default BookingSection
