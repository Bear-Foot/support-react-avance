import { rest } from 'msw'

export const handlers = [
  rest.get('https://api.com/me', (req, res, ctx) => res(ctx.json({
    id: 0,
    name: 'Wilfried',
  }))),
]
