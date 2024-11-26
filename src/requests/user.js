export const getConnectedUser = (data) => fetch('https://api.com/me', {
  body: data,
  method: 'POST',
})

export const createUser = ({ firstName, lastName }) => fetch('https://api.com/user', {
  body: JSON.stringify({ firstName, lastName }),
  method: 'POST',
})
