import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { getConnectedUser } from '../requests/user'
import { useToggle } from '../hooks/toggle'

const useUserQuery = (parameter) => useQuery({
  enabled: true,
  queryFn: () => getConnectedUser(parameter),
  queryKey: ['getConnectedUser', parameter],
})

export const Query = () => {
  const toggle = useToggle()
  const queryClient = useQueryClient()
  const userQuery = useUserQuery(toggle.state)
  const userMutation = useMutation({
    mutationFn: (params) => {
      console.log('params', params)

      return Promise.resolve('done')
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['getConnectedUser'] })
    },
  })

  return (
    <div>
      hey
      <button onClick={userQuery.refetch}> Discover who is connected ? </button>
      <button onClick={() => userMutation.mutate({ test: 'ok' })}> Mutate </button>
      {userQuery.isLoading && 'Loading'}
      {userQuery.isSuccess && userQuery.data.name}
      <button onClick={toggle.toggle}>toggle</button>
    </div>
  )
}

export default Query
