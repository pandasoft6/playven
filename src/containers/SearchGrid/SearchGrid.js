import { connect } from 'react-redux'
import SearchGrid from '../../components/SearchGrid'
import { onSubmit } from '../../modules/searchgrid'
import {
  searchBarChangeSport,
  searchBarChangeDuration,
  searchBarChangeDate,
  searchBarChangeTime,
  searchBarChangeCity
} from '../../actions/menu-actions'
import { getAllCities } from '../../api/cities-api'
import moment from 'moment'

const mapDispatchToProps = {
  onSubmit,
  getAllCities,
  changeSport: searchBarChangeSport,
  changeDuration: searchBarChangeDuration,
  changeDate: searchBarChangeDate,
  changeTime: searchBarChangeTime,
  changeCity: searchBarChangeCity
}

const calculateDefaultValues = state => {
  const datetime = moment().add(1, 'hour')
  // quantify to 0 or 30 minutes

  datetime.minutes(Math.floor(datetime.minute() / 30) * 30)

  // too early
  if (datetime.hour() < 6) {
    datetime.hour(6)
    datetime.minute(0)
  }

  // to late for today, look at 6 am next day
  if (datetime.hour() > 23 || datetime.hour() === 23 && datetime.minute() > 0) {
    // listing tomorrow
    datetime.hour(6)
    datetime.minute(0)
    datetime.add(1, 'day')
  }

  const city = state.countrySelection.chosenCountryId === 1 ?
    'Helsinki' :
    state.cities.allCities[0]

  return {
    sportName: 'tennis',
    date: datetime.format('DD/MM/YYYY'),
    // e.g. 1700,
    time: (datetime.hour() * 100 + datetime.minutes()).toString(),
    city,
    duration: '60'
  }
}

const mapStateToProps = state => {
  // calculate defaultValues each time, because default time is current hour + 1
  const defaultValues = calculateDefaultValues(state)

  return {
    preselectedSport: state.menu.sportName || state.location.query.sport_name ||
      defaultValues.sportName,
    preselectedDate: state.menu.date || state.location.query.date || defaultValues.date,
    preselectedTime: state.menu.time || state.location.query.time || defaultValues.time,
    preselectedDuration: state.menu.duration || state.location.query.duration ||
      defaultValues.duration,
    preselectedCity: state.menu.city || state.location.query.city || defaultValues.city,
    citiesList: state.cities.allCities,
    countryId: state.countrySelection.chosenCountryId
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchGrid)
