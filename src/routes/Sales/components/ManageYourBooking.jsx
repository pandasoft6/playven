import React from 'react'
import { I18n } from 'react-redux-i18n'
import SliderManageBooking from './SliderManageBooking'

const ManageYourBooking = () =>
  <div className="content-section manage-your-booking">
    <h2>{I18n.t('pages.sales.manage_your_booking_title')}</h2>
    <p>{I18n.t('pages.sales.manage_your_booking_description')}</p>
    <div className="manage-your-booking__slider">
      <SliderManageBooking />
    </div>
  </div>

export default ManageYourBooking
