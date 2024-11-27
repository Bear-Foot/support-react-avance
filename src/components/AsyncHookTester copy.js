import { useEffect, useRef, useState } from 'react'

import { getJCVD } from '../requests/user'
import { useAsync } from '../hooks/async2'

const useDebounce = (initialValue, time = 500) => {
  const [state, setState] = useState(initialValue)
  const [inputValue, setInputValue] = useState(initialValue)
  const timeout = useRef()
  const handleInputValue = (e) => {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }
    const val = e.target.value
    setInputValue(val)
    timeout.current = setTimeout(() => {
      setState(val)
    }, time)
  }

  return {
    handleInputValue,
    inputValue,
    state,
  }
}

export const AsyncHookTesterLeRetour = () => {
  const { state, inputValue, handleInputValue } = useDebounce('')
  const userRequest = useAsync({
    asyncFn: getJCVD,
    callback: console.log,
  })

  useEffect(() => {
    userRequest.run({ filter: state })
  }, [state])

  if (userRequest.state.isError) return `Oops ! Cassé !${userRequest.state.data.message}`

  return (
    <div>
      <input value={inputValue} onChange={handleInputValue} />
      {userRequest.state.isLoading && 'loading...'}
      {userRequest.state.isSuccess && userRequest.state.data.name}
    </div>
  )
}
