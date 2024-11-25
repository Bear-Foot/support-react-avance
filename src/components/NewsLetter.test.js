import { render } from '@testing-library/react'

import { NewsLetter } from './NewsLetter'

describe('Testing the newsletter subscription', () => {
  it('should not be subscribed at first', () => {
    const { getByText } = render(<NewsLetter />)

    expect(getByText('Dommage...')).toBeInTheDocument()
  })

  it('should change the message according to the state of the checkbox', () => {
    const { getByText } = render(<NewsLetter />)
  })
})
