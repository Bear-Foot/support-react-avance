import { useState } from 'react'

// The initial state should be false if not provided
// The reset function should set the state to what it has been initialized with
// setOn should set the toggle to true
// setOff should set the toggle to false
// toggle should alternate between true and false given the current state
// a state key should be returned to read the current state

export const useToggle = (initialState = false) => {
  const [truthiness, setTruthiness] = useState(initialState)

  const setOn = () => setTruthiness(true)
  const setOff = () => setTruthiness(false)
  const toggle = () => setTruthiness((state) => !state)
  const reset = () => setTruthiness(initialState)

  return {
    reset,
    setOff,
    setOn,
    state: truthiness,
    toggle,
  }
}
