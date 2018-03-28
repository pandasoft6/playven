import React from 'react'
import { I18n } from 'react-redux-i18n'
import improvementImage from './images/improvement.png'

const BookingImprovement = () =>
  <div className="content-section booking-improvement">
    <div className="booking-improvement__image">
      <img alt="Improvement" src={improvementImage} />
    </div>
    <div className="booking-improvement__text">
      <h2>{I18n.t('pages.sales.booking_improvement_title')}</h2>
      <p>{I18n.t('pages.sales.booking_improvement_description_1')}</p>
      <div className="booking-improvement__mobile-image">
        <img alt="Improvement" src={improvementImage} />
      </div>
      <p>{I18n.t('pages.sales.booking_improvement_description_2')}</p>
    </div>
  </div>

export default BookingImprovement
