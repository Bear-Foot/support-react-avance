export const createReducer = (stateMap, initialState) => (state = initialState, action = {}) => {
  const nextStateFn = stateMap[action.type]
  if (nextStateFn) {
    return nextStateFn(state, action)
  }

  return state
}
