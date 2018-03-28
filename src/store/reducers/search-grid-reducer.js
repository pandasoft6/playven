import {
  HANDLE_SEARCHGRID_FORM_SUBMIT,
  HANDLE_SEARCHGRID_SEARCH_FAIL
} from '../../actions/search-actions'

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [HANDLE_SEARCHGRID_FORM_SUBMIT]: (state, action) => (
    {
      ...state,
      searching: action.searching || false,
      errorMessage: null
    }),
  [HANDLE_SEARCHGRID_SEARCH_FAIL]: state => ({
    ...state,
    searching: false
  })
}

// ------------------------------------
// Reducer ** Initial values
// ------------------------------------
// TODO: From backend (?)

const durations = [
  {
    id: '30',
    text: '30 min'
  },
  {
    id: '60',
    text: '60 min'
  },
  {
    id: '120',
    text: '2 hour'
  },
  {
    id: '180',
    text: '3 hour'
  },
  {
    id: '240',
    text: '4 hour'
  }
]
// Timetable
// eslint-disable-next-line
let start_time = 600
const endTime = 2300
const timetable = []

// eslint-disable-next-line
while (start_time <= endTime) {
  timetable.push(start_time)
  // eslint-disable-next-line
  start_time = start_time % 100 > 0 ? start_time + 70 : start_time = start_time + 30
}

const initialState = {
  fields: {
    sports: [],
    durations,
    timetable
  },
  searching: false
}

export default function searchgridReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
