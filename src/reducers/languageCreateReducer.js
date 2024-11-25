import { createReducer } from './createReducer'

const initialState = 'de'

const stateMap = {
  CHANGE_LANGUAGE_DE: () => 'de',
  CHANGE_LANGUAGE_EN: () => 'en',
  CHANGE_LANGUAGE_FR: () => 'fr',
  RESET: () => initialState,
}

export const languageReducer = createReducer(stateMap, initialState)
