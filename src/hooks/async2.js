import { useEffect, useState } from 'react'

export const useAsync = ({ asyncFn, start = false } = {}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [data, setData] = useState()

  const run = (...args) => {
    const runAsync = async () => {
      try {
        const data = await asyncFn(...args)

        setData(data)
        setIsSuccess(true)
      } catch (e) {
        setData(e)
        setIsError(true)
      }
      setIsLoading(false)
    }

    setIsLoading(true)
    runAsync()
  }

  useEffect(() => {
    if (asyncFn && start) {
      run()
    }
  }, [start])

  return {
    run,
    state: {
      data,
      isError,
      isLoading,
      isSuccess,
    },
  }
}
