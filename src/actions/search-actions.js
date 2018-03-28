export const HANDLE_SEARCHGRID_FORM_SUBMIT = 'HANDLE_SEARCHGRID_FORM_SUBMIT'
export const HANDLE_SEARCHGRID_SEARCH_FAIL = 'HANDLE_SEARCHGRID_SEARCH_FAIL'
export const UPDATE_ALL_COURTS = 'UPDATE_ALL_COURTS'
export const CITIES_FULFILLED = 'CITIES_FULFILLED'

export const updateAllCourts = courts => ({
  type: UPDATE_ALL_COURTS,
  payload: courts
})

export const citiesFulfilled = cities => ({
  type: CITIES_FULFILLED,
  payload: cities
})
