import { useState } from 'react'

import { storingState, useLoggedState } from '../hooks/HoH'

import { AsyncHookTester } from './AsyncHookTester'
import { AsyncHookTesterLeRetour } from './AsyncHookTester copy'

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

const Home = () =>
// const meRequest = useRequest({
//   request: finalGetConnecterUser,
//   start: true,
// })

// if (meRequest.state.loading) {
//   return 'Loading'
// }

  (
    <div>
      {/* {meRequest.state.success && (
        <h1>
          Hello
          {meRequest.state.data.name}
        </h1>
      )} */}
      <AsyncHookTester />
      <AsyncHookTesterLeRetour />
      <Count stateHook={storingLoggingHook1} label="loggedStore" />
      <Count stateHook={useLoggedState} label="logged" />
      <Count stateHook={storingHook1} label="storing" />
    </div>
  )

// eslint-disable-next-line import/no-default-export
export default Home
