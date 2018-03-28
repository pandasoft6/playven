import React from 'react'
import Slider from 'react-slick'


const settings = {
  arrows: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
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

const CourtsCarousel = ({ children }) =>
  <div className="flex courts-carousel phm">
    <Slider {...settings}>
      {children}
    </Slider>
  </div>


CourtsCarousel.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.element).isRequired
}


export default CourtsCarousel
