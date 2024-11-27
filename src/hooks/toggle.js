import { useRef, useState } from 'react'

// The initial state should be false if not provided
// The reset function should set the state to what it has been initialized with
// setOn should set the toggle to true
// setOff should set the toggle to false
// toggle should alternate between true and false given the current state
// a state key should be returned to read the current state

export const useToggle = (initialState = false) => {
  const [truthiness, setTruthiness] = useState(initialState)

  const setOn = useRef(() => setTruthiness(true)).current
  const setOff = useRef(() => setTruthiness(false)).current
  const toggle = useRef(() => setTruthiness((state) => !state)).current
  const reset = useRef(() => setTruthiness(initialState)).current

  return {
    reset,
    setOff,
    setOn,
    state: truthiness,
    toggle,
  }
}
