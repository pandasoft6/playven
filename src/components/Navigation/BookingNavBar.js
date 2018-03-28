import React, { PropTypes } from 'react'
import Sticky from 'react-stickynode'
import { I18n } from 'react-redux-i18n'

class BookingNavBar extends React.Component {
  render() {
    const { clearSelectedCourts, selectedCourts, openModal } = this.props

    const renderContent =
      <div
        className="header-booking color-bg-azure"
        style={{ display: `${selectedCourts.length ? 'block' : 'none'}` }}>
        <div className="limit-width flex-row flex-col-lt-tablet flex-vc">
          <div className="header-booking__text color-white">
            {I18n.t('nav.booking', { count: selectedCourts.length })}
          </div>
          <div>
            <button
              className="header-booking__book_now"
              onClick={() => openModal('payment')}>
              <span className="flex-row flex-vc">
                <i className="icon-checked" />
                {I18n.t('nav.book_now')}
              </span>
            </button>
            <button
              className="header-booking__book_clear"
              onClick={clearSelectedCourts}>
              <span className="flex-row flex-vc">
                <i className="icon-rounded-cross" />
                {I18n.t('nav.clear_all')}
              </span>
            </button>
          </div>
        </div>
      </div>

    return (
      <div className="booking-nav-bar">
        <Sticky>{renderContent}</Sticky>
      </div>
    )
  }
}
BookingNavBar.propTypes = {
  clearSelectedCourts: PropTypes.func.isRequired,
  selectedCourts: PropTypes.arrayOf(PropTypes.object),
  openModal: PropTypes.func.isRequired
}

export default BookingNavBar
