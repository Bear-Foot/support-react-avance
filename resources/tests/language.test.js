import { languageReducer } from '../../src/reducers/language'

const reducer = languageReducer

describe('the language reducer', () => {
  it('should use its initial state', () => {
    expect(reducer(undefined)).toBe('de')
  })
  it('should return an unchanged state when the action doesn\'t match', () => {
    expect(reducer('en', { type: 'not_matching' })).toBe('en')
  })
  it('should change the language when an action is matched', () => {
    expect(reducer('en', { type: 'CHANGE_LANGUAGE_FR' })).toBe('fr')
    expect(reducer('en', { type: 'CHANGE_LANGUAGE_DE' })).toBe('de')
    expect(reducer('fr', { type: 'CHANGE_LANGUAGE_EN' })).toBe('en')
  })

  it('should revert to its initial state when resetted', () => {
    expect(reducer('en', { type: 'RESET' })).toBe('de')
  })
})
