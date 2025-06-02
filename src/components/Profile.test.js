import {
  rest,
} from 'msw'
import { render } from '@testing-library/react'

import { server } from '../testMocks/server'
import { sleep } from '../utils/tools'

import { Profile } from './Profile'

const handlers = {
  success: async (req, res, ctx) => {
    await sleep(500)

    return res(ctx.json({ name: 'Jean-Daniel' }))
  },
}

describe('The profile page with its http request', () => {
  it('should display a message while loading', async () => {
    const spy = jest.spyOn(handlers, 'success')
    // mock setup
    server.use(
      rest.post(
        'https://api.com/me',
        handlers.success,
        { once: true },
      ),
    )
    const { getByText, findByText } = render(<Profile />)

    expect(getByText(/Chargement/)).toBeInTheDocument()
    await findByText(/Jean-Daniel/)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy.mock.lastCall[0].body).toBe('wil')
  })
})
