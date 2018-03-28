import React from 'react'
import { I18n } from 'react-redux-i18n'
import Portal from 'components/Portal'
import SearchFilterModal from 'containers/Modals/SearchFilter'
import classname from 'classname'

const SearchMobileFilter = ({ show, hide, isActiveFilter }) =>
  <div>
    <Portal
      className="search-mobile-filter hide-gt-mobile"
      id="search-mobile-filter">
      <div className="flex-row">
        <button
          className={classname({ active: !isActiveFilter })}
          onClick={() => {
            if (isActiveFilter) {
              hide('searchFilter')
            }
          }}>
          {I18n.t('modals.filters.list')}
        </button>
        <button
          className={classname({ active: isActiveFilter })}
          onClick={() => {
            if (!isActiveFilter) {
              show('searchFilter')
            }
          }}>
          {I18n.t('modals.filters.filter')}
        </button>
      </div>
    </Portal>
    <SearchFilterModal />
  </div>

SearchMobileFilter.propTypes = {
  show: React.PropTypes.func,
  hide: React.PropTypes.func,
  isActiveFilter: React.PropTypes.bool
}

export default SearchMobileFilter
