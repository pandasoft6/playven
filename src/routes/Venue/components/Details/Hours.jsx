import React from 'react'
import moment from 'moment'

import Text from '../../../../containers/Text'


const daysOfWeek = [
  {
    code: 'mon',
    abbreviation: Text.t('pages.venues.days.monday')
  },
  {
    code: 'tue',
    abbreviation: Text.t('pages.venues.days.tuesday')
  },
  {
    code: 'wed',
    abbreviation: Text.t('pages.venues.days.wednesday')
  },
  {
    code: 'thu',
    abbreviation: Text.t('pages.venues.days.thursday')
  },
  {
    code: 'fri',
    abbreviation: Text.t('pages.venues.days.friday')
  },
  {
    code: 'sat',
    abbreviation: Text.t('pages.venues.days.saturday')
  },
  {
    code: 'sun',
    abbreviation: Text.t('pages.venues.days.sunday')
  }
]

const Hours = ({ venue }) =>
  <div style={{ flex: 1 }}>
    <h2 className="section-title">
      <Text text="pages.venues.opening_hours" />
    </h2>
    <div
      className="flex-row flex-hb color-grey-600"
      style={{ fontSize: '1.125rem', maxWidth: '22rem' }}>
      <div className="mrs">
        { daysOfWeek.map((result, index) =>
          <div className="mbs" key={index}>{result.abbreviation}</div>) }
      </div>
      <div>
        {
          daysOfWeek.map((result, index) =>
            <div className="mbs" key={index}>
              { moment().startOf('day').seconds(venue.business_hours[result.code].opening)
                .format('HH:mm') } -&nbsp;
              { moment().startOf('day').seconds(venue.business_hours[result.code].closing)
                .format('HH:mm') }
            </div>
          )
        }
      </div>
    </div>
  </div>

Hours.propTypes = {
  venue: React.PropTypes.object.isRequired
}


export default Hours
