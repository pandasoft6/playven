import React, { Component, PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import Navigation from '../../../containers/Navigation'
import OverviewSection from './OverviewSection'
import BookingSection from '../containers/BookingSectionContainer'
import DetailsSection from './DetailsSection'
import Payment from '../../../containers/Modals/Payment'

class VenueView extends Component {
  componentDidMount() {
    const { getSportNames, loadVenue, pathName } = this.props

    loadVenue(pathName)
    getSportNames()
  }

  componentWillReceiveProps(nextProps) {
    const { pathName, loadVenue, getSportNames, onVenueLoad } = this.props

    if (pathName !== nextProps.pathName) {
      // to disable court grid during venue fetch
      onVenueLoad(null)
      loadVenue(nextProps.pathName)
      getSportNames()
    }
  }

  renderViews() {
    const { venue, isInfoOpen, toggleInfoOpen } = this.props


    if (venue) {
      const { fetchSingleVenue, sport, date } = this.props
      // eslint-disable-next-line
      const combinedParams = { venueId: venue.venue_id, sport_name: sport, duration: 'all', date }

      return (
        <div>
          <OverviewSection
            isInfoOpen={isInfoOpen}
            toggleInfoOpen={toggleInfoOpen}
            venue={venue} />
          {venue.status !== 'prepopulated' &&
            <BookingSection venue={venue} />
          }
          <DetailsSection venue={venue} />
          <Payment onSuccess={() => fetchSingleVenue(combinedParams)} venue={venue} />
        </div>
      )
    }

    return (
      <div style={{ marginTop: '200px', paddingBottom: '1000px' }}>
        <FontAwesome
          className="color-primary-brand"
          name="refresh"
          spin={true}
          stack="2x" />
      </div>
    )
  }

  render() {
    return (
      <div>
        <header>
          <Navigation theme="light" />
        </header>
        <main>
          {this.renderViews()}
        </main>
      </div>
    )
  }
}

VenueView.propTypes = {
  getSportNames: PropTypes.func.isRequired,
  loadVenue: PropTypes.func.isRequired,
  pathName: PropTypes.string,
  venue: PropTypes.object,
  toggleInfoOpen: PropTypes.func,
  isInfoOpen: PropTypes.bool,
  fetchSingleVenue: PropTypes.func.isRequired,
  sport: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onVenueLoad: PropTypes.func.isRequired
}


export default VenueView
