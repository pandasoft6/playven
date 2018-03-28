import _ from 'lodash'
import moment from 'moment'
import React, { Component, PropTypes } from 'react'
import Slider from 'react-slick'
import PropTypeShapes from '../../../../components/PropTypes'

import AvailableCourtsColumn from './AvailableCourtsColumn'

export const createPossibleStartingTimes = (court, venue, fixedStep = null) => {
  const possibleStartTimes = []
  const openingTime = moment(venue.opening_local, 'YYYY-MM-DD HH:mm:ss')
  const closingTime = moment(venue.closing_local, 'YYYY-MM-DD HH:mm:ss')

  // if hour mark, then go 10,11,12, if half_hour_mark, then 10:30, 11:30,
  // if any_starting_time, then go 10, 10:30, 11:30
  let startTimePolicy

  if (court) {
    startTimePolicy = court.start_time_policy
    if (startTimePolicy === 'half_hour_mark' && openingTime.minutes() === 0) {
      openingTime.add(30, 'minutes')
    }
    if (startTimePolicy === 'hour_mark' && openingTime.minutes() === 30) {
      openingTime.add(30, 'minutes')
    }
  }

  // if any_starting_time, then user can pick 10:00, 10:30, 11:00, 11:30
  // so step should be always 30, otherwise go for an hour
  const step = fixedStep || (startTimePolicy === 'any_start_time' ? 30 : 60)

  // when fixedStep provided, then there's no startTimePolicy and it just makes
  // a full array of venue possible times, from opening to closing
  let currentTime = openingTime

  while (currentTime.isBefore(closingTime)) {
    possibleStartTimes.push(currentTime)
    currentTime = currentTime.clone().add(step, 'minutes')
  }

  return possibleStartTimes
}

class AvailableCourtsGrid extends Component {
  render() {
    const { selectedCourts, slots, allCourts, allVenuesById } = this.props
    const numberOfCourts = slots.length
    const slidesToShow = numberOfCourts > 10 ? 10 : numberOfCourts
    const flexibleSliderSettings = {
      arrows: true,
      infinite: false,
      speed: 500,
      slidesToShow,
      slidesToScroll: slidesToShow,
      responsive: [
        {
          breakpoint: 300,
          settings: {
            slidesToShow: slidesToShow > 1 ? 1 : slidesToShow,
            slidesToScroll: slidesToShow > 1 ? 1 : slidesToShow
          }
        },
        {
          breakpoint: 400,
          settings: {
            slidesToShow: slidesToShow > 2 ? 2 : slidesToShow,
            slidesToScroll: slidesToShow > 2 ? 2 : slidesToShow
          }
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: slidesToShow > 3 ? 3 : slidesToShow,
            slidesToScroll: slidesToShow > 3 ? 3 : slidesToShow
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: slidesToShow > 4 ? 4 : slidesToShow,
            slidesToScroll: slidesToShow > 4 ? 4 : slidesToShow
          }
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: slidesToShow > 5 ? 5 : slidesToShow,
            slidesToScroll: slidesToShow > 5 ? 5 : slidesToShow
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: slidesToShow > 6 ? 6 : slidesToShow,
            slidesToScroll: slidesToShow > 6 ? 6 : slidesToShow
          }
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: slidesToShow > 7 ? 7 : slidesToShow,
            slidesToScroll: slidesToShow > 7 ? 7 : slidesToShow
          }
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: slidesToShow > 8 ? 8 : slidesToShow,
            slidesToScroll: slidesToShow > 8 ? 8 : slidesToShow
          }
        }
      ]
    }

    const fullHourGrid = slots.every(courtData =>
      allCourts[courtData.id].minimum_duration >= 60 &&
      allCourts[courtData.id].start_time_policy === 'hour_mark'
    )

    // all courts belongs to a single venue on this page, so pick any
    const venue = allVenuesById[allCourts[slots[0].id].venue_id]

    return (

      <div className="available-courts-grid flex-row pbm prs">
        <div className="grid-times mhs t6 text-center">
          { createPossibleStartingTimes(null, venue, fullHourGrid ? 60 : 30).map((time, index) =>
            <div className="grid-time" key={index} style={{ height: '3.875rem' }}>
              {time.format('HH:mm')}
            </div>
          )}
        </div>
        <div className="flex">
          <Slider {...flexibleSliderSettings}>
            { slots.map((courtData, index) => {
              const court = allCourts[courtData.id]

              return <div className="flex" key={index}>
                <AvailableCourtsColumn
                  availableTimes={courtData.available_times}
                  court={court}
                  courtData={courtData}
                  currency={venue.currency_unit}
                  earliestTimeSlot={'hz'}
                  hourlyGrid={fullHourGrid}
                  selectedCourts={selectedCourts}
                  venue={allVenuesById[court.venue_id]} />
              </div>
            }
            )}
          </Slider>
        </div>
      </div>
    )
  }
}

AvailableCourtsGrid.propTypes = {
  selectedCourts: PropTypes.arrayOf(PropTypeShapes.court).isRequired,
  slots: PropTypes.arrayOf(PropTypes.shape).isRequired,
  allCourts: PropTypes.object.isRequired,
  allVenuesById: PropTypes.object.isRequired
}


export default AvailableCourtsGrid

