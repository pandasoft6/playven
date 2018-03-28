import React from 'react'
import { I18n } from 'react-redux-i18n'
import tennisBall from './images/tennis_ball.png'
import tennisBallBlur from './images/tennis_ball_blur.png'

const WhatElseTable = () =>
  <div className="content-section what-else-table__wrapper">
    <div className="what-else-table">
      <img alt="Tennis ball" className="tennisBall" src={tennisBall} />
      <img alt="Tennis ball" className="tennisBallBlur" src={tennisBallBlur} />
      <h2>{I18n.t('pages.sales.what_else_table_title')}</h2>
      <p>{I18n.t('pages.sales.what_else_table_description')}</p>
      <div className="flex-row flex-col-mobile">
        <ul>
          <li>
            <i className="icon-tennis-ball" /> {I18n.t('pages.sales.what_else_table_argument_1')}
          </li>
          <li>
            <i className="icon-tennis-ball" /> {I18n.t('pages.sales.what_else_table_argument_2')}
          </li>
          <li>
            <i className="icon-tennis-ball" /> {I18n.t('pages.sales.what_else_table_argument_3')}
          </li>
          <li>
            <i className="icon-tennis-ball" /> {I18n.t('pages.sales.what_else_table_argument_4')}
          </li>
        </ul>
        <ul>
          <li>
            <i className="icon-tennis-ball" /> {I18n.t('pages.sales.what_else_table_argument_5')}
          </li>
          <li>
            <i className="icon-tennis-ball" /> {I18n.t('pages.sales.what_else_table_argument_6')}
          </li>
          <li>
            <i className="icon-tennis-ball" /> {I18n.t('pages.sales.what_else_table_argument_7')}
          </li>
          <li>
            <i className="icon-tennis-ball" /> {I18n.t('pages.sales.what_else_table_argument_8')}
          </li>
        </ul>
      </div>
    </div>
  </div>


export default WhatElseTable
