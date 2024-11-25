const initialState = 'de'

export const languageReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case 'CHANGE_LANGUAGE_FR':
    return 'fr'
  case 'CHANGE_LANGUAGE_EN':
    return 'en'
  case 'CHANGE_LANGUAGE_DE':
    return 'de'
  case 'RESET':
    return initialState
  default:
    return state
  }
}
