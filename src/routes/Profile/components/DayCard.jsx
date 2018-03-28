import React, { PropTypes } from 'react'
import { I18n } from 'react-redux-i18n'
import moment from 'moment'
import Text from '../../../containers/Text'
import VenueCard from './VenueCard'

const DayCard = ({ day }) =>
  <div>
    <div className="profile-day-card">
      <div className="profile-day-card__header">
        <div className="profile-day-card__title">
          <span>{moment(day.date, 'YYYY-MM-DD').format('dddd, MMM DD')}</span>
        </div>
        <div className="total-block">
          <div className="text-right">
            <sup className="currency">{day.currency_unit}</sup>
            <span className="total-text">
              {day.total} <Text text="pages.profile.total" />
            </span>
          </div>
          <div className="total-subtext">
            {I18n.t('pages.profile.court', { count: day.courts })}, {day.minutes}
            {' '}
            <Text text="pages.profile.minutes" />
          </div>
        </div>
      </div>
      <div className="flex-col color-bg-grey-150">
        <div className="flex">
          {day.venues.map((value, i) =>
            <VenueCard
              currency={day.currency_unit}
              data={value}
              key={i} />
          )}
        </div>
      </div>
    </div>
  </div>

export default DayCard
