import React, { Component, PropTypes } from 'react'
import Navigation from '../../../containers/Navigation'
import SearchGrid from '../../../containers/Searchgrid/SearchGrid'
import SearchResults from '../containers/SearchResultsContainer'
import SearchViewBlock from '../containers/SearchViewBlockContainer'
import Payment from '../../../containers/Modals/Payment'
import SearchMobileFilter from '../containers/SearchMobileFilterContainer'

class Search extends Component {
  componentDidMount() {
    const { getSportNames, queryParams, onSubmit } = this.props

    if (Object.keys(queryParams).length) {
      onSubmit(null, queryParams)
    }
    getSportNames()
  }

  render() {
    const { queryParams, onSubmit } = this.props

    return (
      <div className="flex color-bg-white">
        <header>
          <Navigation theme={'light'} />
        </header>

        <div className="mtm mhm mbs">
          <div className="search-page__search-bar">
            <SearchGrid />
          </div>
          <SearchViewBlock />
        </div>

        <SearchResults />
        <SearchMobileFilter />
        <Payment onSuccess={() => onSubmit(null, queryParams)} />
      </div>
    )
  }
}

Search.propTypes = {
  getSportNames: PropTypes.func.isRequired,
  queryParams: PropTypes.object,
  onSubmit: PropTypes.func.isRequired
}

export default Search
