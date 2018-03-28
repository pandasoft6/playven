import React from 'react'
import Slider from 'react-slick'


const settings = {
  arrows: false,
  dots: true,
  fade: true,
  cssEase: 'linear',
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
}

const Images = ({ images }) =>
  <Slider className="venue-images" {...settings}>
    {images.map((image, index) =>
      <div className="venue-images__image-container" key={index}>
        <div
          className="venue-images__image"
          style={{
            backgroundImage: `url(${image.image_url})`
          }} />
      </div>
    )}

  </Slider>

Images.propTypes = {
  images: React.PropTypes.arrayOf(React.PropTypes.shape({
    // eslint-disable-next-line
    image_url: React.PropTypes.string.isRequired
  })).isRequired
}


export default Images
