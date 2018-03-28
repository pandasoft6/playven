import { connect } from 'react-redux'
import { Fields } from '../../components/SearchGrid/FormFields'

const fields = state => state.searchgrid.fields

import {
  getSportNames
} from 'actions/venue-actions'

const mapStateToProps = {

  Sport: state => ({
    sports: state.venues.allSports
  }),
  Duration: state => ({
    durations: fields(state).durations
  }),
  Date: state => ({
    locale: state.i18n.locale
  }),
  Time: state => ({
    timetable: fields(state).timetable
  }),
  Submit: () => ({})
}

const mapDispatchToProps = {
  Sport: {
    getSportNames
  }
}

export default {
  Sport: connect(mapStateToProps.Sport, mapDispatchToProps.Sport)(Fields.Sport),
  Duration: connect(mapStateToProps.Duration)(Fields.Duration),
  Date: connect(mapStateToProps.Date)(Fields.Date),
  Time: connect(mapStateToProps.Time)(Fields.Time),
  Submit: connect(mapStateToProps.Submit)(Fields.Submit)
}
