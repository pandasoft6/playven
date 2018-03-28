import React, { PropTypes, Component } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

/*
  Has to be a component class to avoid pollutation in state.
  This component is unable to update itself, and needsa a 'onChange' method.
  https://github.com/Hacker0x01/react-datepicker
  ~ m.sorja
*/


class SearchField_Date extends Component {
  constructor(props) {
    super(props)
    const selected = props.param ? moment(props.param, 'DD/MM/YYYY') : moment()

    this.state = { selected }
    this.onChange = this.onChange.bind(this)
  }

  onChange(selected) {
    this.setState({
      selected
    })

    // props.onChange can be null (e.g. on landing page, do nothing on date change)
    // and can be defined as well (venue#show page, reload the grid if onChange is given)
    if (this.props.onChange) {
      this.props.onChange(selected.format('DD/MM/YYYY'))
    }
  }

  componentDidMount() {
    this.datepicker.handleBlur = () => {}
  }

  render() {
    const { locale, limit } = this.props
    const { selected } = this.state

    return (
      <div className="search-field search-field__date">
        <DatePicker
          ref={node => this.datepicker = node}
          dateFormat="DD/MM/YYYY"
          locale={locale}
          maxDate={moment().add(limit ? limit : 365, 'days')}
          minDate={moment()}
          name="date"
          onChange={this.onChange}
          peekNextMonth={true}
          selected={selected} />
      </div>
    )
  }
}


SearchField_Date.propTypes = {
  locale: PropTypes.string.isRequired,
  onChange: PropTypes.func
}

export default SearchField_Date
