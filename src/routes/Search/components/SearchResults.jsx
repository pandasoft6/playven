import React, { PropTypes, Component } from 'react'
import utils from '../../../utils'
import Fa from 'react-fontawesome'
import { GRID_TYPES } from '../modules/search'
import Pagination from '../containers/Pagination'
import SearchResultItem from './SearchResultItem'
import SearchResultItemTimeLine from './SearchResultItemTimeLine'
import SearchResultPrepopulated from './SearchResultPrepopulated'
import _ from 'lodash'
import moment from 'moment'
import Text from '../../../containers/Text'

class SearchResults extends Component {
  prepareData() {
    const { searchResults, allVenuesById, allCourts } = this.props
    // if nothing found

    if (!searchResults) {
      return []
    }

    return searchResults.map(searchResult => {
      const availableTimes = {}

      searchResult.courts.forEach(court => {
        court.available_times.forEach(session => {
          const startTime = moment(session.starts_at, 'YYYY-MM-DD THH:mm:ss')
          const key = startTime.format('HH:mm')

          availableTimes[key] = availableTimes[key] || []
          availableTimes[key].push({
            court: allCourts[court.id],
            ...session
          })
        })
      })
      return {
        venue: allVenuesById[searchResult.venue.id],
        availableTimes
      }
    })
  }


  render() {
    const { searchResults, searching, show, selectedCourts,
            onCourtSelect, pageNumber, perPage, errorMessage, gridType,
            prepopulatedVenues } = this.props

    // Todo improvment: prepare data we are going to present, not all entries and then chunkfiy
    const pageSearchResults = utils.chunkify(this.prepareData(), perPage)
    const maxPage = pageSearchResults.length - 1

    return (
      <div>
        <div className="mhs mbm">
          <div className={`venue-results ${gridType}`}>
            {searching &&
            <Fa className="loading color-primary-brand"
              name="refresh"
              spin={true}
              stack="2x" />
          }
            {!searching && _.flatten(pageSearchResults).length > 0 &&
            <div className="venue-results-grid">
              {pageSearchResults[pageNumber].map((result, index) => {
                let ResultItem = null

                switch (gridType) {
                  case GRID_TYPES.TIMELINE:
                    ResultItem = SearchResultItemTimeLine
                    break
                  default:
                    ResultItem = SearchResultItem
                }
                return <ResultItem
                  key={index}
                  onCourtSelect={onCourtSelect}
                  result={result}
                  selectedCourts={selectedCourts}
                  show={show} />
              })}
            </div>
          }
            {!searching && _.flatten(pageSearchResults).length === 0 &&
            errorMessage
          }
            {!searching && prepopulatedVenues.length > 0 &&
              <h3 style={{ textAlign: 'center', marginTop: '3rem' }}><Text text="pages.search.other_venues" /></h3>
            }
            {!searching && prepopulatedVenues.length > 0 &&
              <div className="venue-results-grid">
                {prepopulatedVenues.map((venue, i) =>
                  <SearchResultPrepopulated key={i} venue={venue} />
                )}
              </div>
            }
          </div>

        </div>
        {!searching && pageSearchResults.length > 1 &&
        <Pagination
          className="pagination-wrapper flex-col flex-vc mhl mbm"
          maxPage={maxPage}
          pageNumber={pageNumber}
          perPage={perPage}
          totalItems={searchResults.length} />}
      </div>
    )
  }

}

SearchResults.propTypes = {
  onCourtSelect: PropTypes.func.isRequired,
  searching: PropTypes.bool.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.object),
  show: PropTypes.func.isRequired,
  queryParams: PropTypes.object,
  pageNumber: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  allVenuesById: PropTypes.object,
  allCourts: PropTypes.object,
  selectedCourts: PropTypes.arrayOf(PropTypes.object),
  errorMessage: PropTypes.string,
  gridType: PropTypes.string.isRequired,
  prepopulatedVenues: PropTypes.arrayOf(PropTypes.object)
}

export default SearchResults
