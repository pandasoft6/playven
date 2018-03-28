import React, { Component, PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import PropTypeShapes from '../../../../components/PropTypes'
import Text from '../../../../containers/Text'

import AvailableCourtsRow from './AvailableCourtsRow'
import AvailableCourtsGrid from './AvailableCourtsGrid'
import moment from 'moment'
import _ from 'lodash'

const renderLoadingSpinner = () =>
  <div className="ptm">
    <FontAwesome
      className="spinner color-turquoise"
      name="refresh"
      spin={true}
      stack="2x" />
  </div>

const renderNoAvailabilityMessage = () =>
  <div className="phm pbm">
    <div className="pvt t3"><Text text="modals.booking.error" /></div>
    <p className="pvt"><Text text="modals.booking.info_1" /></p>
    <p className="pvt"><Text text="modals.booking.info_2" /></p>
  </div>


class Availability extends Component {
  componentDidMount() {
    const deviceWidth = window.innerWidth

    if (deviceWidth < 672) {
      this.props.setAvailabilityView('compact')
    }
  }

  // "rotates" the data: from courts array, which contains it's own available times, e.g.
  // {courts: [{ id: 1, available_times: ['7:00', '8:00']}, { id: 2, available_times: ['10:00'] }]
  // to available times array which contains courts, e.g.
  // [{time: '7:00', courts: [{id: 1}], {time: '8:00', courts: [{id: 1}}]
  slotsToRowData(slots) {
    const rows = {}

    slots.forEach(slot => {
      slot.available_times.forEach(availableTime => {
        const time = moment(availableTime.starts_at, 'YYYY-MM-DD HH:mm:ss').format('HH:mm')

        rows[time] = rows[time] || []
        rows[time].push({ ...availableTime, id: slot.id })
      })
    })

    const toArray = _.map(rows, (availableTimes, time) => {
      // we want to display names sorted, e.g.
      // Indoor 1, Indoor 2, Indoor 3, Outdoor 1, Outdoor 2 ...
      availableTimes.sort(this.sortByNameComparator.bind(this))

      return { time, availableTimes }
    })

    return _.sortBy(toArray, muppet => {
      const s = muppet.time.split(':')

      return parseInt(s[0], 10) + parseInt(s[1], 10) / 60
    })
  }

  sortByNameComparator(a, b) {
    const { allCourts } = this.props
    // can't just sort by name, 'cos then It will be Outdoor 1, Outdoor 10, Outdoor 11
    const [name1, integerS1] = allCourts[a.id].name.split(' ')
    const [name2, integerS2] = allCourts[b.id].name.split(' ')
    const [integer1, integer2] = [parseInt(integerS1, 10), parseInt(integerS2, 10)]

    if (name1 < name2) {
      return -1
    }
    if (name1 > name2) {
      return 1
    }
    if (integer1 > integer2) {
      return 1
    }
    if (integer1 < integer2) {
      return -1
    }
    return 0
  }

  sortDataForGrid(slots) {
    // no need to make a deep clone here
    const clone = _.clone(slots)

    clone.sort(this.sortByNameComparator.bind(this))
    return clone
  }

  renderAvailabilityView() {
    const { availabilityView, loading, selectedCourts, slots,
      allCourts, allVenuesById, venue } = this.props

    if (loading) {
      return renderLoadingSpinner()
    }

    if (slots.length === 0) {
      return renderNoAvailabilityMessage()
    }

    if (availabilityView === 'grid') {
      return <AvailableCourtsGrid
        allCourts={allCourts}
        allVenuesById={allVenuesById}
        selectedCourts={selectedCourts}
        slots={this.sortDataForGrid(slots)} />
    }

    return (
      <div>
        {this.slotsToRowData(slots).map((slot, index) =>
          <AvailableCourtsRow
            allCourts={allCourts}
            availableTimes={slot.availableTimes}
            courtIds={slot.courtIds}
            key={index}
            selectedCourts={selectedCourts}
            time={slot.time}
            venue={venue} />
        )}
      </div>
    )
  }

  render() {
    const { availabilityView, setAvailabilityView } = this.props
    const backgroundColor = availabilityView === 'compact' ? 'color-bg-grey-100' : null

    let compactClass = 'color-turquoise'
    let gridClass = 'color-grey-600'

    if (availabilityView === 'grid') {
      compactClass = 'color-grey-600'
      gridClass = 'color-turquoise'
    }

    return (
      <div className={backgroundColor} style={{ minHeight: '17.375rem' }}>
        <div className="flex-row">
          <h3 className="section-title flex mam">
            <Text text="modals.booking.search_results" />
          </h3>
          <div className="flex-row">
            <a className="mrs mvm" onClick={() => setAvailabilityView('compact')}>
              <i className={`icon-grid1 t2 ${compactClass}`} />
            </a>
            <a className="mrm mlt mvm" onClick={() => setAvailabilityView('grid')}>
              <i className={`icon-grid2 t2 ${gridClass}`} />
            </a>
          </div>
        </div>
        { this.renderAvailabilityView() }
      </div>
    )
  }
}

Availability.propTypes = {
  availabilityView: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  selectedCourts: PropTypes.arrayOf(PropTypeShapes.court),
  setAvailabilityView: PropTypes.func.isRequired,
  slots: PropTypes.arrayOf(PropTypes.shape),
  allCourts: PropTypes.object,
  allVenuesById: PropTypes.object,
  venue: PropTypes.object.isRequired
}


export default Availability
