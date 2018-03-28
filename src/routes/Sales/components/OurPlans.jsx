import React from 'react'
import { I18n } from 'react-redux-i18n'

const OurPlans = () =>
  <div className="content-section our-plans mtxl">
    <h2>{I18n.t('pages.sales.our_plans_title')}</h2>
    <h1 className="mvm">{I18n.t('pages.sales.our_plans_price')}</h1>
    <p>{I18n.t('pages.sales.our_plans_description')}</p>
  </div>


export default OurPlans
