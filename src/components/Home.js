import { useState } from 'react'

import { storingState, useLoggedState } from '../hooks/HoH'

const storingHook1 = storingState(useState, 'one')
const storingLoggingHook1 = storingState(useLoggedState, 'two')

const Count = ({ stateHook, label }) => {
  const [count, setCount] = stateHook(0)

  return (
    <button type="button" onClick={() => setCount((c) => c + 1)}>
      {label}
      clicked:
      {count}
    </button>
  )
}

export const Home = () => (
  <div>
    <Count stateHook={storingLoggingHook1} label="loggedStore" />
    <Count stateHook={useLoggedState} label="logged" />
    <Count stateHook={storingHook1} label="storing" />
  </div>
)
