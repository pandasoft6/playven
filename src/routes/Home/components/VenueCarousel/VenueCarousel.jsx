import React, { Component, PropTypes } from 'react'
import Slider from 'react-slick'
import Text from 'containers/Text'
import ParallaxImage from '../ParallaxImage'
import circle1 from '../images/circle_1.svg'

class VenueCarousel extends Component {
  componentDidMount() {
    const { getVenues, selectedCountry } = this.props

    getVenues('', selectedCountry.id)
  }

  componentWillReceiveProps(nextProps) {
    const { getVenues, selectedCountry } = this.props

    if (selectedCountry.id && selectedCountry.id !== nextProps.selectedCountry.id) {
      getVenues('', nextProps.selectedCountry.id)
    }
  }

  render() {
    const { allVenues, selectedCountry } = this.props
    const slides = allVenues.map((venue, idx) =>
      <div className="recommended-item-wrapper" key={`${idx}_${venue.id}`}>
        <div className="recommended-item">
          <h5><span>{venue.venue_name}</span></h5>
          <a href={`/venues/${venue.id}`}>
            <div className="recommended-image-wrapper">
              <div
                className="recommended-image"
                style={{ backgroundImage: `url(${venue.image})` }} />
            </div>
          </a>
          <div className="recommended-price-box">{venue.lowest_price}{venue.currency_unit}</div>
          <a href={`/venues/${venue.id}`}>
            <button className="bd-btn-primary">
              <span><Text text="general.book_now" /></span>
            </button>
          </a>
          <a className="link-info" href={`/venues/${venue.id}`}>
            <span><Text text="general.info" /></span>
            <i className="icon-medium-arrow-right mlt" />
          </a>
        </div>
      </div>
    )

    const settings = {
      arrows: true,
      slidesToShow: 4,
      swipeToSlide: true,
      adaptiveHeight: false,
      infinite: slides.length > 4 ? true : false,
      draggable: false,
      swipe: false,
      responsive: [
        {
          breakpoint: 780,
          settings: {
            slidesToShow: 1
          }
        },
        {
          breakpoint: 1040,
          settings: {
            slidesToShow: 2
          }
        }
      ]
    }

    return (
      <div className="home-section recommended limit-width">
        <ParallaxImage className="content-block-circle-under-right-top" src={circle1} />
        <ParallaxImage className="content-block-circle-under-left-bottom" src={circle1} />
        <h2 className="title-section"><span><Text text="pages.home.recommended" />{selectedCountry.name}</span></h2>
        <div className="recommended-slider flex-row flex-vd">
          {allVenues.length && <Slider className="recommended-carousel" {...settings}>
            {slides}
          </Slider>}
        </div>
      </div>
    )
  }
}

VenueCarousel.propTypes = {
  allVenues: PropTypes.arrayOf(PropTypes.object).isRequired,
  getVenues: PropTypes.func.isRequired,
  selectedCountry: PropTypes.object.isRequired
}
export default VenueCarousel
