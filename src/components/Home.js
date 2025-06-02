import {
  createContext,
  useCallback,
  useContext,
  useEffect, useMemo, useRef, useState,
} from 'react'
import { shallowEqual } from 'react-intl/src/utils'

import { Counter, useCounterSetters, useCountValue } from '../context/Counter'

const Home = () => {
  const [state, setState] = useState(10)
  const [shouldFilterOdds, setShouldFilterOdds] = useState(false)
  const increaseCount = () => {
    setState((oldState) => oldState + 1)
  }
  const testResult = customMemoAdvanced(() => {
    console.log('expensive compute', state)

    return 5
  }, [state])

  return (
    <div>
      <button type="button" onClick={increaseCount}>
        Hello
        {' '}
        {state}
      </button>
      <button type="button" onClick={() => setState(10)}>
        reset
      </button>
      <Counter>
        <Parent />
      </Counter>
    </div>
  )
}

// eslint-disable-next-line import/no-default-export
export default Home

const Parent = () => {
  const counterSetters = useCounterSetters()
  console.log('parent rendu')

  return (
    <div>
      <button onClick={counterSetters.decrease}>
        decrease
      </button>
      <button onClick={counterSetters.increase}>
        increase
      </button>
      <button onClick={counterSetters.reset}>
        reset
      </button>
      <Child />
    </div>
  )
}
const Child = () => {
  const count = useCountValue()

  return (
    <div>
      {count}
    </div>
  )
}
const customMemo = (fn, deps) => {
  if (shallowEqual(deps, customMemo.lastCalledWith)) {
    return customMemo.previousResult
  }

  customMemo.lastCalledWith = deps
  const result = fn()
  customMemo.previousResult = result

  return result
}

const customMemoAdvanced = (fn, deps) => {
  const key = deps.join('##$$')
  if (customMemoAdvanced.calledWith[key]) {
    return customMemoAdvanced.results[key]
  }

  customMemoAdvanced.calledWith[key] = true
  const result = fn()
  customMemoAdvanced.results[key] = result

  return result
}
customMemoAdvanced.calledWith = {}
customMemoAdvanced.results = {}
