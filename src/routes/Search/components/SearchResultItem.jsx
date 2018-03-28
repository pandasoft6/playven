import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import _ from 'lodash'
import { sortByTimeAsc } from 'utils/timeUtils'
import { SearchPopover } from './SearchPopover'
import SearchTimeSlotCarousel from './SearchTimeSlotCarousel'

export const SearchResultItem = ({ result, onCourtSelect, selectedCourts }) => {
  const timeSlotDataSorted = Object.keys(result.availableTimes).sort(sortByTimeAsc)
  const timeSlotDataChunks = _.chunk(timeSlotDataSorted, 4)
  const timeSlotDataSlider = timeSlotDataChunks.map((chunk, chunkIdx) =>
    <div key={chunkIdx}>
      {chunk.map((slotStartsAt, i) => {
        const venueName = result.venue.venue_name
        const uniqueKey = `${i}_${chunkIdx}_${venueName}`

        return <SearchPopover
          availableCourts={result.availableTimes[slotStartsAt]}
          currency={result.venue.currency_unit}
          key={uniqueKey}
          onCourtSelect={onCourtSelect}
          selectedCourts={selectedCourts}
          slotStartsAt={slotStartsAt} />
      })}
    </div>
  )

  return (
    <div className="pas">
      <div className="venue-search-result-item color-bg-white">

        <h5 className="venue-name flex-row text-uc flex-hc color-dark-grey">
          {result.venue.venue_name}
        </h5>

        <div className="venue-info flex-row flex-hc t5 pbs dark-grey">
          <a href={`/venues/${result.venue.id}`}>info →</a>
        </div>

        <Link className="venue-image-preview"
          style={{ backgroundImage: `url(${result.venue.image})` }}
          to={`/venues/${result.venue.id}`} />

        <div className="venue-timeslot-wrapper">
          <SearchTimeSlotCarousel>
            {timeSlotDataSlider}
          </SearchTimeSlotCarousel>
        </div>
      </div>

    </div>
  )
}

SearchResultItem.propTypes = {
  result: PropTypes.object,
  onCourtSelect: PropTypes.func.isRequired,
  selectedCourts: PropTypes.arrayOf(PropTypes.object)
}


export default SearchResultItem
