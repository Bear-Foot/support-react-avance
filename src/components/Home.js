import {
  memo, useCallback, useEffect, useRef, useState,
} from 'react'

const createIncrease = (setter) => () => setter((v) => v + 1)

export const storingState = (key) => (wrapped) => (initialState) => {
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

const limiter = (limit) => (wrapped) => (initialState) => {
  const [state, setState] = wrapped(initialState)

  const limiterState = useRef(((newState) => {
    if (newState.length < 4) {
      setState(newState)
    }
  })).current

  return [state, limiterState]
}

const compose = (...composed) => (wrapped) => composed.reduce((previous, composer) => composer(previous), wrapped)

const storingLoggingState = compose(
  loggingState,
  limiter(3),
  storingState({ key: 'Homepage' }),
)(useState)

const addLogger = (name, propsToLog) => (Wrapped) => (props) => {
  useEffect(() => {
    const info = propsToLog ? propsToLog(props) : ''
    console.log(`${name} up:${info}`)

    return () => {
      console.log(`${name} down:${info}`)
    }
  }, [])

  return <Wrapped {...props} />
}

const Fruit = ({ name }) => <div>{name}</div>
const LoggedFruit = compose(
  addLogger('fruit'),
  memo,
)(Fruit)

const list = ['Banane', 'Pêche', 'Melon']

const Home = () => {
  const [fruits, setFruits] = useState(list)
  const removeFirst = () => setFruits((f) => {
    f.shift()

    return [...f]
  })
  const prepend = () => setFruits((f) => {
    f.unshift('Fraise')

    return [...f]
  })

  return (
    <div>
      {fruits.map((f) => <LoggedFruit name={f} key={f} />)}
      <button onClick={removeFirst}>
        Petit texte
      </button>
      <button onClick={prepend}>
        PLUS DE FRAISES
      </button>
    </div>
  )
}

const Child = memo(({ increase }) => {
  console.log('render child')

  return <div onClick={increase}>rien</div>
})

// eslint-disable-next-line import/no-default-export
export default Home
