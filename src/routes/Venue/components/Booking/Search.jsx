import moment from 'moment'
import React, { Component, PropTypes } from 'react'

import Fields from '../../../../components/SearchGrid/FormFields'
import SmartFields from '../../../../containers/SearchGrid/SearchFields'


class Search extends Component {
  componentDidMount() {
    this.selectSupportedSport()
    this.doInitialSearchRequest()
  }

  componentDidUpdate() {
    this.selectSupportedSport()
    this.doInitialSearchRequest()
  }

  selectSupportedSport() {
    if (!this.isCurrentSportSupported()) {
      const supportedSport = this.getSupportedSport()

      if (supportedSport) {
        this.props.changeSport(supportedSport)
      }
    }
  }

  getSupportedSport() {
    // sometimes venue does not have a selected state. For instance, default sport
    // is "tennis", and court has only "squash". Not a big deal, just select one it has
    const supportedSports = this.sportsSupportedByVenue()

    if (supportedSports.length > 0) {
      return supportedSports[0].sport
    }
    return null
  }

  doInitialSearchRequest() {
    if (!this.isCurrentSportSupported()) {
      return false
    }
    // that's just about doing request once and we don't know when we achieve proper
    // params (e.g. if we refresh the page on venue#show). That's why we don't store it
    // on state, to not trigger re-render
    if (this.didInitialSearchRequest) {
      return false
    }
    this.didInitialSearchRequest = true

    const currentSport = this.props.sport

    return this.onSearchSubmit({
      // eslint-disable-next-line
      sport_name: currentSport,
      date: moment().format('DD/MM/YYYY')
    })
  }

  onSearchSubmit(params) {
    const {
      venue,
      changeSport,
      changeDate,
      fetchSingleVenue
    } = this.props

    const { sport, date } = this.props
    // eslint-disable-next-line
    const combinedParams = { venueId: venue.venue_id, sport_name: sport, duration: 'all', date, ...params }


    fetchSingleVenue(combinedParams)

    changeSport(combinedParams.sport_name)
    changeDate(combinedParams.date)
  }

  sportsSupportedByVenue() {
    const { sports, venue } = this.props

    return sports.filter(sport => venue.supported_sports.indexOf(sport.sport) !== -1)
  }

  isCurrentSportSupported() {
    const selectedSport = this.props.sport

    return Boolean(this.sportsSupportedByVenue().filter(sport => sport.sport === selectedSport)[0])
  }
  render() {
    const { sport, date, venue, getSportNames } = this.props

    return (
      <div className="flex-row flex-hc mam">
        <form role="search">
          <div className="flex-col">
            <div className="flex-row flex-col-mobile">
              { this.isCurrentSportSupported() && <Fields.Sport
                getSportNames={getSportNames}
                // eslint-disable-next-line
                onChange={value => value && this.onSearchSubmit({ sport_name: value })}
                param={sport}
                sports={this.sportsSupportedByVenue()} />
              }
              <SmartFields.Date
                limit={venue.booking_ahead_limit}
                onChange={dateFromInput => this.onSearchSubmit({ date: dateFromInput })}
                param={date} />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

Search.propTypes = {
  changeSport: PropTypes.func.isRequired,
  changeDate: PropTypes.func.isRequired,
  formClass: PropTypes.string,
  sports: PropTypes.arrayOf(React.PropTypes.object),
  venue: PropTypes.object,
  sport: PropTypes.string,
  date: PropTypes.string,
  fetchSingleVenue: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  getSportNames: PropTypes.func.isRequired
}


export default Search
