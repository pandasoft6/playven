// ------------------------------------
// Constants
// ------------------------------------
const MOVE_TO_SEARCH_PAGE = 'MOVE_TO_SEARCH_PAGE'
const UPDATE_SEARCH_RESULTS = 'UPDATE_SEARCH_RESULTS'

import {
  HANDLE_SEARCHGRID_FORM_SUBMIT,
  HANDLE_SEARCHGRID_SEARCH_FAIL
} from '../../../actions/search-actions'

const CHANGE_GRID_TYPE = 'CHANGE_GRID_TYPE'

export const GRID_TYPES = {
  DEFAULT: 'default',
  MAP: 'map',
  TIMELINE: 'timeline'
}
// ------------------------------------
// Actions
// ------------------------------------

export const moveToPage = page => ({
  type: MOVE_TO_SEARCH_PAGE,
  value: page
})

export const changeGridType = gridType => ({
  type: CHANGE_GRID_TYPE,
  gridType
})

export const actions = {
  moveToPage
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const initialState = {
  pageNumber: 0,
  perPage: 12,
  searchResults: [],
  gridType: 'default'
}
const ACTION_HANDLERS = {
  [MOVE_TO_SEARCH_PAGE]: (state, action) => ({
    ...state,
    pageNumber: action.value
  }),
  [UPDATE_SEARCH_RESULTS]: (state, action) => ({
    ...state,
    action
  }),
  [CHANGE_GRID_TYPE]: (state, action) => ({
    ...state,
    gridType: action.gridType
  }),
  [HANDLE_SEARCHGRID_FORM_SUBMIT]: (state, action) => {
    // for some reason for seach start / stop same action is used, so ....
    if (!action.searchResults) {
      return state
    }

    // action.payload is a tuple: normalised courts + venue (non normalised)
    // remove extra data from venue to normalise it (and force people to use allVenues)
    const payload = action.searchResults.map(tuple =>
      ({
        ...tuple,
        venue: {
          id: tuple.venue.id
        }
      })
    )

    return {
      ...state,
      searchResults: payload,
      errorMessage: null
    }
  },
  [HANDLE_SEARCHGRID_SEARCH_FAIL]: (state, action) => ({
    ...state,
    searchResults: null,
    errorMessage: action.message
  })

}

// ------------------------------------
// Reducer
// ------------------------------------

export default function searchReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
