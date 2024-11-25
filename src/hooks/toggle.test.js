// test d'intégration parce qu'on dépend et utilise activement useState, ce n'est plus un test unitaire

import { act, renderHook } from '@testing-library/react'

import { useToggle } from './toggle'

describe('The toggle hook', () => {
  it('should be false if not initial state is provided', () => {
    const { result } = renderHook(() => useToggle())

    expect(result.current.state).toBe(false)

    // act(() => {
    //   result.current.toggle()
    // })
  })
})
