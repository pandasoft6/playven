import React from 'react'
import Popover from 'antd/lib/popover'
import SearchTimeSlotPopover from './SearchTimeSlotPopover'

export const SearchPopover = ({
  availableCourts, onCourtSelect, slotStartsAt, selectedCourts, currency }) =>
    <Popover
      content={
        <SearchTimeSlotPopover
          availableCourts={availableCourts}
          currency={currency}
          onCourtSelect={onCourtSelect}
          selectedCourts={selectedCourts}
          time={slotStartsAt} />
    }
      trigger="click">
      <div className="venue-timeslot-btn-wrapper">
        <button className="venue-timeslot">{slotStartsAt}</button>
      </div>
    </Popover>

export const EmptyButton = ({ slotStartsAt }) =>
  <div className="venue-timeslot-btn-wrapper empty">
    <button className="venue-timeslot">{slotStartsAt}</button>
  </div>
