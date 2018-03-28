import React, { Component } from 'react'
import Slider from 'react-slick'

const settings = {
  arrows: true,
  slidesToShow: 2,
  swipeToSlide: true,
  adaptiveHeight: false,
  infinite: false,
  draggable: false,
  swipe: false,
  vertical: true
}

export default class SearchTimeSlotCarousel extends Component {
  static propTypes = {
    children: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
    sliderSettings: React.PropTypes.object
  }

  state = {
    timer: null
  }

  componentDidMount() {
    this.updateSlider()
  }

  componentWillUnmount() {
    clearTimeout(this.state.timer)
  }

  updateSlider() {
    if (this.slider) {
      this.setState({
        timer: setTimeout(() => this.forceUpdate(), 1)
      })
    }
  }

  render () {
    return (
      <Slider
        className="time-slot-carousel"
        ref={node => this.slider = node}
        {...settings}
        {...this.props.sliderSettings}>
        {this.props.children}
      </Slider>
    )
  }
}
