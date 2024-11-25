import {
  rest,
} from 'msw'
import { render } from '@testing-library/react'

import { server } from '../testMocks/server'

import { Profile } from './Profile'

const sleep = (ms = 500) => new Promise((res) => {
  setTimeout(res, ms)
})

describe('The profile page with its http request', () => {
  it('should display a message while loading', async () => {
    // mock setup
    server.use(
      rest.get(
        'https://api.com/me',
        async (req, res, ctx) => {
          await sleep(500)

          return res(ctx.json({ name: 'Jean-Daniel' }))
        },
        { once: true },
      ),
    )

    const { getByText, findByText } = render(<Profile />)

    expect(getByText(/Chargement/)).toBeInTheDocument()
    await findByText(/Jean-Daniel/)
  })
})
