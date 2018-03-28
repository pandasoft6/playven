import React, { PropTypes } from 'react'
import { I18n } from 'react-redux-i18n'
import SportCard from '../containers/SportCardContainer'

const VenueCard = ({ data, currency }) =>
  <div className="venue-item__content flex-col pas color-bdt-lighter-grey">
    <div className="venue-item__court-name flex-row flex-hb mhs mbs">
      <div className="flex-row flex-vc ">
        <div className="venue-name__photo-wrap mhs mrs">
          <div style={{ backgroundImage: `url(${data.venue_photo})` }} />
        </div>
        <div className="venue-name__content-wrap mhs">
          <h5 className="color-grey-900 t3">{data.venue_name}</h5>
        </div>
      </div>
      <div className="flex-row flex-vc hide-mobile">
        <div className="venue-item__total">
          <div className="venue-item__total_text">
            <sup className="currency">{currency}</sup>
            {data.total}
            {' '}
            {I18n.t('pages.profile.total')}
          </div>
          <div className="venue-item__total_subtext">
            {I18n.t('pages.profile.court', { count: data.courts })}, {data.minutes}
            {' '}
            {I18n.t('pages.profile.minutes')}
          </div>
        </div>
      </div>
    </div>
    <div className="pvs mhs">
      {data.sports.map((data, i) =>
        <SportCard
          data={data}
          key={i} />
      )}
    </div>
  </div>

export default VenueCard
