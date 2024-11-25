import { authorize } from './authorize'

describe('The authorization function', () => {
  // important given the intent behind the function
  it('should return false if any information is missing', () => {
    const user = { permissions: ['one', 'two'] }

    throw new Error('not implemented')
  })

  it('should return false if the required permission is not found', () => {
    const user = { permissions: ['one', 'two'] }

    throw new Error('not implemented')
  })

  it('should return true if the required permission IS found', () => {
    const user = { permissions: ['one', 'two'] }

    expect(authorize({ requiredPermission: 'one', user })).toBe(true)
    expect(authorize({ requiredPermission: 'two', user })).toBe(true)
  })
})
