import React, { PropTypes } from 'react'
import { Link } from 'react-router'

export const SearchResultPrepopulated = ({ venue }) =>
  <div className="pas">
    <div className="venue-search-result-item color-bg-white">

      <h5 className="venue-name flex-row text-uc flex-hc color-dark-grey">
        {venue.venue_name}
      </h5>

      <div className="venue-info flex-row flex-hc t5 pbs dark-grey">
        <a href={`/venues/${venue.id}`}>info →</a>
      </div>

      <Link className="venue-image-preview"
        style={{ backgroundImage: `url(${venue.image})` }}
        to={`/venues/${venue.id}`} />
      <div className="venue-timeslot-wrapper" style={{ minHeight: '4.5rem' }} />
    </div>
  </div>


SearchResultPrepopulated.propTypes = {
  venue: PropTypes.object
}


export default SearchResultPrepopulated
