import { faker } from '@faker-js/faker'

const cryptoStorageKey = 'cryptoMock/11'
const cryptoMockExists = localStorage.getItem(cryptoStorageKey)
let cryptoDataFromAPI
if (cryptoMockExists) {
  cryptoDataFromAPI = JSON.parse(cryptoMockExists)
} else {
  cryptoDataFromAPI = Array(100).fill(null).map((_, i) => ({
    color: faker.color.rgb(),
    id: faker.string.uuid(),
    name: faker.person.firstName(),
    // for values generation only
    trend: Math.random() * 2 - 1,
    volatility: Math.random() * 10 + 8,
  }))

  // continuous realistic value definition
  cryptoDataFromAPI.forEach((crypto) => {
    let val = 100
    const values = []
    for (let index = 0; index < 500; index++) {
      val += crypto.trend + (Math.random() * crypto.volatility) - crypto.volatility / 2
      values.push(val)
    }
    crypto.values = values
  })
  localStorage.setItem(cryptoStorageKey, JSON.stringify(cryptoDataFromAPI))
}

export const mockCrypto = cryptoDataFromAPI
