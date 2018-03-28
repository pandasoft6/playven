import React from 'react'
import { Link } from 'react-router'
import _ from 'lodash'
import moment from 'moment'
import { sortByTimeAsc } from 'utils/timeUtils'
import SearchTimeSlotCarousel from './SearchTimeSlotCarousel'
import { SearchPopover, EmptyButton } from './SearchPopover'

export const SearchResultItemTimeLine = ({ result, onCourtSelect, selectedCourts }) => {
  const slotListKeys = Object.keys(result.availableTimes)
  const minutesOfDay = (m) => m.minutes() + m.hours() * 60
  const slotListSorted = slotListKeys.sort(sortByTimeAsc)

  // Check timeline: one line - hours, two lines - hours and half hours
  // if true - enable two lines
  const isTwoLines = () => {
    const isHasHalfHour = slotListSorted.some(slotStartsAt =>
      slotStartsAt.slice(3).indexOf('3') !== -1)
    const isHasOnlyHour = slotListSorted.some(slotStartsAt =>
      slotStartsAt.slice(3).indexOf('00') !== -1)

    return isHasHalfHour && isHasOnlyHour
  }

  const timeLineArray = []
  const startTime = moment(slotListSorted[0], 'HH:mm')
  const endTime = moment(slotListSorted[slotListSorted.length - 1], 'HH:mm')
  let arrayStep = 30

  if (!isTwoLines()) {
    arrayStep = 60
  }

  timeLineArray.push(slotListSorted[0])
  while (minutesOfDay(startTime) < minutesOfDay(endTime)) {
    timeLineArray
      .push(startTime.add(arrayStep, 'm').format('HH:mm'))
  }

  let timeSlotDataSlider = null

  if (isTwoLines()) {
    if (timeLineArray[0].slice(3).indexOf('3') !== -1) {
      timeLineArray.unshift([])
    }
    const timeLineArrayChunked = _.chunk(timeLineArray, 2)

    // Because of slider design check last item for 'half an hour'
    // if true, then add empty block to be able to see last 'half an hour'
    if (timeLineArrayChunked[timeLineArrayChunked.length - 1].length > 1) {
      timeLineArrayChunked.push([])
    }

    timeSlotDataSlider = timeLineArrayChunked
      .map((chunk, chunkIdx) =>
        <div
          className="venue-timeslot-slide-with-two-buttons"
          key={chunkIdx}>
          {chunk.map((slotStartsAt, i) => {
            const venueName = result.venue.venue_name
            const uniqueKey = `${i}_${venueName}`

            if (!result.availableTimes[slotStartsAt]) {
              return <EmptyButton
                key={uniqueKey}
                slotStartsAt={slotStartsAt} />
            }
            return (
              <SearchPopover
                availableCourts={result.availableTimes[slotStartsAt]}
                key={uniqueKey}
                onCourtSelect={onCourtSelect}
                selectedCourts={selectedCourts}
                slotStartsAt={slotStartsAt} />
            )
          })}
        </div>
      )
  } else {
    timeSlotDataSlider = timeLineArray
      .map((slotStartsAt, i) => {
        const venueName = result.venue.venue_name
        const uniqueKey = `${i}_${venueName}`

        if (!result.availableTimes[slotStartsAt]) {
          return <EmptyButton
            key={uniqueKey}
            slotStartsAt={slotStartsAt} />
        }
        return (
          <div
            id={uniqueKey}
            key={uniqueKey}>
            <SearchPopover
              availableCourts={result.availableTimes[slotStartsAt]}
              key={uniqueKey}
              onCourtSelect={onCourtSelect}
              selectedCourts={selectedCourts}
              slotStartsAt={slotStartsAt} />
          </div>
        )
      })
  }


  const sliderSettings = {
    slidesToShow: 14,
    swipeToSlide: true,
    adaptiveHeight: true,
    rows: 2,
    infinite: false,
    draggable: true,
    swipe: true,
    vertical: false,
    responsive: [
      {
        breakpoint: 1601,
        settings: {
          slidesToShow: 11
        }
      },
      {
        breakpoint: 1301,
        settings: {
          slidesToShow: 9
        }
      },
      {
        breakpoint: 1101,
        settings: {
          slidesToShow: 7
        }
      },
      {
        breakpoint: 993,
        settings: {
          slidesToShow: 5
        }
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 481,
        settings: {
          slidesToShow: 3
        }
      }
    ]
  }

  return (
    <div className="pas">
      <div className="venue-search-result-item timeline color-bg-white flex-row flex-hc">
        <Link
          className="venue-image-preview"
          style={{ backgroundImage: `url(${result.venue.image})` }}
          to={`/venues/${result.venue.id}`} />
        <div className="flex-col flex-hc">
          <div className="flex-row">
            <h5 className="venue-name text-uc color-dark-grey">
              {result.venue.venue_name}
            </h5>
            <div className="venue-info t5 pls dark-grey">
              <Link to={`/venues/${result.venue.id}`}>info →</Link>
            </div>
          </div>
          <div className="venue-timeslot-wrapper">
            <SearchTimeSlotCarousel sliderSettings={sliderSettings}>
              {timeSlotDataSlider}
            </SearchTimeSlotCarousel>
          </div>
        </div>
      </div>
    </div>
  )
}


export default SearchResultItemTimeLine
