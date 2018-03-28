import React from 'react'
import Text from 'components/Text'

import Images from './Overview/Images'
import Information from './Overview/Information'
import PriceRange from './Overview/PriceRange'


const Overview = ({ venue, toggleInfoOpen, isInfoOpen }) =>
  <div className="venue-overview">
    <div className="content color-white limit-width phm ptl pbm">
      <h1 className="text-center">{venue.venue_name}</h1>
      <div className="flex-row flex-col-mobile">
        <div>
          <button className="button-toggle-info mbm" onClick={toggleInfoOpen}>
            <i className="icon-info2 mrt" />
            <span>
              {isInfoOpen ?
                Text.t('pages.venues.hide_info') :
                Text.t('pages.venues.show_info')
              }
            </span>
          </button>
        </div>
        <Information isOpen={isInfoOpen} venue={venue} />
        <PriceRange
          currency={venue.currency_unit}
          highPrice={venue.highprice}
          lowPrice={venue.lowprice} />
      </div>
      <div className="search-area-buffer" />
    </div>
    <Images images={venue.images} />
  </div>


Overview.propTypes = {
  venue: React.PropTypes.object.isRequired,
  toggleInfoOpen: React.PropTypes.func,
  isInfoOpen: React.PropTypes.bool
}


export default Overview
