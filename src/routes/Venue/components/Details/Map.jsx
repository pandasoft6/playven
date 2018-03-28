import React from 'react'

import Text from '../../../../containers/Text'


const Map = ({
  venue
}) =>
  <div className="venue-map mam pvm flex">
    <h2 className="section-title">
      <Text text="pages.venues.map" />
    </h2>
    <div className="venue-map__container">
      <iframe allowFullScreen={true}
        frameBorder="0"
        height="450"
        src={`https://www.google.com/maps/embed/v1/place?q=${venue.latitude},${venue.longitude}
          &key=AIzaSyA6ZzAtv2AfMF7QYR8MlBVonlqsKQsruoE`}
        style={{ border: 0 }}
        width="600" />
    </div>
  </div>

Map.propTypes = {
  venue: React.PropTypes.object.isRequired
}


export default Map
