import {
  useEffect, useReducer, useCallback,
} from 'react'

const actionTypes = {
  ERROR: 'ERROR',
  LOADING: 'LOADING',
  RESOLVED: 'RESOLVED',
  START: 'START',
  SUCCESS: 'SUCCESS',
}

export function useRequest({ request, handler, start = false }) {
  // in a close future this reducer should be extensible with custom configuration, as well as the action dispatched
  // to allow pagination and filtering, and probably auto-refetching too
  const initialState = {
    data: null,
    error: false,
    loading: false,
    pendingHandler: false,
    success: false,
  }

  const [res, dispatch] = useReducer((state, action) => {
    switch (action.type) {
    case actionTypes.START:
      return {
        ...state,
        params: action.params,
      }
    case actionTypes.LOADING:
      return {
        ...state,
        data: null,
        error: false,
        loading: true,
        pendingHandler: !!handler,
        success: false,
      }
    case actionTypes.SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
        params: undefined,
        success: true,
      }
    case actionTypes.RESOLVED:
      return {
        ...state,
        pendingHandler: false,
      }
    case actionTypes.ERROR:
      return {
        ...state,
        data: action.error,
        error: true,
        loading: false,
        params: undefined,
        pendingHandler: false,
      }
    case 'RESET':
      return initialState
    default:
      return state
    }
  }, initialState)

  const doRequest = useCallback((params?) => {
    dispatch({ type: actionTypes.LOADING })
    const result = request.call(null, { params, requestState: res })
    const resultProm = result
      .then((data) => dispatch({ data, type: actionTypes.SUCCESS }))
      .catch((error) => dispatch({ error, type: actionTypes.ERROR }))

    if (handler) {
      return handler(result).then((handlerResult) => {
        dispatch({ type: actionTypes.RESOLVED })

        return handlerResult
      })
    }

    return resultProm
  }, [res, request])

  useEffect(() => {
    if (start) {
      doRequest()
    }
  }, [start])

  const cleanState = useCallback(() => dispatch({ type: 'RESET' }), [])

  return { cleanState, fetch: doRequest, state: res }
}
