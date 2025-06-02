export const getConnectedUser = (data) => fetch('https://api.com/me', {
  body: data,
  method: 'POST',
})

export const createUser = ({ firstName, lastName }) => fetch('https://api.com/user', {
  body: JSON.stringify({ firstName, lastName }),
  method: 'POST',
})

export const getJCVD = (data) => fetch('https://api.com/ti', {
  body: data,
  method: 'POST',
})

const customFetch = async (...params) => {
  const result = await fetch(...params)

  if (result.status >= 500) {
    throw new Error('network error')
  }
  const data = await result.json()

  if (result.status >= 200 && result.status < 400) {
    return data
  }
  // 400
  throw data
}
