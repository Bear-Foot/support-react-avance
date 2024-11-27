import { useEffect, useState } from 'react'

export const useAsync = ({ asyncFn, start = false, callback } = {}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [data, setData] = useState()

  const run = async (...args) => {
    setIsLoading(true)
    try {
      const result = await asyncFn(...args)
      setData(result)
      setIsSuccess(true)
      if (typeof callback === 'function') {
        callback(result)
      }

      setIsLoading(false)

      return result
    } catch (e) {
      setData(e)
      setIsError(true)
      setIsLoading(false)
    }
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
