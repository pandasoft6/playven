import React, { PropTypes } from 'react'
import { I18n } from 'react-redux-i18n'
import CourtCardPopover from './CourtCardPopover'

const SportCard = ({ data, filter }) =>
  <div className="sport-card">
    <div className="sport-slot__wrapper">
      <div className="sport-slot flex-row text-uc">
        <div className="sport-slot__icon mhs" style={{fontSize:'2.5rem'}}>
          <i className={`icon-${data.sport}`} />
        </div>
        <div className="mhs flex-col t3 em-high" style={{zIndex: '999'}}>
          <div className="sport-slot__sport-name flex-col">
            {data.sport}
          </div>
          <div className="sport-slot__count-courts flex-col t5 em-low">
            {I18n.t('pages.profile.court', { count: data.courts })}
          </div>
        </div>
      </div>
    </div>
    <div className="court-card__wrapper">
      {data.reservations.map((data, i) =>
        <CourtCardPopover key={`${i}_${data.id}`} reservation={data} />
      )}
    </div>
  </div>

export default SportCard
