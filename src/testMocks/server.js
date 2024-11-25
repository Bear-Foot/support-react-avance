import { rest } from 'msw'
import { setupServer } from 'msw/node'

export const server = setupServer(rest.get('https://api.com', (req, res, ctx) => null))
