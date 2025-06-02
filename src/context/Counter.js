import {
  createContext, useContext, useMemo, useState,
} from 'react'

const CountContext = createContext()
const CountValueContext = createContext()
export const useCounterSetters = () => useContext(CountContext)
export const useCountValue = () => useContext(CountValueContext)

export const Counter = ({ children }) => {
  const [count, setCount] = useState(0)
  const reset = () => setCount(0)
  const increase = () => setCount((c) => c + 1)
  const decrease = () => setCount((c) => c - 1)

  const counterSetters = useMemo(() => ({
    decrease,
    increase,
    reset,
  }), [])

  return (
    <CountValueContext.Provider value={count}>
      <CountContext.Provider value={counterSetters}>
        {children}
      </CountContext.Provider>
    </CountValueContext.Provider>
  )
}
