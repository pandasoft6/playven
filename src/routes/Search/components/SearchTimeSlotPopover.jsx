import React, { PropTypes } from 'react'
import Text from '../../../containers/Text'

export const SearchTimeSlotPopover = props => {
  const { time, availableCourts, onCourtSelect, selectedCourts, currency } = props
  const availCourts = availableCourts.map(data => ({ ...data, currency: currency }))

  return <div className="venue-timeslot__popover">
    <div className="popover-title">
      <Text text="components.search_popover.available_courts" />
    </div>
    <div className="time-slot__book_list_wrapper">
      {availCourts.map((courtData, index) =>
        <div className="time-slot__book_court flex-row flex-hb flex-vc color-white" key={index}>
          <div className="time-slot__name text-uc flex-row flex-vb">
            <span>{courtData.court.name}</span>
            <div className="time-slot__price">
              <sup className="currency">{currency}</sup><span>{courtData.price}</span>
            </div>
          </div>
          {
            selectedCourts.filter(m => m.startTime === time && m.id === courtData.court.id)[0] ?
              <div className="color-bdb-turquoise-text color-turquoise-text t6 text-uc">
                <Text text="components.search_popover.booked" />
              </div> :
              <div
                className="button-book-court color-bdb-turquoise-text color-turquoise-text t6
                 text-uc"
                onClick={() => onCourtSelect(courtData)} >
                <Text text="components.search_popover.book_now" />
              </div>
            }
        </div>
      )}
    </div>
  </div>
}

SearchTimeSlotPopover.propTypes = {
  time: PropTypes.string,
  availableCourts: PropTypes.arrayOf(PropTypes.object),
  onCourtSelect: PropTypes.func.isRequired,
  selectedCourts: PropTypes.arrayOf(PropTypes.object),
  currency: PropTypes.string.isRequired
}

export default SearchTimeSlotPopover
