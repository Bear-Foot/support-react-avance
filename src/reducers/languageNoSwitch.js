const initialState = 'de'

export const languageReducer = (state = initialState, action = {}) => {
  const stateMap = {
    CHANGE_LANGUAGE_DE: () => 'fr',
    CHANGE_LANGUAGE_EN: () => 'en',
    CHANGE_LANGUAGE_FR: () => 'fr', // oops !
    RESET: () => initialState,
  }
  const nextStateFn = stateMap[action.type]
  if (nextStateFn) {
    return nextStateFn(state, action)
  }

  return state
}
