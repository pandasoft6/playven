import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import Text from '../../../containers/Text'
import ProfileNavigationOrder from '../containers/ProfileNavigationOrderContainer'
import { FILTER_TYPE, FILTER_ORDER } from '../modules/profile'

const reservationOrderOptions = [{
  value: FILTER_ORDER.FUTURE,
  translation: 'pages.profile.navigation.future'
}, {
  value: FILTER_ORDER.PAST,
  translation: 'pages.profile.navigation.past'
}]

const invoicesOrderOptions = [{
  value: FILTER_ORDER.PAID,
  translation: 'pages.profile.navigation.paid'
}, {
  value: FILTER_ORDER.UNPAID,
  translation: 'pages.profile.navigation.unpaid'
}]

const gamePassesOrderOptions = [{
  value: FILTER_ORDER.VALID,
  translation: 'pages.profile.navigation.valid'
}, {
  value: FILTER_ORDER.EXPIRED,
  translation: 'pages.profile.navigation.expired'
}]

const reservationOptions = [{
  value: FILTER_TYPE.RESERVATIONS,
  label: <Text text="pages.profile.navigation.reservations" />
}, {
  value: FILTER_TYPE.RECURRING_RESERVATIONS,
  label: <Text text="pages.profile.navigation.recurring" />
}, {
  value: FILTER_TYPE.RESELLING_RECURRING_RESERVATIONS,
  label: <span className="select-subitem"><Text text="pages.profile.navigation.reselling" /></span>
}, {
  value: FILTER_TYPE.RESOLD_RECURRING_RESERVATIONS,
  label: <span className="select-subitem"><Text text="pages.profile.navigation.resold" /></span>
}]

class SecondaryProfileNavigation extends Component {
  static propTypes = {
    active: PropTypes.string.isRequired,
    filter: PropTypes.object.isRequired,
    minMaxDate: PropTypes.object.isRequired,
    onChangeFilter: PropTypes.func.isRequired
  }

  render() {
    const { active, filter, onChangeFilter, minMaxDate } = this.props

    switch (active) {
      case 'edit':
        return null
      case 'reservations':
        return (
          <div className="reservations-navigation max-width">
            <div>
              <ProfileNavigationOrder options={reservationOrderOptions} />
            </div>
            <div className="reservations-navigation__fields-wrapper">
              <div className="navigation-field">
                <div className="navigation-field__title">Reservation type</div>
                <Select
                  className="search-field"
                  clearable={false}
                  name="time"
                  onChange={e => onChangeFilter({ name: 'type', value: e.value })}
                  options={reservationOptions}
                  placeholder={`${Text.t('general.select')}...`}
                  searchable={false}
                  value={filter.type} />
              </div>
              <div className="navigation-field search-field search-field__date">
                <div className="navigation-field__title">
                  <Text text="pages.profile.navigation.from" />
                </div>
                <DatePicker
                  dateFormat="DD/MM/YYYY"
                  locale={moment.locale()}
                  maxDate={minMaxDate.max}
                  minDate={minMaxDate.min}
                  name="dateFrom"
                  onChange={date => {
                    onChangeFilter({ name: 'dateFrom', value: date })
                  }}
                  peekNextMonth={true}
                  selected={filter.dateFrom} />
              </div>
              <div className="navigation-field search-field search-field__date">
                <div className="navigation-field__title">
                  <Text text="pages.profile.navigation.to" />
                </div>
                <DatePicker
                  dateFormat="DD/MM/YYYY"
                  locale={moment.locale()}
                  maxDate={minMaxDate.max}
                  minDate={minMaxDate.min}
                  name="dateTo"
                  onChange={date => {
                    onChangeFilter({ name: 'dateTo', value: date })
                  }}
                  peekNextMonth={true}
                  selected={filter.dateTo} />
              </div>
            </div>
          </div>
        )
      case 'invoices':
        return (
          <div className="invoices-navigation max-width">
            <ProfileNavigationOrder options={invoicesOrderOptions} />
          </div>
        )
      case 'game_passes':
        return (
          <div className="gamePasses-navigation max-width">
            <div className="gamePasses-navigation__holder">
              <ProfileNavigationOrder options={gamePassesOrderOptions} />
            </div>
          </div>
        )
      default:
        return null
    }
  }
}

export default SecondaryProfileNavigation
