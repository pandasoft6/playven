import * as types from '../actions/action-types'

export const toggleMobileMenu = isOpen => ({
  type: types.TOGGLE_MOBILE_MENU,
  payload: isOpen
})

export const toggleSearchMenu = isOpen => ({
  type: types.TOGGLE_SEARCH_MENU,
  payload: isOpen
})

export const searchBarChangeSport = newSportName => ({
  type: types.SEARCH_BAR_CHANGE_SPORT,
  payload: newSportName
})

export const searchBarChangeDuration = newDuration => ({
  type: types.SEARCH_BAR_CHANGE_DURATION,
  payload: newDuration
})

export const searchBarChangeDate = newDate => ({
  type: types.SEARCH_BAR_CHANGE_DATE,
  payload: newDate
})

export const searchBarChangeTime = newTime => ({
  type: types.SEARCH_BAR_CHANGE_TIME,
  payload: newTime
})

export const searchBarChangeCity = newCity => ({
  type: types.SEARCH_BAR_CHANGE_CITY,
  payload: newCity
})
