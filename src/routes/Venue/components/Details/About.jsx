import React from 'react'

import Text from '../../../../containers/Text'


const About = ({ venue }) =>
  <div className="mrl mrn-mobile mrn-tablet mbl-lt-desktop" style={{ flex: 2 }}>
    <h2 className="section-title">
      <Text text="pages.venues.about_venue" />
    </h2>
    <div className="color-grey-800" style={{ lineHeight: '2.375rem' }}>
      { venue.description }
    </div>
  </div>

About.propTypes = {
  venue: React.PropTypes.object.isRequired
}


export default About
