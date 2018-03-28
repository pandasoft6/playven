import React from 'react'


const Information = ({ venue, isOpen }) =>
  <div className={`
  information flex color-white mbm
  ${isOpen ? 'show' : 'hide'}
  `}>
    <div className="flex-row mvs flex-hc-mobile">
      <i className="icon-map t3 mrs" />
      <div>
        { venue.street },
        <br />
        { venue.zip } { venue.city }
      </div>
    </div>

    <div className="flex-row mvs flex-hc-mobile">
      <i className="icon-phone t3 mrs" />
      <a href="">{ venue.phone_number }</a>
    </div>

    <div className="flex-row mvs flex-hc-mobile">
      <i className="icon-site t3 mrs" />
      <a href={`${venue.website}`}>
        { venue.website }
      </a>
    </div>

    <div className="flex-row mvs flex-hc-mobile">
      <i className="icon-parking t3 mrs" />
      <a href="">
        { venue.parking_info }
      </a>
    </div>

    <div className="flex-row mvs flex-hc-mobile">
      <i className="icon-transport t3 mrs" />
      <a href="">{ venue.transit_info }</a>
    </div>
  </div>

Information.propTypes = {
  venue: React.PropTypes.shape({
    city: React.PropTypes.string,
    /* eslint-disable */
    parking_info: React.PropTypes.string,
    phone_number: React.PropTypes.string,
    street: React.PropTypes.string,
    transit_info: React.PropTypes.string,
    /* eslint-enable */
    website: React.PropTypes.string,
    zip: React.PropTypes.string
  }).isRequired,
  isOpen: React.PropTypes.bool
}


export default Information
