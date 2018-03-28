import React from 'react'

import About from './Details/About'
import Hours from './Details/Hours'
import Map from './Details/Map'


const DetailsSection = ({ venue }) =>
  <div className="limit-width">
    <div className="flex-col flex-row-desktop flex-col-tablet mam ptl">
      <About venue={venue} />
      <Hours venue={venue} />
    </div>

    <Map venue={venue} />
  </div>

DetailsSection.propTypes = {
  venue: React.PropTypes.object.isRequired
}


export default DetailsSection
