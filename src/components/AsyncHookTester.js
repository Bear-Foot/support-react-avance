import { getConnectedUser } from '../requests/user'
import { useAsync } from '../hooks/async2'

export const AsyncHookTester = () => {
  const userRequest = useAsync({
    asyncFn: getConnectedUser,

    start: true,
  })

  if (userRequest.state.isLoading) return 'loading...'
  if (userRequest.state.isError) return `Oops ! Cassé mais en bleu !${userRequest.state.data.message}`

  return (
    <div>
      {userRequest.state.isSuccess && userRequest.state.data.name}
    </div>
  )
}
