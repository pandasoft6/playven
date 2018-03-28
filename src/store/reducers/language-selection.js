import {
  TOGGLE_MENU
} from '../../actions/language-selection-actions'

const languageSelection = (state = { showing: false }, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        showing: !state.showing
      }

    default:
      return state
  }
}

export default languageSelection
