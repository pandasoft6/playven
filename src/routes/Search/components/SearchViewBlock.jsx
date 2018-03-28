import React, { Component, PropTypes } from 'react'
import Text from 'components/Text'
import moment from 'moment'
import { GRID_TYPES } from '../modules/search'

class SearchViewBlock extends Component {
  static propTypes = {
    changeGridType: PropTypes.func.isRequired,
    gridType: PropTypes.string.isRequired,
    date: PropTypes.string,
    city: PropTypes.string
  }

  renderButtons() {
    const { gridType, changeGridType } = this.props
    const buttons = [{
      type: GRID_TYPES.DEFAULT,
      className: 'search-results__change_view_icon_default icon-hex-grid-light'
    },
    {
      type: GRID_TYPES.TIMELINE,
      className: 'search-results__change_view_icon_timeline icon-hex-time-light',
      hideMobile: true
    }]

    return buttons.map(button =>
      <button
        className={`
          search-results__change_view_action
          ${button.hideMobile ? 'hide-mobile' : ''}
          ${gridType === button.type ? 'active' : ''}
        `}
        key={button.type}
        onClick={() => changeGridType(button.type)}>
        <i className={button.className} />
      </button>
    )
  }

  render() {
    const { date, city } = this.props

    return (
      <div className="flex-row flex-col-mobile flex-hc-mobile flex-hb pam-desktop mtl mbm-mobile">
        <div className="search-results__title flex-col">
          <h3 className="text-uc color-dark-grey">
            <Text text="components.venue_search.search_result_for" />
            {' '}
            { city && city.toUpperCase() }
            {' '}
            { moment(date, 'DD/MM/YYYY').format('DD/MM/YYYY') }
          </h3>
        </div>
        <div className="search-results__change_view flex-row flex-hc-mobile">
          {this.renderButtons()}
        </div>
      </div>
    )
  }
}

export default SearchViewBlock
