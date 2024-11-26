import { useEffect, useState } from 'react'

import { getConnectedUser } from '../requests/user'

const useUserFetch = () => {
  const [requestState, setRequestState] = useState('loading')
  const [data, setData] = useState()

  useEffect(() => {
    const getUser = async () => {
      const requestResponse = await getConnectedUser('wil')
      if (requestResponse.status < 500) {
        const result = await requestResponse.json()

        setData(result)
        setRequestState(
          requestResponse.status === 200 ? 'success' : 'error',
        )
      } else {
        setRequestState('networkError')
      }
    }

    getUser()
  }, [])

  return {
    data, requestState,
  }
}

const UserFetcher = (Wrapped) => (props) => {
  const { requestState, data } = useUserFetch()

  return <Wrapped requestState={requestState} data={data} {...props} />
}

export const Profile = UserFetcher(({ requestState, data }) => {
  if (requestState === 'loading') {
    return 'Chargement...'
  }
  if (requestState === 'networkError') {
    return 'Il y a eu une erreur au chargement, merci de réessayer plus tard.'
  }

  if (requestState === 'error') {
    return data.msg
  }

  return (
    <div>
      Welcome to your profile
      {` ${data.name} `}
      !
    </div>
  )
})

export default Profile
