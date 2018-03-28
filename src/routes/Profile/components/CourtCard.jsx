import React, { PropTypes } from 'react'
import { I18n } from 'react-redux-i18n'
import moment from 'moment'

const getDuration = (startTime, endTime) => {
  return moment(endTime, 'HH:mm').diff(moment(startTime, 'HH:mm'), 'minutes')
}

const CourtCard = ({ reservation }) =>
  <div className="court-card">
    <div className="court-card__icon-menu">...</div>
    <div className="flex-col">
      <div className="flex-row">
        {reservation.isRecurring &&
        <div className="court-card__icon">
          <i className="icon-recurring" />
        </div>
        }
        <div className="court-card__title">
          {reservation.court.indoor ?
            I18n.t('pages.profile.indoor') :
            I18n.t('pages.profile.outdoor')}
          {' '}
          {reservation.court.index}
        </div>
      </div>
      <div className="court-card__time">
        {getDuration(reservation.start_time, reservation.end_time)} min, {reservation.start_time}
      </div>
      <div className="court-card__payment-type">
        {reservation.payment_type}
      </div>
    </div>
    <div className="court-card__price flex-row flex-vc t4">
      {reservation.price}
    </div>
  </div>

export default CourtCard
