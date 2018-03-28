import React from 'react'
import { I18n } from 'react-redux-i18n'
import blueCourt from './images/blue-court-bg.png'

const HowDoWeHelp = () =>
  <div
    className="content-section how-do-we-help"
    style={{ backgroundImage: `url(${blueCourt})` }}>
    <div className="how-do-we-help__content">
      <h2>{I18n.t('pages.sales.how_do_we_help_title')}</h2>
      <p>{I18n.t('pages.sales.how_do_we_help_description')}</p>
      <ul className="app-list">
        <li>
          <div className="icon-wrapper">
            <i className="icon-apple" />
          </div>
          <p>{I18n.t('pages.sales.ios_app')}</p>
        </li>
        <li>
          <div className="icon-wrapper">
            <i className="icon-android" />
          </div>
          <p>{I18n.t('pages.sales.mobile_app')}</p>
        </li>
        <li>
          <div className="icon-wrapper">
            <i className="icon-computer" />
          </div>
          <p>{I18n.t('pages.sales.web_app')}</p>
        </li>
      </ul>
      <p>{I18n.t('pages.sales.how_do_we_help_description_2')}</p>
    </div>
  </div>

export default HowDoWeHelp
