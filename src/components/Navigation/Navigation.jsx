import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import BookingNavBar from '../../containers/Navigation/BookingNavBarContainer'
import Select from 'react-select'
import Text from 'containers/Text'
import LanguageSelector from 'containers/LanguageSelector'
import CountrySelector from 'containers/CountrySelector'
import Buttons from './Buttons'
import ResendConfirmationModal from 'containers/Modals/ResendConfirmationEmail'
import ForgotPassword from 'containers/Modals/ForgotPassword'
import _ from 'lodash'
import { browserHistory } from 'react-router'

class Navigation extends React.Component {
  componentWillMount() {
    const { country, searchByName } = this.props

    searchByName('', country)
  }

  componentWillReceiveProps(nextProps) {
    const { country, searchByName } = this.props

    if (country && country !== nextProps.country) {
      searchByName('', nextProps.country)
    }
  }

  renderProfileButtonsLoggedIn() {
    return <div className="navigation-right-links flex-row flex-hc">
      <Buttons.Profile />
      <Buttons.Logout />
    </div>
  }

  renderProfileButtonsLoggedOut() {
    return <div className="navigation-right-links flex-row flex-vc">
      <Buttons.Login />
      <div className="mrs color-white text-uc">
        <Text text="nav.or" />
      </div>
      <Buttons.Register />
    </div>
  }

  onVenueSearchChange(option) {
    browserHistory.push(`/venues/${option.value}`)
  }

  venueSearchByName(venuesByName) {
    const { country } = this.props
    const options = venuesByName.map(venue => ({ label: venue.venue_name, value: venue.id }))
    const debouncedFetch = _.debounce(searchTerm => {
      this.getVenueSearchOptions(searchTerm, country)
    }, 500)

    return (
      <Select
        className="header-search-field"
        ignoreAccents={false}
        loadingPlaceholder={Text.t('nav.loading')}
        onChange={this.onVenueSearchChange}
        onInputChange={debouncedFetch}
        options={options}
        placeholder={Text.t('nav.find_venue')}
        searchable={true} />
    )
  }

  getVenueSearchOptions(input, country) {
    this.props.searchByName(input, country)
  }


  render() {
    const { theme, toggleMobileMenu, toggleSearchMenu, auth, isMobileMenuOpen,
      isSearchMenuOpen, changeLocale, venuesByName, countryList, country,
      changeCountry } = this.props

    const decodeDate = encodeURIComponent(moment().format('DD/MM/YYYY'))
    const nextHour = moment().add(1, 'hour').startOf('hour').format('HHmm')

    return (
      <div className={theme} id="navigation">
        <div className="visible-sm-block">
          <div id="navigation-mobile-menu">
            <div className="flex-row flex-hb">
              <Link className="navigation-logo" to="/" />
              <div className="prt flex-row flex-vc">
                <button
                  className="t2 pas"
                  id="navigation-toggle"
                  onClick={() => toggleMobileMenu()}
                  type="button">
                  <i className="icon-menu color-white" />
                </button>
                <button
                  className="t3 pas"
                  onClick={() => toggleSearchMenu()}
                  type="button">
                  <i className="icon-search color-white" />
                </button>
              </div>
            </div>
            { isSearchMenuOpen && <div className="mobile-menu-wrapper">
              <button
                className="close-mobile-menu"
                onClick={() => toggleSearchMenu()}>
                <i className="icon-rounded-cross color-white" />
              </button>
              <div className="flex-row flex-hc mtxl">
                {this.venueSearchByName(venuesByName)}
              </div>
            </div>}
            { isMobileMenuOpen && <div className="mobile-menu-wrapper">
              <div
                className="close-mobile-menu"
                onClick={() => toggleMobileMenu()}>
                <i className="icon-rounded-cross color-white" />
              </div>
              <div className="mobile-menu-wrapper-holder">
                <div className="navigation-link">
                  <Link className="navigation-logo" to="/" />
                </div>
                <div className="language">
                  <div
                    className={`language-item ${localStorage.locale === 'en' ? 'active' : ''}`}
                    onClick={() => changeLocale('en')}>
                    English
                  </div>
                  <div
                    className={`language-item ${localStorage.locale === 'fi' ? 'active' : ''}`}
                    onClick={() => changeLocale('fi')}>
                    Suomi
                  </div>
                </div>
                <div className="language">
                  {countryList.map((item, i) =>
                    <div
                      className={`language-item ${item.id === parseInt(country, 10) && 'active'}`}
                      key={i}
                      onClick={() => changeCountry(item.id)}>
                      {item.name}
                    </div>
                  )}
                </div>
                <div className="mobile-menu-links">
                  <Link
                    className="navigation-link color-white text-uc"
                    to={`/search?date=${decodeDate}&duration=60&sport_name=tennis&time=${nextHour}`}>
                    <Text text="nav.venues" />
                  </Link>
                  <a
                    className="navigation-link color-white text-uc"
                    href="https://playven.zendesk.com/hc/fi">
                    <Text text="nav.help" />
                  </a>
                  <Link
                    activeClassName="active"
                    className="navigation-link color-white text-uc"
                    to="/sales">
                    <Text text="nav.sales" />
                  </Link>
                </div>
              </div>
              <div className="mobile-menu-account-block">
                {auth && this.renderProfileButtonsLoggedIn()}
                {!auth && this.renderProfileButtonsLoggedOut()}
              </div>
            </div>
            }
          </div>
        </div>
        <div className="hidden-sm">
          <div id="navigation-menu">
            <div className="flex-row flex-hc mlt-gt-mobile mtm-mobile">
              <Link className="navigation-logo" to="/" />
            </div>
            <div className="navigation-menu-links flex-row flex-hc">
              <Link
                className="navigation-link mlm color-white text-uc"
                to={`/search?date=${decodeDate}&duration=60&sport_name=tennis&time=${nextHour}`}>
                <Text text="nav.venues" />
              </Link>
              <a
                className="navigation-link mlm color-white text-uc"
                href="https://playven.zendesk.com/hc/fi">
                <Text text="nav.help" />
              </a>
              <Link
                activeClassName="active"
                className="navigation-link mlm color-white text-uc"
                to="/sales">
                <Text text="nav.sales" />
              </Link>
              <CountrySelector />
              <LanguageSelector />
              {this.venueSearchByName(venuesByName)}
            </div>
            {auth && this.renderProfileButtonsLoggedIn()}
            {!auth && this.renderProfileButtonsLoggedOut()}
          </div>
        </div>
        <BookingNavBar />
        { !auth && <ForgotPassword /> }
        { !auth && <ResendConfirmationModal /> }
      </div>
    )
  }
}

Navigation.propTypes = {
  theme: PropTypes.string,
  toggleMobileMenu: PropTypes.func,
  toggleSearchMenu: PropTypes.func,
  changeLocale: PropTypes.func,
  auth: PropTypes.bool,
  isMobileMenuOpen: PropTypes.bool,
  isSearchMenuOpen: PropTypes.bool,
  country: PropTypes.number,
  searchByName: PropTypes.func.isRequired,
  venuesByName: PropTypes.arrayOf(PropTypes.object),
  countryList: PropTypes.arrayOf(PropTypes.object),
  changeCountry: PropTypes.func.isRequired
}

export default Navigation
