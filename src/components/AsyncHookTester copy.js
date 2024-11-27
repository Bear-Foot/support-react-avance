import { useState } from 'react'

import { getJCVD } from '../requests/user'
import { useAsync } from '../hooks/async2'

export const AsyncHookTesterLeRetour = () => {
  const [hasClicked, setHasClicked] = useState(false)
  const userRequest = useAsync({ asyncFn: getJCVD })

  if (!hasClicked) {
    return (
      <button
        type="button"
        onClick={() => {
          userRequest.run('Truc')
          setHasClicked(true)
        }}
      >
        {' '}
        Click me
      </button>
    )
  }

  if (userRequest.state.isLoading) return 'loading...'
  if (userRequest.state.isError) return `Oops ! Cassé !${userRequest.state.data.message}`

  return (
    <div>
      {userRequest.state.isSuccess && userRequest.state.data.name}
    </div>
  )
}
