import { rest } from 'msw'

export const handlers = [
  rest.post('https://api.com/me', (req, res, ctx) => res(ctx.json({
    id: 0,
    name: 'Wilfried',
  }))),

  rest.post('https://api.com/user', async (req, res, ctx) => {
    const body = await req.json()
    const { lastName, firstName } = body

    const people = JSON.parse(localStorage.getItem('people') || '[]')
    const newPeopleExists = people.find((person) => person.firstName === firstName && person.lastName === lastName)
    if (newPeopleExists) {
      return res(ctx.status(409), ctx.json({ message: 'User already exists' }))
    }
    people.push({ firstName, lastName })
    localStorage.setItem('people', JSON.stringify(people))

    return res(ctx.status(200))
  }),
]
