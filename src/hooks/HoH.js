import { useEffect, useState } from 'react'

export const storingState = (wrapped, key) => (initialState) => {
  const existingStorage = localStorage.getItem(key)
  const parsed = JSON.parse(existingStorage)
  const [state, setState] = wrapped(parsed || initialState)

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [state])

  return [state, setState]
}

export const loggingState = (wrapped) => (initialState, ...rest) => {
  const [state, setState] = wrapped(initialState, ...rest)

  useEffect(() => {
    console.log(state)
  }, [state])

  return [state, setState]
}

export const useLoggedState = loggingState(useState)
