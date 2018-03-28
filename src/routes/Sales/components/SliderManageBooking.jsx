import React, { Component } from 'react'
import Slider from 'react-slick'
import { I18n } from 'react-redux-i18n'
import customerPreview from './images/customer-preview.png'
import calendarPreview from './images/calendar-preview.png'
import reportsPreview from './images/reports-preview.png'

const settings = {
  arrows: true,
  slidesToShow: 1,
  swipeToSlide: true,
  adaptiveHeight: false,
  infinite: false,
  draggable: false,
  swipe: true,
  vertical: false
}

const sliderItems = [{
  image: reportsPreview,
  title: 'pages.sales.report',
  description: 'pages.sales.report_text'
}, {
  image: calendarPreview,
  title: 'pages.sales.calendar',
  description: 'pages.sales.calendar_text'
}, {
  image: customerPreview,
  title: 'pages.sales.customer',
  description: 'pages.sales.customer_text'
}]


export default class SearchTimeSlotCarousel extends Component {
  static propTypes = {
    children: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
    sliderSettings: React.PropTypes.object
  }

  state = {
    timer: null,
    slideNumber: 0
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

  renderDescriptions = () => {
    const activeIndex = this.state.slideNumber

    return (
      sliderItems.map((item, idx) =>
        <div
          className={`slider-manage-booking__description ${activeIndex === idx ? 'active' : ''}`}
          key={idx}>
          <span>0{idx + 1}</span>
          <div className="slider-manage-booking__buttons">
            <button
              className="slider-manage-booking__prev"
              onClick={() => this.slider.slickPrev()}>prev</button>
            <button
              className="slider-manage-booking__next"
              onClick={() => this.slider.slickNext()}>next</button>
          </div>
          <h3>{I18n.t(item.title)}</h3>
          <p>{I18n.t(item.description)}</p>
        </div>)
    )
  }

  renderDots = () => {
    const activeIndex = this.state.slideNumber

    return (
      sliderItems.map((item, idx) =>
        <button
          className={`slider-manage-booking__dot ${activeIndex === idx ? 'active' : ''}`} key={idx}
          onClick={() => this.slider.slickGoTo(idx)} />
      )
    )
  }

  render() {
    return (
      <div className="slider-manage-booking">
        <div className="slider-manage-booking__description_wrapper">
          <div className="slider-manage-booking__dots">
            {this.renderDots()}
          </div>
          {this.renderDescriptions()}
        </div>
        <div className="slider-manage-booking__slider_wrapper">
          <Slider
            afterChange={slideNumber => {
              this.setState({ slideNumber })
            }}
            className="slider-manage-booking__slider"
            ref={node => this.slider = node}
            {...settings}
            {...this.props.sliderSettings}>
            {sliderItems.map((item, idx) =>
              <img alt="Manage booking preview" key={idx} src={item.image} />)}
          </Slider>
        </div>
      </div>
    )
  }
}
